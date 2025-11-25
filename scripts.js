// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const chatbotToggle = document.getElementById('chatbotToggle');
const floatingChatBtn = document.getElementById('floatingChatBtn');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChat = document.getElementById('closeChat');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const startLearningBtn = document.getElementById('startLearningBtn');
const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');
const filterBtns = document.querySelectorAll('.filter-btn');
const progressBars = document.querySelectorAll('.progress-fill');
const enrollButtons = document.querySelectorAll('.enroll-btn');
const completionButtons = document.querySelectorAll('.completion-btn');
const completeCourseBtn = document.getElementById('completeCourse');
const certificateModal = document.getElementById('certificateModal');
const closeCertificate = document.getElementById('closeCertificate');
const downloadCertificate = document.getElementById('downloadCertificate');
const courseTitle = document.getElementById('courseTitle');
const courseDescription = document.getElementById('courseDescription');
const courseIcon = document.getElementById('courseIcon');
const certificateCourse = document.getElementById('certificateCourse');
const userName = document.getElementById('userName');
const certificateDate = document.getElementById('certificateDate');
const roleBtns = document.querySelectorAll('.role-btn');
const continueLearningBtn = document.getElementById('continueLearningBtn');
const topMessages = document.getElementById('topMessages');
const logoutTop = document.getElementById('logoutTop');
const welcomeName = document.getElementById('welcomeName');
const topbarName = document.getElementById('topbarName');
const avatarInitial = document.getElementById('avatarInitial');


// Complete Course and Show Certificate
// Notifications
let notifBtn = null;
function getRole(){ try{ return localStorage.getItem('selectedRole') || 'student' }catch(e){ return 'student' } }
function loadNotifications(){ try{ const r = localStorage.getItem('notifications'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function saveNotifications(list){ try{ localStorage.setItem('notifications', JSON.stringify(list)) }catch(e){} }
function addNotification(title, message, role){ const list = loadNotifications(); list.unshift({ id: Date.now(), title, message, role: role || 'all', read: false, ts: new Date().toISOString() }); saveNotifications(list); renderNotifCount() }
function renderNotifCount(){ if(!notifBtn) return; const list = loadNotifications(); const role = getRole(); const unread = list.filter(n => !n.read && (n.role==='all' || n.role===role)).length; let badge = notifBtn.querySelector('.notif-count'); if(!badge){ badge = document.createElement('span'); badge.className='notif-count'; notifBtn.appendChild(badge) } badge.textContent = String(unread) }
function ensureNotifUI(){
  const navIcons = document.querySelector('.nav-icons');
  if(navIcons){
    notifBtn = document.getElementById('globalNotifBtn');
    if(!notifBtn){
      notifBtn = document.createElement('button');
      notifBtn.className = 'theme-toggle notif-badge';
      notifBtn.id = 'globalNotifBtn';
      notifBtn.innerHTML = '<i class="fas fa-bell"></i>';
      navIcons.insertBefore(notifBtn, navIcons.firstChild);
    }
  }
  let panel = document.getElementById('notificationsPanel');
  if(!panel){
    panel = document.createElement('div');
    panel.id = 'notificationsPanel'; panel.className='notifications-panel';
    panel.innerHTML = '<div class="notifications-header"><strong>Notifications</strong><button id="closeNotifications" class="close-modal">&times;</button></div><div class="notifications-list" id="notificationsList"></div>';
    document.body.appendChild(panel);
  }
  renderNotifCount();
  const role = getRole();
  function renderList(){
    const list = loadNotifications();
    const shown = list.filter(n => n.role==='all' || n.role===role);
    const box = document.getElementById('notificationsList');
    box.innerHTML = '';
    shown.forEach(n => {
      const item = document.createElement('div'); item.className='notification-item';
      item.innerHTML = `<div style="display:flex;justify-content:space-between"><strong>${n.title}</strong><span style="color:var(--gray)">${new Date(n.ts).toLocaleString()}</span></div><div style="color:var(--gray);margin:0.25rem 0">${n.message}</div>`;
      if(!n.read){ const btn = document.createElement('button'); btn.className='btn'; btn.textContent='Mark as read'; btn.addEventListener('click', () => { n.read = true; saveNotifications(list); renderList(); renderNotifCount(); }); item.appendChild(btn); }
      box.appendChild(item);
    });
  }
  notifBtn.addEventListener('click', () => { document.getElementById('notificationsPanel').classList.add('open'); renderList(); });
  const closeN = document.getElementById('closeNotifications');
  if(closeN) closeN.addEventListener('click', () => { document.getElementById('notificationsPanel').classList.remove('open'); });
  const markAll = document.getElementById('markAllRead');
  if(markAll) markAll.addEventListener('click', () => { const all = loadNotifications(); all.forEach(n => n.read=true); saveNotifications(all); renderList(); renderNotifCount(); });
}

// Action buttons for admin and lecturer dashboards
const actionViewBtns = document.querySelectorAll('.action-btn.view-btn');
const actionEditBtns = document.querySelectorAll('.action-btn.edit-btn');
const actionDeleteBtns = document.querySelectorAll('.action-btn.delete-btn');
const addUserBtn = document.querySelector('.admin-dashboard .btn.btn-primary');
const addCourseBtn = document.querySelector('.lecturer-dashboard .btn.btn-primary');
const reportBtns = document.querySelectorAll('.table-container .btn');

// Course data
const courses = {
    javascript: {
        title: "Advanced JavaScript",
        description: "Master modern JavaScript concepts including ES6+, async/await, and more.",
        icon: "fa-code"
    },
    physics: {
        title: "Quantum Physics",
        description: "Explore the fascinating world of quantum mechanics and its applications.",
        icon: "fa-microscope"
    },
    finance: {
        title: "Financial Analysis",
        description: "Learn to analyze financial statements and make investment decisions.",
        icon: "fa-chart-line"
    },
    design: {
        title: "UI/UX Design",
        description: "Create beautiful and functional user interfaces with modern design principles.",
        icon: "fa-palette"
    },
    ml: {
        title: "Machine Learning",
        description: "Build intelligent systems that learn from data using Python and TensorFlow.",
        icon: "fa-database"
    },
    pm: {
        title: "Project Management",
        description: "Master the skills to lead projects successfully from initiation to closure.",
        icon: "fa-project-diagram"
    }
};

// Current course tracking
let currentCourse = null;
let completedLessons = [];

// Theme Toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// Chatbot Toggle
function mountChatbotOverlay() {
    if (document.getElementById('chatbotContainer')) return;
    const wrap = document.createElement('div');
    wrap.className = 'chatbot-container';
    wrap.id = 'chatbotContainer';
    wrap.style.display = 'flex';
    wrap.innerHTML = '<div class="chatbot-header"><h3><i class="fas fa-robot"></i> SmartLearn AI Tutor</h3><button class="close-chat" id="closeChat">&times;</button></div><div class="chat-messages" id="chatMessages"><div class="message bot-message">Hello! I\'m your SmartLearn Assistant. What topic would you like help with?</div></div><div class="chat-input"><input type="text" id="userInput" placeholder="Type your message..." /><button id="sendBtn">Send</button></div>';
    document.body.appendChild(wrap);
    const sendEl = document.getElementById('sendBtn');
    const inputEl = document.getElementById('userInput');
    const closeEl = document.getElementById('closeChat');
    if (sendEl) sendEl.addEventListener('click', handleUserMessage);
    if (inputEl) inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserMessage(); });
    if (closeEl) closeEl.addEventListener('click', () => { const c = document.getElementById('chatbotContainer'); if (c) c.style.display = 'none'; });
}

function toggleChatbot() {
    let container = document.getElementById('chatbotContainer');
    if (!container) {
        mountChatbotOverlay();
        container = document.getElementById('chatbotContainer');
    }
    if (!container) return;
    container.style.display = container.style.display === 'flex' ? 'none' : 'flex';
}

if(chatbotToggle){
    console.log("chatbotToggle event listener attached");
    chatbotToggle.addEventListener('click', toggleChatbot);
} else {
    console.warn('chatbotToggle element not found or unavailable');
}
if (floatingChatBtn) floatingChatBtn.addEventListener('click', toggleChatbot);
if (closeChat) closeChat.addEventListener('click', () => {
    if (chatbotContainer) chatbotContainer.style.display = 'none';
});

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.id === 'messages') {
            e.preventDefault();
            window.location.href = 'messages.html';
            return;
        }
        if (link.id === 'settings-link') {
            e.preventDefault();
            window.location.href = 'settings.html';
            return;
        }
        if (link.id === 'courses') {
            e.preventDefault();
            window.location.href = 'courses.html';
            return;
        }
        if (link.id === 'progress') {
            e.preventDefault();
            window.location.href = 'progress.html';
            return;
        }
        document.body.classList.remove('nav-open');
    });
});

// Contact Form Validation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Course Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // In a real app, this would filter courses
    });
});

// Enroll in Course
enrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const courseKey = btn.dataset.course;
        currentCourse = courseKey;
        completedLessons = [];
        try {
            const name = localStorage.getItem('studentDisplayName') || localStorage.getItem('studentName') || 'Student';
            const enr = JSON.parse(localStorage.getItem('enrollments') || '[]');
            enr.push({ id: Date.now(), student: name, courseKey });
            localStorage.setItem('enrollments', JSON.stringify(enr));
            localStorage.setItem('currentCourseKey', courseKey);
        } catch (e) {}
        
        // Update course content page
        const courseData = courses[courseKey];
        if (courseTitle) courseTitle.textContent = courseData.title;
        if (courseDescription) courseDescription.textContent = courseData.description;
        if (courseIcon) courseIcon.innerHTML = `<i class="fas ${courseData.icon}"></i>`;
        if (certificateCourse) certificateCourse.textContent = courseData.title;
        try { localStorage.setItem('lastCourseUrl', 'course-content.html'); localStorage.setItem('lastCourseTitle', courseData.title); } catch (e) {}
        
        // Redirect to course-content page
        window.location.href = 'course-content.html';
    });
});

// Complete Lesson
function loadProgress(courseKey) {
    try {
        const raw = localStorage.getItem(`progress_${courseKey}`);
        return raw ? JSON.parse(raw) : [];
    } catch(e) {
        return [];
    }
}

function saveProgress(courseKey, progress) {
    try {
        localStorage.setItem(`progress_${courseKey}`, JSON.stringify(progress));
    } catch(e) {}
}

completionButtons.forEach(btn => {
    if (btn.id !== 'completeCourse') {
        btn.addEventListener('click', () => {
            const lessonNum = btn.dataset.lesson;
            if (!completedLessons.includes(lessonNum)) {
                completedLessons.push(lessonNum);
                // Save progress persistently
                saveProgress(currentCourse, completedLessons);
            }
            btn.textContent = 'Completed ✓';
            btn.classList.add('btn-success');
            btn.disabled = true;
            
            // Show next lesson if exists
            if (parseInt(lessonNum) < 3) {
                const nextLesson = document.getElementById(`lesson${parseInt(lessonNum) + 1}`);
                if (nextLesson) {
                    nextLesson.style.display = 'block';
                }
            }
        });
    }
});

// On load, restore completed lessons UI state
document.addEventListener('DOMContentLoaded', () => {
    if (!currentCourse) return;
    completedLessons = loadProgress(currentCourse);
    completedLessons.forEach(lessonNum => {
        const btn = document.querySelector(`.completion-btn[data-lesson="${lessonNum}"]`);
        if (btn) {
            btn.textContent = 'Completed ✓';
            btn.classList.add('btn-success');
            btn.disabled = true;
        }
        const lesson = document.getElementById(`lesson${lessonNum}`);
        if (lesson) {
            lesson.style.display = 'block';
        }
    });
});

// Complete Course and Show Certificate
// Course completion → create a record for admin/lecturer review
function loadCompletions() {
    try {
        const raw = localStorage.getItem('completions');
        return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
}
function saveCompletions(list) {
    try { localStorage.setItem('completions', JSON.stringify(list)); } catch (e) {}
}
function addCompletion(record) {
    const list = loadCompletions();
    list.push(record);
    saveCompletions(list);
}

if (completeCourseBtn) {
    completeCourseBtn.addEventListener('click', () => {
        if (completedLessons.length >= 3) {
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateStr = today.toLocaleDateString('en-US', options);
            let name = 'Student';
            try { name = localStorage.getItem('studentDisplayName') || localStorage.getItem('studentName') || 'Student'; } catch (e) {}
            const courseTitleStr = (certificateCourse && certificateCourse.textContent) ? certificateCourse.textContent : 'Course';
            const styleMap = { javascript: 'gold', design: 'dark', ml: 'pastel', physics: 'gold', finance: 'dark', pm: 'pastel' };
            const styleKey = styleMap[currentCourse] || 'gold';
            const record = {
                id: Date.now(),
                student: name,
                courseKey: currentCourse,
                courseTitle: courseTitleStr,
                date: dateStr,
                status: 'approved',  // auto approve
                style: styleKey,
                score: null,
                reviewed: true
            };
            addCompletion(record);

            // Save completion to localStorage for progress page
            try {
                let completionsList = JSON.parse(localStorage.getItem('completionsList') || '[]');
                completionsList.push(record);
                localStorage.setItem('completionsList', JSON.stringify(completionsList));
            } catch(e) {}

            alert('Course completed! Your certificate is ready.');
            if (certificateModal) certificateModal.style.display = 'block';
        } else {
            alert('Please complete all lessons before submitting for approval.');
        }
    });
}

// Close Certificate Modal
if (closeCertificate) {
    closeCertificate.addEventListener('click', () => {
        if (certificateModal) certificateModal.style.display = 'none';
    });
}

// Download Certificate (simulated)
if (downloadCertificate) {
    downloadCertificate.addEventListener('click', () => {
        window.location.href = 'certificate.html';
    });
}

// Chatbot Logic
const responses = {
    hello: "Hi there! How can I help you learn today?",
    hi: "Hello! What would you like to learn about?",
    math: "Let's dive into math! Here's a quick refresher on algebra: Variables represent unknown values, and equations show relationships between quantities.",
    science: "Science is amazing! Do you want to learn about physics, chemistry, or biology?",
    programming: "Programming is a valuable skill! Would you like to learn about web development, data science, or mobile apps?",
    quiz: "Sure! Here's a mini quiz: What is the capital of France? A) London B) Berlin C) Paris D) Madrid",
    feedback: "I'd love to give you feedback! Please share what you're working on.",
    progress: "I see you're making great progress! Keep up the good work.",
    certificate: "Congratulations on completing your course! Your certificate is ready for download.",
    enroll: "To enroll in a course, simply click the 'Enroll' button on any course card.",
    default: "I'm still learning! Try asking about math, science, programming, or quizzes. You can also ask for feedback or check your progress."
};

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords
    for (const [key, response] of Object.entries(responses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    
    // Default response
    return responses.default;
}

function addMessage(message, isUser = false) {
    const box = document.getElementById('chatMessages');
    if (!box) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + (isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    box.appendChild(messageDiv);
    box.scrollTop = box.scrollHeight;
}

function handleUserMessage() {
    const inputEl = document.getElementById('userInput');
    if (!inputEl) return;
    const message = inputEl.value.trim();
    if (message) {
        addMessage(message, true);
        inputEl.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse);
        }, 500);
    }
}

if (sendBtn) sendBtn.addEventListener('click', handleUserMessage);
if (userInput) userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

if (continueLearningBtn) {
    continueLearningBtn.addEventListener('click', () => {
        window.location.href = 'course.html';
    });
}

if (topMessages) {
    topMessages.addEventListener('click', () => {
        window.location.href = 'messages.html';
    });
}

if (logoutTop) {
    logoutTop.addEventListener('click', () => {
        window.location.href = '../home.html';
    });
}

// Animate progress bars when they come into view
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const progress = bar.style.getPropertyValue('--progress');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = progress;
            bar.classList.add('animated');
        }, 100);
    });
};

// Initialize progress bars
animateProgressBars();

// Initialize lessons visibility
document.querySelectorAll('.lesson').forEach((lesson, index) => {
    if (index > 0) {
        lesson.style.display = 'none';
    }
});

// Role Selection and Theming
function applyRoleTheme(role) {
    // Remove existing role themes
    document.body.classList.remove('lecturer-theme', 'admin-theme');
    // Apply new theme if not student (default)
    if (role === 'lecturer') {
        document.body.classList.add('lecturer-theme');
    } else if (role === 'admin') {
        document.body.classList.add('admin-theme');
    }
    // Store role in localStorage
    localStorage.setItem('selectedRole', role);
}

// Load saved role on page load
const savedRole = localStorage.getItem('selectedRole') || 'student';
applyRoleTheme(savedRole);

// Role button event listeners
roleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const role = btn.dataset.role;
        applyRoleTheme(role);
        // Redirect to appropriate dashboard
        if (role === 'student') {
            window.location.href = 'Students/student_login.html';
        } else if (role === 'lecturer') {
            window.location.href = 'Lecture/lecturer_login.html';
        } else if (role === 'admin') {
            window.location.href = 'Admin/admin_login.html';
        }
    });
});

// Action button event listeners for admin and lecturer dashboards
actionViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Viewing details... In a real application, this would open a detailed view.');
    });
});

actionEditBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Editing... In a real application, this would enable edit mode.');
    });
});

actionDeleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this item?')) {
            alert('Item deleted. In a real application, this would remove the item from the database.');
        }
    });
});

if (addUserBtn) {
    addUserBtn.addEventListener('click', () => {
        alert('Adding new user... In a real application, this would open a form to add a user.');
    });
}

if (addCourseBtn) {
    addCourseBtn.addEventListener('click', () => {
        alert('Adding new course... In a real application, this would open a form to add a course.');
    });
}

reportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const reportType = btn.textContent.trim();
        alert(`Generating ${reportType} report... In a real application, this would display or download the report.`);
    });
});
 
// Announcements Data - simulate fetching from backend/localStorage
const announcementsKey = 'studentAnnouncements';

function loadAnnouncements() {
    try {
        const data = localStorage.getItem(announcementsKey);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function renderAnnouncements() {
    const list = loadAnnouncements();
    const container = document.getElementById('announcements-list');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No announcements at this time.';
        container.appendChild(li);
        return;
    }
    list.forEach(ann => {
        const li = document.createElement('li');
        li.textContent = `${ann.date} - ${ann.message}`;
        container.appendChild(li);
    });
}

// Assignment Submission Logic
const assignmentForm = document.getElementById('assignmentUploadForm');
const assignmentStatus = document.getElementById('assignmentUploadStatus');

function saveAssignmentSubmission(submission) {
    try {
        const existing = localStorage.getItem('assignmentSubmissions');
        const submissions = existing ? JSON.parse(existing) : [];
        submissions.push(submission);
        localStorage.setItem('assignmentSubmissions', JSON.stringify(submissions));
        return true;
    } catch (e) {
        return false;
    }
}

if (assignmentForm) {
    assignmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const courseSelect = document.getElementById('courseSelect');
        const assignmentFile = document.getElementById('assignmentFile');
        if (!courseSelect.value) {
            alert('Please select a course.');
            return;
        }
        if (!assignmentFile.files.length) {
            alert('Please select a file.');
            return;
        }
        // Create a submission record
        const submission = {
            id: Date.now(),
            course: courseSelect.value,
            fileName: assignmentFile.files[0].name,
            submittedAt: new Date().toLocaleString(),
            student: (function(){ try{ return localStorage.getItem('studentDisplayName') || localStorage.getItem('studentName') || 'Student' }catch(e){ return 'Student' } })(),
            status: 'submitted'
        };
        const success = saveAssignmentSubmission(submission);
        if (success) {
            assignmentStatus.textContent = `Successfully submitted "${submission.fileName}" for ${submission.course}.`;
            assignmentForm.reset();
        } else {
            assignmentStatus.textContent = 'Failed to submit assignment. Please try again.';
            assignmentStatus.style.color = 'red';
        }
    });
}

// Initial rendering calls
document.addEventListener('DOMContentLoaded', () => {
    renderAnnouncements();
    if (typeof initializeStudentDashboard === 'function') {
        initializeStudentDashboard();
    }
    if (typeof renderAdminCompletions === 'function') {
        renderAdminCompletions();
    }
    if (typeof renderLecturerCompletions === 'function') {
        renderLecturerCompletions();
    }
    initializeLecturerDashboard();
    initializeMessagingBridge();
    renderStudentMaterials();
    initializeCoursesPage();
    initializeUploadMaterialsPage();
    initializeAssignmentsPage();
    initializeChatWithStudentsPage();
    initializeAIAssistantPage();
    initializeStudentPerformancePage();
    initializeAnnouncementsPage();
    initializeProfileManagementPage();
    initializeGradingPage();
    initializeSettingsPage();
    initializeAdminDashboard();
    initializeAdminUsersPage();
    initializeAdminCoursesPage();
    initializeAdminMonitoringPage();
    initializeAdminApprovalsPage();
    initializeAdminContentPage();
    initializeAdminReportsPage();
    initializeAdminAnnouncementsPage();
    initializeAdminSettingsPage();
    renderStudentNotifications();
});

function loadMaterials(){ try{ const r = localStorage.getItem('materials'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function saveMaterials(list){ try{ localStorage.setItem('materials', JSON.stringify(list)) }catch(e){} }
function loadAssignments(){ try{ const r = localStorage.getItem('assignments'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function saveAssignments(list){ try{ localStorage.setItem('assignments', JSON.stringify(list)) }catch(e){} }
function loadEnrollments(){ try{ const r = localStorage.getItem('enrollments'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function loadSubmissions(){ try{ const r = localStorage.getItem('assignmentSubmissions'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function saveSubmissions(list){ try{ localStorage.setItem('assignmentSubmissions', JSON.stringify(list)) }catch(e){} }
function loadMessages(){ try{ const r = localStorage.getItem('messagesStore'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function saveMessages(list){ try{ localStorage.setItem('messagesStore', JSON.stringify(list)) }catch(e){} }
function loadNotifications(){ try{ const r = localStorage.getItem('studentNotifications'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function saveNotifications(list){ try{ localStorage.setItem('studentNotifications', JSON.stringify(list)) }catch(e){} }
function pushStudentNotification(type, payload){ const list = loadNotifications(); list.unshift({ id: Date.now(), type, payload, ts: new Date().toISOString() }); saveNotifications(list); }

function initializeLecturerDashboard(){
    const root = document.querySelector('.lecturer-dashboard');
    if(!root) return;
    const sections = Array.from(root.querySelectorAll('.content-section'));
    const sidebar = root.parentElement ? root.parentElement.querySelector('.sidebar') : null;
    if (sidebar) {
        sidebar.querySelectorAll('a[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const id = link.getAttribute('data-section');
                sections.forEach(s => { s.classList.toggle('active', s.id === id); s.style.display = s.id===id ? 'block' : 'none'; });
            });
        });
        document.querySelectorAll('[data-section-target]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-section-target');
                sections.forEach(s => { s.classList.toggle('active', s.id === id); s.style.display = s.id===id ? 'block' : 'none'; });
            });
        });
    }
    const coursesBody = document.getElementById('lecturerCoursesTableBody');
    const addCourseBtn = document.getElementById('lecturerAddCourseBtn');
    const materialsForm = document.getElementById('lecturerMaterialsForm');
    const materialsList = document.getElementById('lecturerMaterialsList');
    const assignmentForm = document.getElementById('lecturerAssignmentForm');
    const assignmentsList = document.getElementById('lecturerAssignmentsList');
    const submissionsList = document.getElementById('lecturerSubmissionsList');
    const analyticsBox = document.getElementById('lecturerAnalytics');
    const studentsList = document.getElementById('lecturerStudentsList');
    const annForm = document.getElementById('lecturerAnnouncementsForm');
    const msgForm = document.getElementById('lecturerMessageForm');
    const profileForm = document.getElementById('lecturerProfileForm');
    const welcomeEl = document.getElementById('lecWelcome');
    const statCourses = document.getElementById('statCourses');
    const statStudents = document.getElementById('statStudents');
    const statPending = document.getElementById('statPending');
    const statMessages = document.getElementById('statMessages');
    const recentMaterial = document.getElementById('recentMaterial');
    const recentAnnouncement = document.getElementById('recentAnnouncement');
    const recentSubmission = document.getElementById('recentSubmission');
    const upcomingList = document.getElementById('lecUpcomingList');
    const settingsForm = document.getElementById('lecturerSettingsForm');

    function renderCourses(){
        const enr = loadEnrollments();
        const counts = { ict:0, cs:0, ce:0 };
        enr.forEach(e => {
            const ck = (e.courseKey||'');
            if (ck.startsWith('ict-')) counts.ict++;
            else if (ck.startsWith('cs-')) counts.cs++;
            else if (ck.startsWith('ce-')) counts.ce++;
        });
        const map = { ict:'Information Technology', cs:'Computer Studies', ce:'Computer Engineering' };
        const rows = Object.keys(counts).map(k => {
            const subCount = loadSubmissions().filter(s => (s.courseKey||'').startsWith(k)).length;
            const pct = Math.min(100, (subCount||0)*10);
            return `<tr><td>${map[k]}</td><td>${counts[k]}</td><td>${pct}%</td><td><button class="action-btn view-btn">View</button></td></tr>`;
        }).join('');
        if(coursesBody) coursesBody.innerHTML = rows;
        if(statCourses) statCourses.textContent = String(Object.keys(counts).filter(k => counts[k]>0).length);
        if(statStudents) statStudents.textContent = String(enr.length);
    }

    function renderMaterials(){
        const list = loadMaterials();
        if(materialsList) materialsList.innerHTML = list.map(m => `<li>${m.title} · ${m.type.toUpperCase()} · ${m.courseKey}</li>`).join('');
        if(recentMaterial) recentMaterial.textContent = list.length ? list[list.length-1].title : 'None';
    }

    function renderAssignments(){
        const list = loadAssignments();
        if(assignmentsList) assignmentsList.innerHTML = list.map(a => `<tr><td>${a.title}</td><td>${a.courseKey}</td><td>${a.type}</td><td>${a.due}</td></tr>`).join('');
        if(upcomingList){
            const soon = list.slice().sort((a,b) => new Date(a.due) - new Date(b.due)).slice(0,5);
            upcomingList.innerHTML = soon.map(a => `<tr><td>${a.title}</td><td>${a.courseKey}</td><td>${a.type}</td><td>${a.due}</td></tr>`).join('');
        }
    }

    function renderSubmissions(){
        const list = loadSubmissions();
        if(!submissionsList) return;
        submissionsList.innerHTML = list.map(s => {
            const grade = s.grade!=null ? s.grade : '';
            const feedback = s.feedback || '';
            return `<tr><td>${s.student||'-'}</td><td>${s.course}</td><td>${s.fileName}</td><td>${s.submittedAt}</td><td><input type="text" data-id="${s.id}" class="grade-input" value="${grade}"></td><td><input type="text" data-id="${s.id}" class="feedback-input" value="${feedback}"></td><td><button class="btn" data-id="${s.id}">Save</button></td></tr>`;
        }).join('');
        if(statPending) statPending.textContent = String(list.filter(s => s.status==='submitted' && !s.grade).length);
        if(recentSubmission) recentSubmission.textContent = list.length ? `${list[list.length-1].student||'-'} · ${list[list.length-1].course}` : 'None';
        submissionsList.querySelectorAll('button.btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const gEl = submissionsList.querySelector(`input.grade-input[data-id="${id}"]`);
                const fEl = submissionsList.querySelector(`input.feedback-input[data-id="${id}"]`);
                const list = loadSubmissions();
                const idx = list.findIndex(x => x.id===id);
                if(idx>-1){
                    list[idx].grade = gEl ? gEl.value : null;
                    list[idx].feedback = fEl ? fEl.value : '';
                    list[idx].status = 'graded';
                    saveSubmissions(list);
                    try{
                        const gb = JSON.parse(localStorage.getItem('studentGradebook')||'[]');
                        gb.push({ id, course:list[idx].course, student:list[idx].student, grade:list[idx].grade, feedback:list[idx].feedback, ts:new Date().toISOString(), published:false });
                        localStorage.setItem('studentGradebook', JSON.stringify(gb));
                    }catch(e){}
                    pushStudentNotification('graded', { student:list[idx].student, course:list[idx].course, grade:list[idx].grade, feedback:list[idx].feedback });
                }
                renderSubmissions();
            });
        });
    }

    function renderAnalytics(){
        const enr = loadEnrollments();
        const subs = loadSubmissions();
        const compl = JSON.parse(localStorage.getItem('completionsList')||'[]');
        const att = Math.min(100, enr.length*5);
        const assignPct = Math.round((subs.length/(enr.length||1))*50);
        const quizAvg = 72;
        const progressAvg = Math.round((compl.length/(enr.length||1))*100);
        if(analyticsBox) analyticsBox.innerHTML = [
            `<div class="card"><div class="card-header"><div class="card-title">Attendance</div><div class="card-icon"><i class="fas fa-user-check"></i></div></div><div class="card-value">${att}%</div></div>`,
            `<div class="card"><div class="card-header"><div class="card-title">Assignment Completion</div><div class="card-icon"><i class="fas fa-tasks"></i></div></div><div class="card-value">${assignPct}%</div></div>`,
            `<div class="card"><div class="card-header"><div class="card-title">Quiz Scores</div><div class="card-icon"><i class="fas fa-file-alt"></i></div></div><div class="card-value">${quizAvg}%</div></div>`,
            `<div class="card"><div class="card-header"><div class="card-title">Progress</div><div class="card-icon"><i class="fas fa-chart-line"></i></div></div><div class="card-value">${progressAvg}%</div></div>`
        ].join('');
        const map = { javascript:'Advanced JavaScript', design:'UI/UX Design', ml:'Machine Learning' };
        if(studentsList) studentsList.innerHTML = enr.map(e => `<tr><td>${e.student}</td><td>${map[e.courseKey]||e.courseKey}</td></tr>`).join('');
        const name = (function(){ try{ return localStorage.getItem('lecturerName') || 'Lecturer' }catch(e){ return 'Lecturer' } })();
        if(welcomeEl) welcomeEl.textContent = `Welcome, ${name}!`;
    }

    if(addCourseBtn){ addCourseBtn.addEventListener('click', renderCourses); }
    if(materialsForm){ materialsForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const courseKey = document.getElementById('lecturerMaterialCourse').value;
        const title = document.getElementById('lecturerMaterialTitle').value;
        const type = document.getElementById('lecturerMaterialType').value;
        const fileEl = document.getElementById('lecturerMaterialFile');
        const fileName = fileEl && fileEl.files && fileEl.files[0] ? fileEl.files[0].name : '';
        const list = loadMaterials();
        list.push({ id: Date.now(), courseKey, title, type, fileName });
        saveMaterials(list);
        renderMaterials();
        pushStudentNotification('material_new', { courseKey, title, type, fileName });
    }); }
    if(assignmentForm){ assignmentForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const courseKey = document.getElementById('lecturerAssignmentCourse').value;
        const title = document.getElementById('lecturerAssignmentTitle').value;
        const type = document.getElementById('lecturerAssignmentType').value;
        const due = document.getElementById('lecturerAssignmentDue').value;
        const list = loadAssignments();
        list.push({ id: Date.now(), courseKey, title, type, due, createdAt: new Date().toISOString() });
        saveAssignments(list);
        renderAssignments();
        try{ const dl = JSON.parse(localStorage.getItem('studentDeadlines')||'[]'); dl.push({ id: Date.now(), courseKey, title, due, type }); localStorage.setItem('studentDeadlines', JSON.stringify(dl)); }catch(e){}
        pushStudentNotification('assignment_new', { courseKey, title, due, type });
    }); }
    if(annForm){ annForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const t = document.getElementById('lecturerAnnouncementText').value;
        const list = loadAnnouncements();
        list.unshift({ date: new Date().toLocaleString(), message: t });
        try{ localStorage.setItem('studentAnnouncements', JSON.stringify(list)); }catch(e){}
        if(recentAnnouncement) recentAnnouncement.textContent = t || 'None';
    }); }
    if(msgForm){ msgForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const target = document.getElementById('lecturerMessageTarget').value;
        const text = document.getElementById('lecturerMessageText').value;
        const list = loadMessages();
        list.push({ id: Date.now(), from: 'lecturer', target, text, ts: new Date().toISOString() });
        saveMessages(list);
    }); }
    if(profileForm){ profileForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const payload = {
            name: document.getElementById('lecturerName').value,
            email: document.getElementById('lecturerEmail').value,
            password: document.getElementById('lecturerPassword').value,
            contact: document.getElementById('lecturerContact').value
        };
        try{ localStorage.setItem('lecturerProfile', JSON.stringify(payload)); }catch(e){}
    }); }
    if(settingsForm){ settingsForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const payload = {
            notifications: document.getElementById('lecNotif').checked,
            dark: document.getElementById('lecDark').checked,
            allowDM: document.getElementById('lecComm').checked
        };
        try{ localStorage.setItem('lecturerSettings', JSON.stringify(payload)); }catch(e){}
    });
    try{
        const set = JSON.parse(localStorage.getItem('lecturerSettings')||'{}');
        const n = document.getElementById('lecNotif'); if(n) n.checked = !!set.notifications;
        const d = document.getElementById('lecDark'); if(d) d.checked = !!set.dark;
        const c = document.getElementById('lecComm'); if(c) c.checked = !!set.allowDM;
    }catch(e){}
    }
    
    renderCourses();
    renderMaterials();
    renderAssignments();
    renderSubmissions();
    renderAnalytics();
    try{
        const msgs = loadMessages();
        if(statMessages) statMessages.textContent = String(msgs.length);
    }catch(e){}
}

function initializeMessagingBridge(){
    const tl = document.getElementById('threadList');
    const mc = document.getElementById('messagesContainer');
    const mi = document.getElementById('messageInput');
    const sb = document.getElementById('messageSendBtn');
    const cn = document.getElementById('chatName');
    const ca = document.getElementById('chatAvatar');
    if(!tl || !mc || !mi || !sb) return;
    let threads = [];
    function buildFromStorage(){
        const list = loadMessages();
        const map = {};
        list.forEach(m => { const key = m.target; if(!map[key]) map[key] = []; map[key].push(m); });
        threads = Object.keys(map).map(k => ({ key:k, name:k, initial:k.includes('course:')?k.split(':')[1][0].toUpperCase():'L', messages: map[k] }));
    }
    function renderThreads(){
        tl.innerHTML = '';
        threads.forEach((t, i) => {
            const item = document.createElement('div'); item.className='thread-item';
            const avatar = document.createElement('div'); avatar.className='avatar'; avatar.textContent = t.initial;
            const meta = document.createElement('div'); meta.className='thread-meta';
            const name = document.createElement('div'); name.className='thread-name'; name.textContent = t.name;
            meta.appendChild(name); item.appendChild(avatar); item.appendChild(meta);
            item.addEventListener('click', () => selectThread(i)); tl.appendChild(item);
        });
    }
    function renderMessages(thread){
        mc.innerHTML = '';
        thread.messages.forEach(m => {
            const group = document.createElement('div'); group.className='message-group';
            const row = document.createElement('div'); row.className='message-row';
            const bubble = document.createElement('div'); bubble.className='message-bubble ' + (m.from==='student'?'user':'other'); bubble.textContent = m.text;
            const ts = document.createElement('div'); ts.className='timestamp'; ts.textContent = new Date(m.ts).toLocaleTimeString();
            row.appendChild(bubble); group.appendChild(row); group.appendChild(ts); mc.appendChild(group);
        });
        mc.scrollTop = mc.scrollHeight;
    }
    let activeIndex = 0;
    function selectThread(i){ activeIndex = i; const t = threads[i]; if(cn) cn.textContent = t.name; if(ca) ca.textContent = t.initial; renderMessages(t); }
    sb.addEventListener('click', () => {
        const text = mi.value.trim(); if(!text) return; const t = threads[activeIndex];
        const list = loadMessages(); list.push({ id: Date.now(), from: 'student', target: t.key, text, ts: new Date().toISOString() }); saveMessages(list);
        mi.value=''; buildFromStorage(); selectThread(activeIndex);
    });
    buildFromStorage(); renderThreads(); if(threads.length) selectThread(0);
}

window.addEventListener('storage', () => {
    renderAnnouncements();
    initializeLecturerDashboard();
    renderStudentMaterials();
    renderStudentNotifications();
});

function renderStudentMaterials(){
    const listEl = document.getElementById('studentMaterialsList');
    if(!listEl) return;
    const enr = loadEnrollments();
    const keys = new Set(enr.map(e => e.courseKey));
    const mats = loadMaterials().filter(m => keys.has(m.courseKey));
    listEl.innerHTML = mats.length ? mats.map(m => `<li>${m.title} · ${m.type.toUpperCase()} · ${m.courseKey}</li>`).join('') : '<li>No materials yet</li>';
}
function renderStudentNotifications(){
    const listEl = document.getElementById('studentNotificationsList');
    if(!listEl) return;
    const list = loadNotifications();
    listEl.innerHTML = list.length ? list.map(n => `<li>${n.type} · ${new Date(n.ts).toLocaleString()}</li>`).join('') : '<li>No notifications</li>';
}

function initializeCoursesPage(){
    const root = document.querySelector('.page-courses'); if(!root) return;
    const search = document.getElementById('coursesSearch');
    const filterDept = document.getElementById('coursesFilterDept');
    const filterSem = document.getElementById('coursesFilterSem');
    const grid = document.getElementById('coursesGrid');
    function build(){
        const map = { ict:{code:'ICT',desc:'Information Technology',thumb:'💻'}, cs:{code:'CS',desc:'Computer Studies',thumb:'⌨️'}, ce:{code:'CE',desc:'Computer Engineering',thumb:'🧩'} };
        const enr = loadEnrollments();
        const counts = { ict:0, cs:0, ce:0 };
        enr.forEach(e => {
            const ck = (e.courseKey||'');
            if (ck.startsWith('ict-')) counts.ict++;
            else if (ck.startsWith('cs-')) counts.cs++;
            else if (ck.startsWith('ce-')) counts.ce++;
        });
        const data = Object.keys(map).map(k => ({ key:k, title:map[k].desc, code:map[k].code, students:counts[k], thumb:map[k].thumb }));
        const q = (search && search.value || '').toLowerCase();
        const filtered = data.filter(d => d.title.toLowerCase().includes(q) || String(d.code).toLowerCase().includes(q));
        grid.innerHTML = filtered.map(d => `
            <div class="card">
              <div class="card-header"><div class="card-title">${d.title}</div><div class="card-icon">${d.thumb}</div></div>
              <div class="card-value">${d.code}</div>
              <p>Students: ${d.students}</p>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
                <a class="btn" href="UploadMaterials.html?course=${d.key}">Upload Materials</a>
                <a class="btn" href="Assignments.html?course=${d.key}">Assignments</a>
                <a class="btn" href="Announcements.html?course=${d.key}">Announcements</a>
                <a class="btn" href="ChatWithStudents.html?course=${d.key}">Messages</a>
              </div>
            </div>
        `).join('');
    }
    build();
    if(search) search.addEventListener('input', build);
}

function initializeUploadMaterialsPage(){
    const root = document.querySelector('.page-upload-materials'); if(!root) return;
    const form = document.getElementById('uploadMaterialsForm');
    const table = document.getElementById('materialsTableBody');
    const courseSel = document.getElementById('materialsCourse');
    function render(){
        const list = loadMaterials();
        table.innerHTML = list.map(m => `<tr><td>${m.title}</td><td>${m.type}</td><td>${m.fileName||''}</td><td>${m.courseKey}</td><td>${new Date(m.id).toLocaleString()}</td><td><button class="btn" data-id="${m.id}">Delete</button></td></tr>`).join('');
        table.querySelectorAll('button.btn').forEach(b => { b.addEventListener('click', () => { const id = parseInt(b.getAttribute('data-id')); const list = loadMaterials().filter(x => x.id!==id); saveMaterials(list); render(); }); });
    }
    if(form){ form.addEventListener('submit', (ev) => { ev.preventDefault(); const courseKey = courseSel.value; const title = document.getElementById('materialTitle').value; const type = document.getElementById('materialFile').files[0] ? document.getElementById('materialFile').files[0].name.split('.').pop() : 'notes'; const fileName = document.getElementById('materialFile').files[0] ? document.getElementById('materialFile').files[0].name : ''; const list = loadMaterials(); list.push({ id: Date.now(), courseKey, title, type, fileName }); saveMaterials(list); pushStudentNotification('material_new', { courseKey, title, type, fileName }); render(); }); }
    render();
}

function initializeAssignmentsPage(){
    const root = document.querySelector('.page-assignments'); if(!root) return;
    const form = document.getElementById('assignmentCreateForm');
    const listEl = document.getElementById('assignmentsTableBody');
    const courseSel = document.getElementById('assignmentCourse');
    function render(){ const list = loadAssignments(); listEl.innerHTML = list.map(a => `<tr><td>${a.title}</td><td>${a.courseKey}</td><td>${a.due}</td><td><button class="btn" data-id="${a.id}" data-act="view">View Submissions</button><button class="btn" data-id="${a.id}" data-act="del">Delete</button></td></tr>`).join(''); listEl.querySelectorAll('button.btn').forEach(b => { b.addEventListener('click', () => { const id = parseInt(b.getAttribute('data-id')); const act = b.getAttribute('data-act'); if(act==='del'){ const list = loadAssignments().filter(x => x.id!==id); saveAssignments(list); render(); } else { window.location.href = 'Assignments.html#submissions'; } }); }); }
    if(form){ form.addEventListener('submit', (ev) => { ev.preventDefault(); const courseKey = courseSel.value; const title = document.getElementById('assignmentTitle').value; const due = document.getElementById('assignmentDue').value; const list = loadAssignments(); list.push({ id: Date.now(), courseKey, title, type:'file', due, createdAt:new Date().toISOString() }); saveAssignments(list); try{ const dl = JSON.parse(localStorage.getItem('studentDeadlines')||'[]'); dl.push({ id: Date.now(), courseKey, title, due, type:'file' }); localStorage.setItem('studentDeadlines', JSON.stringify(dl)); }catch(e){} pushStudentNotification('assignment_new', { courseKey, title, due, type:'file' }); render(); }); }
    render();
}

function initializeChatWithStudentsPage(){
    const root = document.querySelector('.page-chat'); if(!root) return;
    initializeMessagingBridge();
}

function initializeAIAssistantPage(){
    const root = document.querySelector('.page-ai'); if(!root) return;
    const askBtn = document.getElementById('aiAskBtn');
    const input = document.getElementById('aiInput');
    const out = document.getElementById('aiOutput');
    const courseSel = document.getElementById('aiCourse');
    const saveAssignmentBtn = document.getElementById('aiSaveAssignment');
    const postAnnouncementBtn = document.getElementById('aiPostAnnouncement');
    if(askBtn){ askBtn.addEventListener('click', () => { const prompt = input.value.trim(); const course = courseSel.value; const text = `Notes for ${course}: ${prompt}`; out.value = text; }); }
    if(saveAssignmentBtn){ saveAssignmentBtn.addEventListener('click', () => { const courseKey = document.getElementById('aiCourse').value; const title = 'AI Generated Assignment'; const due = new Date(Date.now()+86400000).toISOString().slice(0,16); const list = loadAssignments(); list.push({ id: Date.now(), courseKey, title, type:'text', due, createdAt:new Date().toISOString() }); saveAssignments(list); pushStudentNotification('assignment_new', { courseKey, title, due, type:'text' }); }); }
    if(postAnnouncementBtn){ postAnnouncementBtn.addEventListener('click', () => { const msg = document.getElementById('aiOutput').value; const list = loadAnnouncements(); list.unshift({ date:new Date().toLocaleString(), message: msg }); try{ localStorage.setItem('studentAnnouncements', JSON.stringify(list)); }catch(e){} pushStudentNotification('announcement', { message: msg }); }); }
}

function initializeStudentPerformancePage(){
    const root = document.querySelector('.page-performance'); if(!root) return;
    const table = document.getElementById('studentsPerfTableBody');
    function render(){ const enr = loadEnrollments(); const gb = JSON.parse(localStorage.getItem('studentGradebook')||'[]'); const rows = enr.map(e => { const grades = gb.filter(x => x.student===e.student); const avg = grades.length ? Math.round(grades.map(x => parseFloat(x.grade||0)).reduce((a,b)=>a+b,0)/grades.length) : 0; const att = 80; return `<tr><td>${e.student}</td><td>${avg}%</td><td>${att}%</td><td><button class="btn" data-stu="${e.student}">View Profile</button></td></tr>`; }).join(''); table.innerHTML = rows; }
    render();
}

function initializeAnnouncementsPage(){
    const root = document.querySelector('.page-announcements'); if(!root) return;
    const form = document.getElementById('announcementForm');
    const listEl = document.getElementById('announcementHistory');
    function render(){ const list = loadAnnouncements(); listEl.innerHTML = list.map(a => `<li>${a.date} · ${a.message}</li>`).join(''); }
    if(form){ form.addEventListener('submit', (ev) => { ev.preventDefault(); const t = document.getElementById('announcementTitle').value; const msg = document.getElementById('announcementMessage').value; const list = loadAnnouncements(); list.unshift({ date:new Date().toLocaleString(), message: t+': '+msg }); try{ localStorage.setItem('studentAnnouncements', JSON.stringify(list)); }catch(e){} pushStudentNotification('announcement', { title: t }); render(); }); }
    render();
}

function initializeProfileManagementPage(){
    const root = document.querySelector('.page-profile'); if(!root) return;
    const form = document.getElementById('profileForm');
    if(form){ form.addEventListener('submit', (ev) => { ev.preventDefault(); const payload = { name: document.getElementById('profileName').value, email: document.getElementById('profileEmail').value, phone: document.getElementById('profilePhone').value, qualifications: document.getElementById('profileQualifications').value }; try{ localStorage.setItem('lecturerProfile', JSON.stringify(payload)); }catch(e){} }); }
}
function initializeGradingPage(){
    const root = document.querySelector('.page-grading'); if(!root) return;
    const courseSel = document.getElementById('gradingCourse');
    const assignSel = document.getElementById('gradingAssignment');
    const totalMarksEl = document.getElementById('gradingTotalMarks');
    const infoTitle = document.getElementById('gradingInfoTitle');
    const infoDeadline = document.getElementById('gradingInfoDeadline');
    const infoCount = document.getElementById('gradingInfoCount');
    const filterSel = document.getElementById('gradingFilter');
    const tableBody = document.getElementById('gradingTableBody');
    const previewBox = document.getElementById('gradingPreview');
    const aiGradeBtn = document.getElementById('aiSuggestGradeBtn');
    const aiFeedbackBtn = document.getElementById('aiSuggestFeedbackBtn');
    const publishAllBtn = document.getElementById('publishAllBtn');
    const unpublishAllBtn = document.getElementById('unpublishAllBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    const gradeAvg = document.getElementById('gradeAvg');
    const gradePass = document.getElementById('gradePass');
    const gradeHigh = document.getElementById('gradeHigh');
    const gradeLow = document.getElementById('gradeLow');
    function augmentRows(){ if(!tableBody) return; Array.from(tableBody.querySelectorAll('tr')).forEach(tr => { const last = tr.querySelector('td:last-child'); if(!last) return; if(last.querySelector('[data-approve]')) return; const saveBtn = last.querySelector('button[data-save]'); const sid = saveBtn ? saveBtn.getAttribute('data-save') : null; if(!sid) return; const approve = document.createElement('button'); approve.className='btn'; approve.setAttribute('data-approve', sid); approve.textContent='Approve'; const decline = document.createElement('button'); decline.className='btn'; decline.setAttribute('data-decline', sid); decline.textContent='Decline'; last.appendChild(approve); last.appendChild(decline); }); }
    if(tableBody){ const mo = new MutationObserver(() => augmentRows()); mo.observe(tableBody, { childList: true, subtree: true }); tableBody.addEventListener('click', (e) => { const t = e.target; if(!(t instanceof HTMLElement)) return; if(t.matches('button[data-approve]')){ const sid = parseInt(t.getAttribute('data-approve')); const mEl = tableBody.querySelector('.g-mark[data-id="'+sid+'"]'); const fEl = tableBody.querySelector('.g-feed[data-id="'+sid+'"]'); const mk = mEl ? parseFloat(mEl.value||0) : null; const fb = fEl ? fEl.value||'' : ''; fetch('http://127.0.0.1:5000/submissions/'+sid+'/lecturer-review', { method:'PUT', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ grade: mk, feedback: fb, graded_by: 0, approved: true, notes: 'Approved' }) }).then(()=>{}); }
      if(t.matches('button[data-decline]')){ const sid = parseInt(t.getAttribute('data-decline')); const mEl = tableBody.querySelector('.g-mark[data-id="'+sid+'"]'); const fEl = tableBody.querySelector('.g-feed[data-id="'+sid+'"]'); const mk = mEl ? parseFloat(mEl.value||0) : null; const fb = fEl ? fEl.value||'' : ''; fetch('http://127.0.0.1:5000/submissions/'+sid+'/lecturer-review', { method:'PUT', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ grade: mk, feedback: fb, graded_by: 0, approved: false, notes: 'Declined' }) }).then(()=>{}); }
    }); }
    function buildAssignments(){ const list = loadAssignments().filter(a => a.courseKey===courseSel.value); assignSel.innerHTML = list.map(a => `<option value="${a.id}">${a.title}</option>`).join(''); const a = list[0]; if(a){ infoTitle.textContent = a.title; infoDeadline.textContent = a.due; totalMarksEl.value = a.marks||100; } else { infoTitle.textContent='-'; infoDeadline.textContent='-'; totalMarksEl.value=''; } render(); }
    function fetchSubs(courseKey){ return fetch('http://127.0.0.1:5000/submissions?course_key='+courseKey).then(r=>r.json()).catch(()=>[]); }
    function render(){ const courseKey = courseSel.value; const assId = parseInt(assignSel.value||'0'); fetchSubs(courseKey).then(subs => { let gb = JSON.parse(localStorage.getItem('studentGradebook')||'[]'); const marksMap = {}; gb.forEach(g => { marksMap[g.id]=g; }); let rows = subs.map(s => ({ student:s.student_id||'-', id:String(s.id||'-'), status:s.status||'submitted', file:s.file_name||'', grade: marksMap[s.id]?.grade||String(s.grade||''), feedback: marksMap[s.id]?.feedback||String(s.feedback||''), published: !!(marksMap[s.id]?.published||s.published), sid:s.id })); if(filterSel.value==='submitted'){ rows = rows.filter(r=>r.status==='submitted'); } if(filterSel.value==='late'){ rows = rows.filter(r=>r.status==='late'); } if(filterSel.value==='not'){ rows = rows.filter(r=>r.status!=='submitted'); } if(filterSel.value==='passed'){ rows = rows.filter(r=>parseFloat(r.grade||0) >= (parseFloat(totalMarksEl.value||100)*0.5)); } if(filterSel.value==='failed'){ rows = rows.filter(r=>parseFloat(r.grade||0) < (parseFloat(totalMarksEl.value||100)*0.5)); } if(filterSel.value==='high'){ rows = rows.sort((a,b)=>parseFloat(b.grade||0)-parseFloat(a.grade||0)); } if(filterSel.value==='low'){ rows = rows.sort((a,b)=>parseFloat(a.grade||0)-parseFloat(b.grade||0)); } infoCount.textContent = String(rows.length); tableBody.innerHTML = rows.map(r => `<tr><td>${r.student}</td><td>${r.id}</td><td>${r.status}</td><td><button class="btn" data-view="${r.sid}">View</button></td><td><input type="number" class="g-mark" data-id="${r.sid}" value="${r.grade}"></td><td><input type="text" class="g-feed" data-id="${r.sid}" value="${r.feedback}"></td><td><input type="checkbox" class="g-pub" data-id="${r.sid}" ${r.published?'checked':''}></td><td><button class="btn" data-save="${r.sid}">Save Grade</button></td></tr>`).join(''); tableBody.querySelectorAll('button[data-view]').forEach(b => { b.addEventListener('click', () => { const sid = parseInt(b.getAttribute('data-view')); const sub = subs.find(x => x.id===sid); previewBox.textContent = sub ? (sub.file_name ? ('Attachment: '+sub.file_name) : (sub.answers_json ? 'Answers provided' : 'No file')) : 'Not found'; }); }); tableBody.querySelectorAll('button[data-save]').forEach(b => { b.addEventListener('click', () => { const sid = parseInt(b.getAttribute('data-save')); const gEl = tableBody.querySelector(`.g-mark[data-id="${sid}"]`); const fEl = tableBody.querySelector(`.g-feed[data-id="${sid}"]`); const pEl = tableBody.querySelector(`.g-pub[data-id="${sid}"]`); const payload = { grade: gEl ? parseFloat(gEl.value||0) : 0, feedback: fEl ? fEl.value : '', graded_by: parseInt(localStorage.getItem('lecturerId')||'0'), published: pEl && pEl.checked ? true : false }; fetch('http://127.0.0.1:5000/submissions/'+sid+'/grade', { method:'PUT', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload) }).then(r=>r.json()).then(()=>{ render(); }).catch(()=>{ const gb = JSON.parse(localStorage.getItem('studentGradebook')||'[]'); const idx = gb.findIndex(x => x.id===sid); if(idx>-1){ gb[idx].grade = String(payload.grade); gb[idx].feedback = payload.feedback; gb[idx].published = payload.published; } else { gb.push({ id:sid, course:courseKey, student:(subs.find(x=>x.id===sid)?.student_id||'-'), grade: String(payload.grade), feedback: payload.feedback, ts:new Date().toISOString(), published: payload.published }); } localStorage.setItem('studentGradebook', JSON.stringify(gb)); render(); }); }); }); tableBody.querySelectorAll('.g-pub').forEach(ch => { ch.addEventListener('change', () => { const sid = parseInt(ch.getAttribute('data-id')); const gb = JSON.parse(localStorage.getItem('studentGradebook')||'[]'); const idx = gb.findIndex(x => x.id===sid); if(idx>-1){ gb[idx].published = ch.checked; localStorage.setItem('studentGradebook', JSON.stringify(gb)); } }); }); renderAnalytics(rows); }); }
    function renderAnalytics(rows){ const grades = rows.map(r=>parseFloat(r.grade||0)).filter(n=>!isNaN(n)); const avg = grades.length ? Math.round(grades.reduce((a,b)=>a+b,0)/grades.length) : 0; const high = grades.length ? Math.max(...grades) : 0; const low = grades.length ? Math.min(...grades) : 0; const pass = rows.length ? Math.round((rows.filter(r=>parseFloat(r.grade||0) >= (parseFloat(totalMarksEl.value||100)*0.5)).length/rows.length)*100) : 0; gradeAvg.textContent = String(avg); gradeHigh.textContent = String(high); gradeLow.textContent = String(low); gradePass.textContent = pass+'%'; }
    function exportCsv(){ const gb = JSON.parse(localStorage.getItem('studentGradebook')||'[]'); const rows = [['Student','Course','Grade','Feedback','Published']].concat(gb.map(g => [g.student,g.course,g.grade,g.feedback,g.published?'Yes':'No'])); const csv = rows.map(r=>r.join(',')).join('\n'); const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,'+encodeURIComponent(csv); a.download = 'grades.csv'; a.click(); }
    function exportPdf(){ window.print(); }
    if(courseSel) courseSel.addEventListener('change', buildAssignments);
    if(assignSel) assignSel.addEventListener('change', render);
    if(filterSel) filterSel.addEventListener('change', render);
    if(exportCsvBtn) exportCsvBtn.addEventListener('click', exportCsv);
    if(exportPdfBtn) exportPdfBtn.addEventListener('click', exportPdf);
    if(publishAllBtn) publishAllBtn.addEventListener('click', () => { const gb = JSON.parse(localStorage.getItem('studentGradebook')||'[]'); gb.forEach(g => g.published=true); localStorage.setItem('studentGradebook', JSON.stringify(gb)); pushStudentNotification('grades_published_all', {}); render(); });
    if(unpublishAllBtn) unpublishAllBtn.addEventListener('click', () => { const gb = JSON.parse(localStorage.getItem('studentGradebook')||'[]'); gb.forEach(g => g.published=false); localStorage.setItem('studentGradebook', JSON.stringify(gb)); render(); });
    if(aiGradeBtn) aiGradeBtn.addEventListener('click', () => { const mk = parseFloat(totalMarksEl.value||100); const suggested = Math.round(mk*0.75); const sel = tableBody.querySelector('.g-mark'); if(sel) sel.value = String(suggested); });
    if(aiFeedbackBtn) aiFeedbackBtn.addEventListener('click', () => { const sel = tableBody.querySelector('.g-feed'); if(sel) sel.value = 'Good structure. Improve detail in key areas.'; });
    if(courseSel) buildAssignments();
}

function initializeSettingsPage(){
    const root = document.querySelector('.page-settings'); if(!root) return;
    const pForm = document.getElementById('settingsPersonalForm');
    const sForm = document.getElementById('settingsSecurityForm');
    const nForm = document.getElementById('settingsNotifyForm');
    const dForm = document.getElementById('settingsDashboardForm');
    const prForm = document.getElementById('settingsPrivacyForm');
    const aiForm = document.getElementById('settingsAIForm');
    const loginList = document.getElementById('loginActivityList');
    const logoutAll = document.getElementById('logoutAllBtn');
    const delBtn = document.getElementById('deleteAccountBtn');
    function loadObj(key){ try{ const r = localStorage.getItem(key); return r?JSON.parse(r):{} }catch(e){ return {} } }
    function saveObj(key, obj){ try{ localStorage.setItem(key, JSON.stringify(obj)) }catch(e){} }
    if(pForm){ pForm.addEventListener('submit', (ev) => { ev.preventDefault(); const obj = { name: document.getElementById('setFullName').value, email: document.getElementById('setEmail').value, phone: document.getElementById('setPhone').value, dept: document.getElementById('setDept').value, office: document.getElementById('setOffice').value }; saveObj('lecturerProfile', obj); }); }
    if(sForm){ sForm.addEventListener('submit', (ev) => { ev.preventDefault(); const obj = loadObj('lecturerSecurity'); obj.password = document.getElementById('secNew').value; obj.twofa = document.getElementById('sec2fa').checked; saveObj('lecturerSecurity', obj); const act = loadObj('loginActivity'); const ts = new Date().toLocaleString(); act.items = (act.items||[]); act.items.push({ device:'This device', ts }); saveObj('loginActivity', act); }); }
    function renderLogin(){ const act = loadObj('loginActivity'); const items = act.items||[]; loginList.innerHTML = items.length ? items.map(i => `<li>${i.device} · ${i.ts}</li>`).join('') : '<li>No activity</li>'; }
    if(logoutAll){ logoutAll.addEventListener('click', () => { saveObj('loginActivity', { items: [] }); renderLogin(); }); }
    if(nForm){ nForm.addEventListener('submit', (ev) => { ev.preventDefault(); const obj = { submissions: document.getElementById('notifSubmissions').checked, messages: document.getElementById('notifMessages').checked, announcements: document.getElementById('notifAnnouncements').checked, reminders: document.getElementById('notifReminders').checked, alerts: document.getElementById('notifAlerts').checked, email: document.getElementById('notifEmail').checked, popups: document.getElementById('notifPopups').checked }; saveObj('lecturerNotificationPrefs', obj); }); }
    if(dForm){ dForm.addEventListener('submit', (ev) => { ev.preventDefault(); const obj = { theme: document.getElementById('dashTheme').value, sidebar: document.getElementById('dashSidebar').value, quick: document.getElementById('dashQuickStats').checked, deadlines: document.getElementById('dashDeadlines').checked, messages: document.getElementById('dashMessages').checked, notifications: document.getElementById('dashNotifications').checked }; saveObj('lecturerDashboardPrefs', obj); }); }
    if(prForm){ prForm.addEventListener('submit', (ev) => { ev.preventDefault(); const obj = { who: document.getElementById('privMessages').value, showEmail: document.getElementById('privShowEmail').checked, showOffice: document.getElementById('privShowOffice').checked }; saveObj('lecturerPrivacyPrefs', obj); }); }
    if(aiForm){ aiForm.addEventListener('submit', (ev) => { ev.preventDefault(); const obj = { tone: document.getElementById('aiTonePref').value, acc: document.getElementById('aiAccuracyPref').value, autoFeedback: document.getElementById('aiAutoFeedback').checked }; saveObj('lecturerAIPrefs', obj); }); }
    if(delBtn){ delBtn.addEventListener('click', () => { const ok = confirm('Are you sure to delete account?'); if(!ok) return; const archive = { profile: loadObj('lecturerProfile'), settings: loadObj('lecturerDashboardPrefs') }; saveObj('archivedLecturerData', archive); localStorage.removeItem('lecturerProfile'); }); }
    renderLogin();
}
function loadAdminUsers(){ try{ const r = localStorage.getItem('adminUsers'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function saveAdminUsers(list){ try{ localStorage.setItem('adminUsers', JSON.stringify(list)) }catch(e){} }
function loadAdminCourses(){ try{ const r = localStorage.getItem('adminCourses'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function saveAdminCourses(list){ try{ localStorage.setItem('adminCourses', JSON.stringify(list)) }catch(e){} }
function pushAdminLog(text){ try{ const r = localStorage.getItem('adminLogs'); const list = r?JSON.parse(r):[]; list.unshift({ ts:new Date().toLocaleString(), text }); localStorage.setItem('adminLogs', JSON.stringify(list)); }catch(e){} }
function loadAdminLogs(){ try{ const r = localStorage.getItem('adminLogs'); return r?JSON.parse(r):[] }catch(e){ return [] } }
function initializeAdminDashboard(){ const root = document.querySelector('.admin-dashboard'); if(!root) return; const sCount = document.getElementById('adminTotalStudents'); const lCount = document.getElementById('adminTotalLecturers'); const cCount = document.getElementById('adminTotalCourses'); const aCount = document.getElementById('adminActiveSessions'); const logs = document.getElementById('adminRecentLogs'); const users = loadAdminUsers(); const courses = loadAdminCourses(); const students = users.filter(u=>u.role==='student').length; const lecturers = users.filter(u=>u.role==='lecturer').length; if(sCount) sCount.textContent = String(students); if(lCount) lCount.textContent = String(lecturers); if(cCount) cCount.textContent = String(courses.length); if(aCount) aCount.textContent = String(Math.max(0, students + lecturers - 1)); if(logs) logs.innerHTML = loadAdminLogs().map(l => `<li>${l.ts} · ${l.text}</li>`).join(''); }
function initializeAdminUsersPage(){ const root = document.querySelector('.page-admin-users'); if(!root) return; const form = document.getElementById('adminAddUserForm'); const table = document.getElementById('adminUsersTable'); const search = document.getElementById('userSearch'); const filter = document.getElementById('userFilter'); function render(){ let list = loadAdminUsers(); const q = (search && search.value||'').toLowerCase(); const f = (filter && filter.value)||'all'; if(q) list = list.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)); if(f!=='all') list = list.filter(u => u.role===f); table.innerHTML = list.map(u => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>Active</td><td><button class="btn" data-edit="${u.id}">Edit</button><button class="btn" data-del="${u.id}">Remove</button></td></tr>`).join(''); table.querySelectorAll('button[data-del]').forEach(b => { b.addEventListener('click', () => { const id = parseInt(b.getAttribute('data-del')); const list = loadAdminUsers().filter(x=>x.id!==id); saveAdminUsers(list); pushAdminLog('Removed user '+id); render(); }); }); } if(form){ form.addEventListener('submit', (ev) => { ev.preventDefault(); const u = { id: Date.now(), name: document.getElementById('userName').value, email: document.getElementById('userEmail').value, role: document.getElementById('userRole').value }; const list = loadAdminUsers(); list.push(u); saveAdminUsers(list); pushAdminLog('Added user '+u.name); render(); }); } if(search) search.addEventListener('input', render); if(filter) filter.addEventListener('change', render); render(); }
function initializeAdminCoursesPage(){ const root = document.querySelector('.page-admin-courses'); if(!root) return; const form = document.getElementById('adminCreateCourseForm'); const table = document.getElementById('adminCoursesTable'); function render(){ const list = loadAdminCourses(); table.innerHTML = list.map(c => `<tr><td>${c.title}</td><td>${c.code}</td><td>${c.lecturer||'-'}</td><td>${c.students||0}</td><td><button class="btn" data-del="${c.id}">Delete</button></td></tr>`).join(''); table.querySelectorAll('button[data-del]').forEach(b => { b.addEventListener('click', () => { const id = parseInt(b.getAttribute('data-del')); const list = loadAdminCourses().filter(x=>x.id!==id); saveAdminCourses(list); pushAdminLog('Deleted course '+id); render(); }); }); } if(form){ form.addEventListener('submit', (ev) => { ev.preventDefault(); const c = { id: Date.now(), title: document.getElementById('courseTitle').value, code: document.getElementById('courseCode').value, dept: document.getElementById('courseDept').value, lecturer: document.getElementById('courseLecturer').value, students: 0 }; const list = loadAdminCourses(); list.push(c); saveAdminCourses(list); pushAdminLog('Created course '+c.title); render(); }); } render(); }
function initializeAdminMonitoringPage(){ const root = document.querySelector('.page-admin-monitoring'); if(!root) return; const sess = document.getElementById('monitorSessions'); const up = document.getElementById('monitorUploads'); const logins = document.getElementById('monitorLogins'); const stor = document.getElementById('monitorStorage'); const health = document.getElementById('monitorHealth'); const errs = document.getElementById('monitorErrors'); const users = loadAdminUsers(); if(sess) sess.innerHTML = users.slice(0,5).map(u => `<li>${u.name} (${u.role})</li>`).join(''); const mats = loadMaterials(); if(up) up.innerHTML = mats.slice(-5).map(m => `<li>${m.title} · ${m.fileName}</li>`).join(''); if(logins) logins.innerHTML = (JSON.parse(localStorage.getItem('loginActivity')||'{}').items||[]).map(i=>`<li>${i.device} · ${i.ts}</li>`).join(''); if(stor) stor.textContent = `${(JSON.stringify(localStorage).length/1024).toFixed(1)} KB used`; if(health) health.textContent = 'OK'; if(errs) errs.innerHTML = '<li>None</li>'; }
function initializeAdminApprovalsPage(){ const root = document.querySelector('.page-admin-approvals'); if(!root) return; const table = document.getElementById('adminApprovalsTable'); const pending = JSON.parse(localStorage.getItem('adminPendingApprovals')||'[]'); table.innerHTML = pending.map(p => `<tr><td>${p.name}</td><td>${p.email}</td><td>${p.role}</td><td>${p.docs||'-'}</td><td><button class="btn" data-ok="${p.id}">Approve</button><button class="btn" data-rej="${p.id}">Reject</button></td></tr>`).join(''); table.querySelectorAll('button[data-ok]').forEach(b => { b.addEventListener('click', ()=>{ const id = parseInt(b.getAttribute('data-ok')); const pendAll = JSON.parse(localStorage.getItem('adminPendingApprovals')||'[]'); const item = pendAll.find(x=>x.id===id); const pend = pendAll.filter(x=>x.id!==id); localStorage.setItem('adminPendingApprovals', JSON.stringify(pend)); const users = JSON.parse(localStorage.getItem('adminUsers')||'[]'); if(item){ users.push({ id: item.id, name: item.name, email: item.email, role: item.role||'lecturer', status: 'active' }); localStorage.setItem('adminUsers', JSON.stringify(users)); }
  try{ const la = JSON.parse(localStorage.getItem('lecturerAuth')||'[]'); const idx = la.findIndex(a => a.email && a.email.toLowerCase()===String(item?.email||'').toLowerCase()); if(idx>-1){ la[idx].status='active'; localStorage.setItem('lecturerAuth', JSON.stringify(la)); } }catch(e){}
  pushAdminLog('Approved account '+id); initializeAdminApprovalsPage(); }); }); table.querySelectorAll('button[data-rej]').forEach(b => { b.addEventListener('click', ()=>{ const id = parseInt(b.getAttribute('data-rej')); const pend = (JSON.parse(localStorage.getItem('adminPendingApprovals')||'[]')).filter(x=>x.id!==id); localStorage.setItem('adminPendingApprovals', JSON.stringify(pend)); pushAdminLog('Rejected account '+id); initializeAdminApprovalsPage(); }); }); }
function initializeAdminContentPage(){ const root = document.querySelector('.page-admin-content'); if(!root) return; const table = document.getElementById('adminContentTable'); const annList = document.getElementById('adminContentAnnouncements'); const forumList = document.getElementById('adminContentForum'); const flagList = document.getElementById('adminContentFlags'); const mats = loadMaterials(); table.innerHTML = mats.map(m => `<tr><td>${m.title}</td><td>${m.fileName||''}</td><td>${m.type}</td><td>${m.courseKey}</td><td>${new Date(m.id).toLocaleString()}</td><td><button class="btn" data-del="${m.id}">Delete</button></td></tr>`).join(''); table.querySelectorAll('button[data-del]').forEach(b => { b.addEventListener('click', () => { const id = parseInt(b.getAttribute('data-del')); const list = loadMaterials().filter(x=>x.id!==id); saveMaterials(list); pushAdminLog('Deleted material '+id); initializeAdminContentPage(); }); }); const anns = loadAnnouncements(); if(annList) annList.innerHTML = anns.map(a=>`<li>${a.date} · ${a.message}</li>`).join(''); if(forumList) forumList.innerHTML = '<li>No forum entries</li>'; if(flagList) flagList.innerHTML = '<li>No flags</li>'; }
function initializeAdminReportsPage(){ const root = document.querySelector('.page-admin-reports'); if(!root) return; const charts = document.getElementById('reportsCharts'); const table = document.getElementById('reportsTable'); function build(){ const perf = Math.round(Math.random()*100); charts.textContent = `Performance index: ${perf}`; const rows = [{metric:'Students', value: (loadAdminUsers().filter(u=>u.role==='student')).length}, {metric:'Lecturers', value:(loadAdminUsers().filter(u=>u.role==='lecturer')).length}, {metric:'Courses', value: loadAdminCourses().length}, {metric:'Uploads', value: loadMaterials().length}]; table.innerHTML = rows.map(r => `<tr><td>${r.metric}</td><td>${r.value}</td></tr>`).join(''); } build(); document.querySelectorAll('#repStudentPerf,#repLecturerActivity,#repCourseCompletion,#repAttendance,#repUploads').forEach(b => { b.addEventListener('click', build); }); }
function initializeAdminAnnouncementsPage(){ const root = document.querySelector('.page-admin-announcements'); if(!root) return; const form = document.getElementById('adminAnnouncementForm'); const listEl = document.getElementById('adminAnnouncementsList'); function render(){ const list = JSON.parse(localStorage.getItem('adminAnnouncementsGlobal')||'[]'); listEl.innerHTML = list.map(a => `<li>${a.date} [${a.category}] · ${a.title}: ${a.message}</li>`).join(''); } if(form){ form.addEventListener('submit', (ev) => { ev.preventDefault(); const title = document.getElementById('adminAnnTitle').value; const message = document.getElementById('adminAnnMessage').value; const category = document.getElementById('adminAnnCategory').value; const sched = document.getElementById('adminAnnSchedule').value; const list = JSON.parse(localStorage.getItem('adminAnnouncementsGlobal')||'[]'); const item = { id: Date.now(), title, message, category, schedule: sched, date: new Date().toLocaleString() }; list.unshift(item); localStorage.setItem('adminAnnouncementsGlobal', JSON.stringify(list)); const studentList = loadAnnouncements(); studentList.unshift({ date: item.date, message: `[${category}] ${title}: ${message}` }); try{ localStorage.setItem('studentAnnouncements', JSON.stringify(studentList)); }catch(e){} pushStudentNotification('admin_announcement', { title }); render(); }); } render(); }
function initializeAdminSettingsPage(){ const root = document.querySelector('.page-admin-settings'); if(!root) return; const appForm = document.getElementById('platformAppearanceForm'); const accForm = document.getElementById('platformAccessForm'); const uplForm = document.getElementById('platformUploadForm'); const emForm = document.getElementById('platformEmailForm'); function saveObj(key,obj){ try{ localStorage.setItem(key, JSON.stringify(obj)) }catch(e){} } if(appForm){ appForm.addEventListener('submit', (ev)=>{ ev.preventDefault(); saveObj('platformAppearance', { theme: document.getElementById('platformTheme').value, font: document.getElementById('platformFont').value }); }); } if(accForm){ accForm.addEventListener('submit', (ev)=>{ ev.preventDefault(); saveObj('platformAccess', { admin: document.getElementById('roleAdmin').checked, lecturer: document.getElementById('roleLecturer').checked, student: document.getElementById('roleStudent').checked }); }); } if(uplForm){ uplForm.addEventListener('submit', (ev)=>{ ev.preventDefault(); saveObj('platformUpload', { limitMB: document.getElementById('uploadLimit').value }); }); document.getElementById('backupBtn').addEventListener('click', ()=>{ pushAdminLog('Backup executed'); alert('Backup completed'); }); document.getElementById('restoreBtn').addEventListener('click', ()=>{ pushAdminLog('Restore executed'); alert('Restore completed'); }); } if(emForm){ emForm.addEventListener('submit', (ev)=>{ ev.preventDefault(); saveObj('platformEmail', { smtp: document.getElementById('smtpServer').value, sender: document.getElementById('senderEmail').value }); }); const testBtn = document.getElementById('sendTestEmail'); if(testBtn){ testBtn.addEventListener('click', ()=>{ alert('Test email sent'); pushAdminLog('Test email sent'); }); } }
}
