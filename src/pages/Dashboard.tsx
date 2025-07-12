
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target, Users, TrendingUp, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const routineTasks = [
    { id: 1, name: "بررسی ایمنی روزانه تجهیزات", completed: true, position: "سرپرست خط تولید" },
    { id: 2, name: "بازرسی کنترل کیفیت", completed: false, position: "بازرس کنترل کیفیت" },
    { id: 3, name: "جلسه صبحگاهی تیم", completed: true, position: "سرپرست خط تولید" },
    { id: 4, name: "بررسی سطح موجودی", completed: false, position: "سرپرست خط تولید" }
  ];

  const specialTasks = [
    { 
      id: 1, 
      name: "نصب سیستم سنسور جدید روی خط ۱", 
      dueDate: "۱۴۰۳/۱۰/۲۵", 
      status: "در حال انجام",
      linkedKR: "کاهش زمان توقف خط از ۱۵ دقیقه/روز به ۵ دقیقه/روز"
    },
    { 
      id: 2, 
      name: "به‌روزرسانی مستندات رویه‌های ایمنی", 
      dueDate: "۱۴۰۳/۱۰/۳۰", 
      status: "انجام نشده",
      linkedKR: "بهبود کارایی خط تولید ۱"
    }
  ];

  const objectives = [
    {
      id: 1,
      title: "بهبود کارایی خط تولید ۱",
      progress: 65,
      keyResults: [
        { name: "کاهش زمان توقف خط", target: "۵ دقیقه/روز", current: "۸ دقیقه/روز", progress: 70 },
        { name: "کاهش ضایعات مواد", target: "۳٪", current: "۱.۸٪", progress: 60 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">داشبورد کارمند</h1>
            <p className="text-muted-foreground">صبح بخیر! در ادامه کارهایی که نیاز به توجه شما دارند.</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            سرپرست خط تولید
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">وظایف امروز</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۲/۴</div>
              <p className="text-xs text-muted-foreground">تکمیل شده</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">وظایف ویژه</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۲</div>
              <p className="text-xs text-muted-foreground">در حال انجام</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">اهداف تیم</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۶۵٪</div>
              <p className="text-xs text-muted-foreground">پیشرفت</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">بهره‌وری</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+۱۲٪</div>
              <p className="text-xs text-muted-foreground">این هفته</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                وظایف روتین من
              </CardTitle>
              <CardDescription>مسئولیت‌های روزانه مربوط به پست شما</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {routineTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-primary border-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {task.completed && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <div>
                      <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.name}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    روزانه
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                وظایف ویژه من
              </CardTitle>
              <CardDescription>وظایف پروژه‌ای تخصیص یافته به شما</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {specialTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{task.name}</h4>
                    <Badge variant={task.status === "در حال انجام" ? "default" : "secondary"}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">مهلت: {task.dueDate}</p>
                  <div className="bg-muted/50 p-2 rounded text-xs">
                    <strong>هدف مرتبط:</strong> {task.linkedKR}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              اهداف و تأثیر من
            </CardTitle>
            <CardDescription>نحوه مشارکت کار شما در اهداف شرکت</CardDescription>
          </CardHeader>
          <CardContent>
            {objectives.map((objective) => (
              <div key={objective.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{objective.title}</h3>
                  <Badge variant="outline">{objective.progress}٪ تکمیل</Badge>
                </div>
                <Progress value={objective.progress} className="h-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {objective.keyResults.map((kr, index) => (
                    <div key={index} className="p-3 rounded-lg border space-y-2">
                      <h4 className="font-medium text-sm">{kr.name}</h4>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>وضعیت فعلی: {kr.current}</span>
                        <span>هدف: {kr.target}</span>
                      </div>
                      <Progress value={kr.progress} className="h-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
