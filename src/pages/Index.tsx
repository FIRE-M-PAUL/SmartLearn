import { GraduationCap, BookOpen, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student",
      description: "Access courses, submit assignments, and track your progress",
      icon: GraduationCap,
      path: "/student/login",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Lecturer",
      description: "Create courses, manage materials, and grade student work",
      icon: BookOpen,
      path: "/lecturer/login",
      gradient: "from-secondary to-secondary/80",
    },
    {
      title: "Admin",
      description: "Manage users, courses, and monitor system performance",
      icon: Shield,
      path: "/admin/login",
      gradient: "from-accent to-accent/80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            SmartLearn
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering education through smart technology
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <Card
              key={role.title}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => navigate(role.path)}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                <p className="text-muted-foreground mb-6">{role.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: "600ms" }}>
          <h2 className="text-3xl font-bold mb-8">Why Choose SmartLearn?</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Interactive Learning", desc: "Engage with dynamic content" },
              { title: "Real-time Progress", desc: "Track your achievements" },
              { title: "Collaborative Tools", desc: "Connect with peers" },
              { title: "Secure Platform", desc: "Your data is protected" },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-card border">
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
