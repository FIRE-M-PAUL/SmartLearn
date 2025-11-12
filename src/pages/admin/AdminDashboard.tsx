import { useNavigate } from "react-router-dom";
import { Users, BookOpen, Settings, Bell, User, LogOut, UserPlus, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            SmartLearn Admin
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
          <h2 className="text-3xl font-bold mb-2">System Overview</h2>
          <p className="text-muted-foreground">Manage users, courses, and monitor platform activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-secondary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Lecturers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">45</div>
              <p className="text-xs text-muted-foreground mt-1">+3 new this month</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">89</div>
              <p className="text-xs text-muted-foreground mt-1">+5 new courses</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">267</div>
              <p className="text-xs text-muted-foreground mt-1">Real-time activity</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Add, edit, or remove users from the system</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "John Doe", role: "Student", id: "STU001", status: "Active" },
                    { name: "Dr. Smith", role: "Lecturer", id: "LEC001", status: "Active" },
                    { name: "Jane Wilson", role: "Student", id: "STU002", status: "Pending" },
                  ].map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-semibold">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.role} • {user.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded ${user.status === "Active" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                          {user.status}
                        </span>
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="ghost">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>Create, update, or delete courses</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Create Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Introduction to Programming", code: "CS101", students: 45, lecturer: "Dr. Smith" },
                    { name: "Data Structures", code: "CS201", students: 38, lecturer: "Dr. Johnson" },
                    { name: "Web Development", code: "CS301", students: 52, lecturer: "Dr. Brown" },
                  ].map((course, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{course.name}</h4>
                          <p className="text-sm text-muted-foreground">{course.code} • {course.students} students</p>
                          <p className="text-xs text-muted-foreground mt-1">Instructor: {course.lecturer}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="ghost">Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Review and approve new registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Alice Johnson", role: "Lecturer", department: "Computer Science" },
                    { name: "Bob Smith", role: "Student", course: "Engineering" },
                  ].map((pending, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg bg-accent/5">
                      <div>
                        <p className="font-medium">{pending.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {pending.role} • {pending.department || pending.course}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-primary">Approve</Button>
                        <Button size="sm" variant="outline">Reject</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Activity</CardTitle>
                  <CardDescription>Monitor system usage and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="font-semibold">456</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Files Uploaded Today</span>
                      <span className="font-semibold">89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Assignments Submitted</span>
                      <span className="font-semibold">234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Monitor platform performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Status</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Load</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Storage Used</span>
                      <span className="font-semibold">2.4 GB / 10 GB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure platform-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Send automated emails for updates</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Access Control</p>
                      <p className="text-sm text-muted-foreground">Manage user permissions and roles</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Backup Settings</p>
                      <p className="text-sm text-muted-foreground">Configure automatic backups</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
