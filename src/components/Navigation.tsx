
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Building, 
  Target, 
  CheckSquare, 
  BarChart3, 
  Menu,
  X
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "داشبورد", icon: Home },
    { path: "/organization", label: "سازمان", icon: Building },
    { path: "/strategic", label: "برنامه‌ریزی استراتژیک", icon: Target },
    { path: "/tasks", label: "مدیریت وظایف", icon: CheckSquare },
    { path: "/manager", label: "نمای مدیر", icon: BarChart3 }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation sidebar */}
      <nav className={`
        fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-40 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `} dir="rtl">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">ورک‌الاین</h1>
              <p className="text-xs text-muted-foreground">سیستم مدیریت عملکرد</p>
            </div>
          </div>

          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">م.ا</span>
              </div>
              <div>
                <p className="text-sm font-medium">محمد احمدی</p>
                <p className="text-xs text-muted-foreground">سرپرست خط تولید</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              آنلاین
            </Badge>
          </div>
        </div>
      </nav>

      {/* Main content spacer for desktop */}
      <div className="hidden lg:block lg:w-64 flex-shrink-0" />
    </>
  );
};

export default Navigation;
