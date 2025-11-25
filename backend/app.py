import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.dirname(__file__), 'smartlearn.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(16), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(180), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(64), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    code = db.Column(db.String(32), nullable=False)
    category = db.Column(db.String(8), nullable=False)
    lecturer_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_key = db.Column(db.String(64), db.ForeignKey('course.key'), nullable=False)

class Material(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_key = db.Column(db.String(64), db.ForeignKey('course.key'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(32), nullable=False)
    file_name = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_key = db.Column(db.String(64), db.ForeignKey('course.key'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(32), nullable=False)
    due = db.Column(db.String(64))
    marks = db.Column(db.Integer, default=100)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Submission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_key = db.Column(db.String(64), db.ForeignKey('course.key'), nullable=False)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignment.id'))
    file_name = db.Column(db.String(256))
    answers_json = db.Column(db.Text)
    auto_score_percent = db.Column(db.Integer)
    status = db.Column(db.String(32), default='submitted')
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    grade = db.Column(db.Float)
    feedback = db.Column(db.Text)
    graded_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    published = db.Column(db.Boolean, default=False)
    assigned_lecturer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    lecturer_approved = db.Column(db.Boolean)
    lecturer_notes = db.Column(db.Text)
    admin_approved = db.Column(db.Boolean)

class Announcement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_key = db.Column(db.String(64))
    title = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    priority = db.Column(db.String(16), default='normal')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Completion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    course_key = db.Column(db.String(64), db.ForeignKey('course.key'), nullable=False)
    course_title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(64), nullable=False)
    score = db.Column(db.String(32))
    status = db.Column(db.String(32), default='approved')

def seed():
    if not User.query.filter_by(email='admin@smartlearn.local').first():
        u = User(role='admin', name='SmartLearn Admin', email='admin@smartlearn.local', password_hash=generate_password_hash('admin123'))
        db.session.add(u)
    if Course.query.count() == 0:
        courses = [
            {'key':'ict-introduction','title':'Introduction to ICT','code':'ICT101','category':'ict'},
            {'key':'cs-computer-applications','title':'Computer Applications','code':'CS210','category':'cs'},
            {'key':'ce-digital-logic-design','title':'Digital Logic Design','code':'CE220','category':'ce'}
        ]
        for c in courses:
            db.session.add(Course(**c))
    db.session.commit()

def _ensure_column(table, column, ddl):
    try:
        cols = db.session.execute(f"PRAGMA table_info({table})").fetchall()
        names = {c[1] for c in cols}
        if column not in names:
            db.session.execute(f"ALTER TABLE {table} ADD COLUMN {ddl}")
            db.session.commit()
    except Exception:
        pass

def ensure_schema():
    _ensure_column('course', 'lecturer_id', 'lecturer_id INTEGER')
    _ensure_column('submission', 'assigned_lecturer_id', 'assigned_lecturer_id INTEGER')
    _ensure_column('submission', 'lecturer_approved', 'lecturer_approved BOOLEAN')
    _ensure_column('submission', 'lecturer_notes', 'lecturer_notes TEXT')
    _ensure_column('submission', 'admin_approved', 'admin_approved BOOLEAN')

@app.post('/auth/register')
def register():
    data = request.json or {}
    role = data.get('role')
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not role or not name or not email or not password:
        return jsonify({'error':'invalid'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error':'exists'}), 409
    u = User(role=role, name=name, email=email, password_hash=generate_password_hash(password))
    db.session.add(u)
    db.session.commit()
    return jsonify({'id':u.id,'role':u.role,'name':u.name,'email':u.email})

@app.post('/auth/login')
def login():
    data = request.json or {}
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    u = User.query.filter_by(email=email, role=role).first()
    if not u or not check_password_hash(u.password_hash, password):
        return jsonify({'error':'unauthorized'}), 401
    return jsonify({'id':u.id,'role':u.role,'name':u.name,'email':u.email})

@app.get('/courses')
def list_courses():
    rows = Course.query.all()
    return jsonify([{'key':r.key,'title':r.title,'code':r.code,'category':r.category,'lecturer_id':r.lecturer_id} for r in rows])

@app.put('/courses/<string:key>/assign-lecturer')
def assign_lecturer(key):
    data = request.json or {}
    lecturer_id = data.get('lecturer_id')
    c = Course.query.filter_by(key=key).first()
    if not c:
        return jsonify({'error':'course_not_found'}), 404
    c.lecturer_id = lecturer_id
    db.session.commit()
    return jsonify({'key':c.key,'lecturer_id':c.lecturer_id})

@app.post('/enroll')
def enroll():
    data = request.json or {}
    student_id = data.get('student_id')
    course_key = data.get('course_key')
    if not student_id or not course_key:
        return jsonify({'error':'invalid'}), 400
    if not Course.query.filter_by(key=course_key).first():
        return jsonify({'error':'course_not_found'}), 404
    e = Enrollment(student_id=student_id, course_key=course_key)
    db.session.add(e)
    db.session.commit()
    return jsonify({'id':e.id})

@app.get('/enrollments')
def list_enrollments():
    student_id = request.args.get('student_id', type=int)
    q = Enrollment.query
    if student_id:
        q = q.filter_by(student_id=student_id)
    rows = q.all()
    return jsonify([{'id':r.id,'student_id':r.student_id,'course_key':r.course_key} for r in rows])

@app.get('/materials')
def list_materials():
    course_key = request.args.get('course_key')
    q = Material.query
    if course_key:
        q = q.filter_by(course_key=course_key)
    rows = q.order_by(Material.created_at.desc()).all()
    return jsonify([{'id':r.id,'course_key':r.course_key,'title':r.title,'type':r.type,'file_name':r.file_name,'created_at':r.created_at.isoformat()} for r in rows])

@app.post('/materials')
def add_material():
    data = request.json or {}
    m = Material(course_key=data.get('course_key'), title=data.get('title'), type=data.get('type'), file_name=data.get('file_name'))
    db.session.add(m)
    db.session.commit()
    return jsonify({'id':m.id})

@app.get('/assignments')
def list_assignments():
    course_key = request.args.get('course_key')
    q = Assignment.query
    if course_key:
        q = q.filter_by(course_key=course_key)
    rows = q.order_by(Assignment.created_at.desc()).all()
    return jsonify([{'id':r.id,'course_key':r.course_key,'title':r.title,'type':r.type,'due':r.due,'marks':r.marks,'created_at':r.created_at.isoformat()} for r in rows])

@app.post('/assignments')
def add_assignment():
    data = request.json or {}
    a = Assignment(course_key=data.get('course_key'), title=data.get('title'), type=data.get('type'), due=data.get('due'), marks=data.get('marks'))
    db.session.add(a)
    db.session.commit()
    return jsonify({'id':a.id})

@app.get('/submissions')
def list_submissions():
    course_key = request.args.get('course_key')
    student_id = request.args.get('student_id', type=int)
    lecturer_id = request.args.get('lecturer_id', type=int)
    q = Submission.query
    if course_key:
        q = q.filter_by(course_key=course_key)
    if student_id:
        q = q.filter_by(student_id=student_id)
    if lecturer_id:
        q = q.filter_by(assigned_lecturer_id=lecturer_id)
    rows = q.order_by(Submission.submitted_at.desc()).all()
    return jsonify([{'id':r.id,'student_id':r.student_id,'course_key':r.course_key,'assignment_id':r.assignment_id,'file_name':r.file_name,'answers_json':r.answers_json,'auto_score_percent':r.auto_score_percent,'status':r.status,'submitted_at':r.submitted_at.isoformat(),'grade':r.grade,'feedback':r.feedback,'graded_by':r.graded_by,'published':r.published,'assigned_lecturer_id':r.assigned_lecturer_id,'lecturer_approved':r.lecturer_approved,'lecturer_notes':r.lecturer_notes,'admin_approved':r.admin_approved} for r in rows])

@app.post('/submissions')
def add_submission():
    data = request.json or {}
    course_key = data.get('course_key')
    assigned = None
    if course_key:
        c = Course.query.filter_by(key=course_key).first()
        if c and c.lecturer_id:
            assigned = c.lecturer_id
    s = Submission(student_id=data.get('student_id'), course_key=course_key, assignment_id=data.get('assignment_id'), file_name=data.get('file_name'), answers_json=data.get('answers_json'), auto_score_percent=data.get('auto_score_percent'), status=data.get('status') or 'submitted', assigned_lecturer_id=assigned)
    db.session.add(s)
    db.session.commit()
    return jsonify({'id':s.id})

@app.put('/submissions/<int:sid>/grade')
def grade_submission(sid):
    data = request.json or {}
    s = Submission.query.get(sid)
    if not s:
        return jsonify({'error':'not_found'}), 404
    s.grade = data.get('grade')
    s.feedback = data.get('feedback')
    s.graded_by = data.get('graded_by')
    s.published = bool(data.get('published'))
    db.session.commit()
    return jsonify({'id':s.id,'grade':s.grade,'published':s.published})

@app.put('/submissions/<int:sid>/lecturer-review')
def lecturer_review(sid):
    data = request.json or {}
    s = Submission.query.get(sid)
    if not s:
        return jsonify({'error':'not_found'}), 404
    s.grade = data.get('grade', s.grade)
    s.feedback = data.get('feedback', s.feedback)
    s.graded_by = data.get('graded_by', s.graded_by)
    s.lecturer_approved = bool(data.get('approved')) if data.get('approved') is not None else s.lecturer_approved
    s.lecturer_notes = data.get('notes', s.lecturer_notes)
    s.status = 'lecturer_approved' if s.lecturer_approved else ('lecturer_declined' if s.lecturer_approved is False else s.status)
    db.session.commit()
    return jsonify({'id':s.id,'lecturer_approved':s.lecturer_approved})

@app.put('/submissions/<int:sid>/admin-review')
def admin_review(sid):
    data = request.json or {}
    s = Submission.query.get(sid)
    if not s:
        return jsonify({'error':'not_found'}), 404
    s.admin_approved = bool(data.get('approved')) if data.get('approved') is not None else s.admin_approved
    s.status = 'admin_approved' if s.admin_approved else ('admin_declined' if s.admin_approved is False else s.status)
    db.session.commit()
    return jsonify({'id':s.id,'admin_approved':s.admin_approved})

@app.get('/users')
def list_users():
    role = request.args.get('role')
    q = User.query
    if role:
        q = q.filter_by(role=role)
    rows = q.all()
    return jsonify([{'id':u.id,'role':u.role,'name':u.name,'email':u.email} for u in rows])

@app.get('/announcements')
def list_announcements():
    course_key = request.args.get('course_key')
    q = Announcement.query
    if course_key and course_key != 'all':
        q = q.filter_by(course_key=course_key)
    rows = q.order_by(Announcement.created_at.desc()).all()
    return jsonify([{'id':r.id,'course_key':r.course_key,'title':r.title,'message':r.message,'priority':r.priority,'created_at':r.created_at.isoformat()} for r in rows])

@app.post('/announcements')
def add_announcement():
    data = request.json or {}
    a = Announcement(course_key=data.get('course_key'), title=data.get('title'), message=data.get('message'), priority=data.get('priority') or 'normal')
    db.session.add(a)
    db.session.commit()
    return jsonify({'id':a.id})

@app.post('/completions')
def add_completion():
    data = request.json or {}
    c = Completion(student_id=data.get('student_id'), course_key=data.get('course_key'), course_title=data.get('course_title'), date=data.get('date'), score=data.get('score'), status=data.get('status') or 'approved')
    db.session.add(c)
    db.session.commit()
    return jsonify({'id':c.id})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        ensure_schema()
        seed()
    app.run(host='127.0.0.1', port=5000)
