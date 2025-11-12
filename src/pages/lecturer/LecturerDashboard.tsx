import { useNavigate } from "react-router-dom";
import { Upload, Users, FileText, Bell, User, LogOut, CheckSquare, BarChart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const LecturerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const courses = [
    { id: 1, name: "Introduction to Programming", students: 45 },
    { id: 2, name: "Data Structures", students: 38 },
    { id: 3, name: "Web Development", students: 52 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            SmartLearn
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, Lecturer!</h2>
          <p className="text-muted-foreground">Manage your courses and students</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">135</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">82%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="grading">Grading</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                Create New Course
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.students} students enrolled</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Course
                      </Button>
                      <Button className="w-full" variant="outline">
                        <BarChart className="mr-2 h-4 w-4" />
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Materials</CardTitle>
                    <CardDescription>Upload and manage learning resources</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Material
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Lecture Notes - Week {item}</p>
                          <p className="text-sm text-muted-foreground">Uploaded 2 days ago</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">Edit</Button>
                        <Button size="sm" variant="ghost">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Assignments</CardTitle>
                    <CardDescription>Create and manage student assignments</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    Create Assignment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <div key={item} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Assignment {item}</h4>
                          <p className="text-sm text-muted-foreground">Due in 5 days • 45 submissions</p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Active</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Submissions</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grading" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Grading</CardTitle>
                <CardDescription>Review and grade student submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Assignment {item} - Student {item}</p>
                        <p className="text-sm text-muted-foreground">Submitted 1 day ago</p>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow">
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Grade Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Track student progress and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-semibold">
                          S{item}
                        </div>
                        <div>
                          <p className="font-medium">Student Name {item}</p>
                          <p className="text-sm text-muted-foreground">ID: STU000{item}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">85%</p>
                        <p className="text-xs text-muted-foreground">Overall</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LecturerDashboard;
