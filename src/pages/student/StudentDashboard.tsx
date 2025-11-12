import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, FileText, MessageSquare, Bell, User, LogOut, Upload, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const courses = [
    { id: 1, name: "Introduction to Programming", code: "CS101", progress: 75 },
    { id: 2, name: "Data Structures", code: "CS201", progress: 60 },
    { id: 3, name: "Web Development", code: "CS301", progress: 90 },
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/student/profile")}>
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
          <h2 className="text-3xl font-bold mb-2">Welcome back, Student!</h2>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Continue Learning
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
                <CardTitle>Learning Materials</CardTitle>
                <CardDescription>Access course notes, videos, and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Lecture Notes - Week {item}</p>
                          <p className="text-sm text-muted-foreground">CS101</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Download</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>Submit your work and track deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <div key={item} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Assignment {item}</h4>
                          <p className="text-sm text-muted-foreground">Due in 3 days</p>
                        </div>
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Pending</span>
                      </div>
                      <Button size="sm" className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Assignment
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Grades</CardTitle>
                <CardDescription>View your performance across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">A-</p>
                        <p className="text-xs text-muted-foreground">85%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forum" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Discussion Forum</CardTitle>
                <CardDescription>Connect with lecturers and peers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <MessageSquare className="h-5 w-5 text-primary mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium">Discussion Topic {item}</h4>
                        <p className="text-sm text-muted-foreground">Latest reply 2 hours ago</p>
                      </div>
                      <Button size="sm" variant="ghost">View</Button>
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

export default StudentDashboard;
