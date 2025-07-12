
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Clock, User, Target, Plus, Filter } from "lucide-react";
import { useState } from "react";

const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const tasks = [
    {
      id: 1,
      name: "نصب سیستم سنسور جدید روی خط ۱",
      description: "جایگزینی سنسورهای قدیمی با سیستم مانیتورینگ IoT",
      dueDate: "۱۴۰۳/۱۰/۲۵",
      priority: "بالا",
      status: "در حال انجام",
      assignedTo: ["محمد احمدی", "حسن کریمی"],
      linkedKR: "کاهش زمان توقف خط از ۱۵ دقیقه/روز به ۵ دقیقه/روز",
      checklist: [
        { item: "سفارش سنسورها", completed: true },
        { item: "برنامه‌ریزی زمان توقف", completed: true },
        { item: "نصب سخت‌افزار", completed: false },
        { item: "پیکربندی نرم‌افزار", completed: false },
        { item: "تست سیستم", completed: false }
      ],
      createdBy: "علی محمدی"
    },
    {
      id: 2,
      name: "به‌روزرسانی مستندات رویه‌های ایمنی",
      description: "بازنگری و به‌روزرسانی کلیه اسناد رویه‌های ایمنی",
      dueDate: "۱۴۰۳/۱۰/۳۰",
      priority: "متوسط",
      status: "انجام نشده",
      assignedTo: ["مریم رضایی"],
      linkedKR: "اجرای ۵ نقطه کنترل کیفی جدید",
      checklist: [
        { item: "بررسی رویه‌های فعلی", completed: false },
        { item: "شناسایی کاستی‌ها", completed: false },
        { item: "پیش‌نویس تغییرات", completed: false },
        { item: "تأیید مدیریت", completed: false }
      ],
      createdBy: "لیلا حسینی"
    },
    {
      id: 3,
      name: "کالیبراسیون تجهیزات اندازه‌گیری کیفیت",
      description: "کالیبراسیون ماهانه کلیه تجهیزات تست کیفیت",
      dueDate: "۱۴۰۳/۱۰/۲۲",
      priority: "بالا",
      status: "تکمیل",
      assignedTo: ["مریم رضایی"],
      linkedKR: "کاهش نرخ نقص به کمتر از ۲٪",
      checklist: [
        { item: "تست ترازوهای دقیق", completed: true },
        { item: "کالیبراسیون ضخامت‌سنج", completed: true },
        { item: "به‌روزرسانی لاگ کالیبراسیون", completed: true },
        { item: "تولید گزارش", completed: true }
      ],
      createdBy: "لیلا حسینی"
    }
  ];

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === "all") return true;
    if (activeFilter === "todo") return task.status === "انجام نشده";
    if (activeFilter === "progress") return task.status === "در حال انجام";
    if (activeFilter === "completed") return task.status === "تکمیل";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "انجام نشده": return "secondary";
      case "در حال انجام": return "default";
      case "تکمیل": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "بالا": return "destructive";
      case "متوسط": return "default";
      case "پایین": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">مدیریت وظایف</h1>
            <p className="text-muted-foreground">مدیریت پروژه‌های ویژه و ابتکارات استراتژیک</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            وظیفه جدید
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg space-x-reverse">
            <Button
              variant={activeFilter === "all" ? "default" : "ghost"}
              onClick={() => setActiveFilter("all")}
              size="sm"
            >
              همه وظایف
            </Button>
            <Button
              variant={activeFilter === "todo" ? "default" : "ghost"}
              onClick={() => setActiveFilter("todo")}
              size="sm"
            >
              انجام نشده
            </Button>
            <Button
              variant={activeFilter === "progress" ? "default" : "ghost"}
              onClick={() => setActiveFilter("progress")}
              size="sm"
            >
              در حال انجام
            </Button>
            <Button
              variant={activeFilter === "completed" ? "default" : "ghost"}
              onClick={() => setActiveFilter("completed")}
              size="sm"
            >
              تکمیل
            </Button>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            فیلتر
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">کل وظایف</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <p className="text-xs text-muted-foreground">پروژه‌های فعال</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">در حال انجام</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.filter(t => t.status === "در حال انجام").length}
              </div>
              <p className="text-xs text-muted-foreground">کار فعال</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">اولویت بالا</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.filter(t => t.priority === "بالا").length}
              </div>
              <p className="text-xs text-muted-foreground">وظایف فوری</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">اعضای تیم</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">۵</div>
              <p className="text-xs text-muted-foreground">کاربران تخصیص‌یافته</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">فهرست وظایف</h2>
            {filteredTasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{task.name}</CardTitle>
                      <CardDescription>{task.description}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant={getStatusColor(task.status) as any}>
                        {task.status}
                      </Badge>
                      <Badge variant={getPriorityColor(task.priority) as any}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">مهلت:</span>
                      <p className="font-medium">{task.dueDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ایجاد شده توسط:</span>
                      <p className="font-medium">{task.createdBy}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground text-sm">تخصیص به:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {task.assignedTo.map((person, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {person}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">مرتبط با هدف:</span>
                    <p className="text-sm mt-1">{task.linkedKR}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-muted-foreground">چک‌لیست پیشرفت:</span>
                    <div className="mt-2 space-y-2">
                      {task.checklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox 
                            checked={item.completed} 
                            disabled 
                            className="w-4 h-4"
                          />
                          <span className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {item.item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">مشاهده جزئیات</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ایجاد وظیفه جدید</CardTitle>
              <CardDescription>افزودن وظیفه پروژه‌ای جدید مرتبط با اهداف استراتژیک</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="taskName">نام وظیفه</Label>
                <Input id="taskName" placeholder="مثلاً اجرای فرآیند کیفی جدید" />
              </div>
              
              <div>
                <Label htmlFor="description">توضیحات</Label>
                <Textarea 
                  id="description" 
                  placeholder="توضیح تفصیلی وظیفه..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">مهلت</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="priority">اولویت</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب اولویت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">بالا</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="low">پایین</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="linkedKR">نتیجه کلیدی مرتبط *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب نتیجه کلیدی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtime">کاهش زمان توقف خط از ۱۵ دقیقه/روز به ۵ دقیقه/روز</SelectItem>
                    <SelectItem value="waste">کاهش ضایعات مواد خام به میزان ۳٪</SelectItem>
                    <SelectItem value="output">افزایش تولید به میزان ۱۵٪</SelectItem>
                    <SelectItem value="defects">کاهش نرخ نقص به کمتر از ۲٪</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="assignTo">تخصیص به</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب عضو تیم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mohammad">محمد احمدی</SelectItem>
                    <SelectItem value="maryam">مریم رضایی</SelectItem>
                    <SelectItem value="hassan">حسن کریمی</SelectItem>
                    <SelectItem value="sara">سارا محمدی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">ایجاد وظیفه</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
