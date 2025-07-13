import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Building, UserCheck, Settings } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Organization = () => {
  const [activeTab, setActiveTab] = useState("positions");
  const { toast } = useToast();
  
  // Dialog states
  const [isPositionDialogOpen, setIsPositionDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  
  // Form states
  const [newPositionForm, setNewPositionForm] = useState({
    name: "",
    department: "",
    reportsTo: ""
  });
  
  const [newTaskForm, setNewTaskForm] = useState({
    name: "",
    position: "",
    period: "",
    description: ""
  });

  const [positions, setPositions] = useState([
    {
      id: 1,
      name: "سرپرست خط تولید",
      department: "تولید",
      assignedEmployee: "محمد احمدی",
      routineTasks: 4,
      parentPosition: "مدیر تولید"
    },
    {
      id: 2,
      name: "بازرس کنترل کیفیت",
      department: "کیفیت",
      assignedEmployee: "مریم رضایی",
      routineTasks: 3,
      parentPosition: "مدیر کیفیت"
    },
    {
      id: 3,
      name: "مدیر تولید",
      department: "تولید",
      assignedEmployee: "علی محمدی",
      routineTasks: 2,
      parentPosition: "مدیر کارخانه"
    },
    {
      id: 4,
      name: "تکنسین تعمیرات",
      department: "تعمیرات",
      assignedEmployee: "حسن کریمی",
      routineTasks: 5,
      parentPosition: "سرپرست تعمیرات"
    }
  ]);

  const [routineTasks, setRoutineTasks] = useState([
    {
      id: 1,
      name: "بررسی ایمنی روزانه تجهیزات",
      position: "سرپرست خط تولید",
      period: "روزانه",
      checklist: ["بررسی کلیدهای اضطراری", "تأیید محافظ‌های ایمنی", "تست چراغ‌های هشدار"],
      description: "بازرسی جامع ایمنی تجهیزات تولید"
    },
    {
      id: 2,
      name: "بازرسی کنترل کیفیت",
      position: "بازرس کنترل کیفیت",
      period: "روزانه",
      checklist: ["نمونه‌گیری کیفیت محصول", "بررسی ابعاد", "ثبت نتایج"],
      description: "روش‌های نمونه‌گیری تصادفی و آزمایش کیفیت"
    },
    {
      id: 3,
      name: "گزارش تولید هفتگی",
      position: "مدیر تولید",
      period: "هفتگی",
      checklist: ["جمع‌آوری معیارها", "تحلیل روندها", "ارسال گزارش"],
      description: "تحلیل عملکرد تولید هفتگی و گزارش‌دهی"
    }
  ]);

  // Handler functions
  const handleCreatePosition = () => {
    if (!newPositionForm.name || !newPositionForm.department) {
      toast({
        title: "خطا",
        description: "لطفا تمام فیلدهای الزامی را پر کنید",
        variant: "destructive"
      });
      return;
    }

    const newPosition = {
      id: positions.length + 1,
      name: newPositionForm.name,
      department: newPositionForm.department,
      assignedEmployee: "تخصیص نیافته",
      routineTasks: 0,
      parentPosition: newPositionForm.reportsTo || "بدون گزارش‌دهی"
    };

    setPositions([...positions, newPosition]);
    setNewPositionForm({ name: "", department: "", reportsTo: "" });
    setIsPositionDialogOpen(false);
    
    toast({
      title: "موفقیت",
      description: "پست جدید با موفقیت ایجاد شد",
    });
  };

  const handleCreateTask = () => {
    if (!newTaskForm.name || !newTaskForm.position || !newTaskForm.period) {
      toast({
        title: "خطا",
        description: "لطفا تمام فیلدهای الزامی را پر کنید",
        variant: "destructive"
      });
      return;
    }

    const newTask = {
      id: routineTasks.length + 1,
      name: newTaskForm.name,
      position: newTaskForm.position,
      period: newTaskForm.period,
      description: newTaskForm.description,
      checklist: ["مرحله اول", "مرحله دوم"]
    };

    setRoutineTasks([...routineTasks, newTask]);
    setNewTaskForm({ name: "", position: "", period: "", description: "" });
    setIsTaskDialogOpen(false);
    
    toast({
      title: "موفقیت",
      description: "وظیفه روتین جدید با موفقیت ایجاد شد",
    });
  };

  const handleEditPosition = (positionId: number) => {
    toast({
      title: "ویرایش پست",
      description: `در حال ویرایش پست شماره ${positionId}`,
    });
  };

  const handleEditTask = (taskId: number) => {
    toast({
      title: "ویرایش وظیفه",
      description: `در حال ویرایش وظیفه شماره ${taskId}`,
    });
  };

  const handleAddNew = () => {
    if (activeTab === "positions") {
      setIsPositionDialogOpen(true);
    } else if (activeTab === "tasks") {
      setIsTaskDialogOpen(true);
    } else {
      toast({
        title: "افزودن جدید",
        description: "برای افزودن موارد جدید از تب‌های مربوطه استفاده کنید",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">منابع انسانی و سازمان</h1>
            <p className="text-muted-foreground">مدیریت ساختار سازمانی و وظایف روتین</p>
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            افزودن جدید
          </Button>
        </div>

        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit space-x-reverse">
          <Button
            variant={activeTab === "positions" ? "default" : "ghost"}
            onClick={() => setActiveTab("positions")}
            className="flex items-center gap-2"
          >
            <Building className="h-4 w-4" />
            پست‌های سازمانی
          </Button>
          <Button
            variant={activeTab === "tasks" ? "default" : "ghost"}
            onClick={() => setActiveTab("tasks")}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            وظایف روتین
          </Button>
          <Button
            variant={activeTab === "chart" ? "default" : "ghost"}
            onClick={() => setActiveTab("chart")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            چارت سازمانی
          </Button>
        </div>

        {activeTab === "positions" && (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>پست‌های شغلی</CardTitle>
                <CardDescription>مدیریت پست‌های سازمانی و تخصیص‌ها</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {positions.map((position) => (
                  <div key={position.id} className="p-4 rounded-lg border space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{position.name}</h3>
                      <Badge variant="outline">{position.department}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">تخصیص داده شده به:</span>
                        <p className="font-medium">{position.assignedEmployee}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">گزارش به:</span>
                        <p className="font-medium">{position.parentPosition}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {position.routineTasks} وظیفه روتین تخصیص یافته
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditPosition(position.id)}
                      >
                        ویرایش
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>وظایف روتین</CardTitle>
                <CardDescription>وظایف خودکار تخصیص یافته بر اساس پست‌های شغلی</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {routineTasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-lg border space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{task.name}</h3>
                      <Badge variant="secondary">{task.period}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">تخصیص به:</span>
                      <p className="text-sm">{task.position}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">چک‌لیست:</span>
                      <ul className="text-sm list-disc list-inside mr-2 space-y-1">
                        {task.checklist.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditTask(task.id)}
                    >
                      ویرایش وظیفه
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "chart" && (
          <Card>
            <CardHeader>
              <CardTitle>چارت سازمانی</CardTitle>
              <CardDescription>نمای بصری روابط گزارش‌دهی</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6 p-6">
                <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20">
                  <div className="text-center">
                    <h3 className="font-semibold">مدیر کارخانه</h3>
                    <p className="text-sm text-muted-foreground">سارا محمدی</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg border">
                    <div className="text-center">
                      <h4 className="font-semibold">مدیر تولید</h4>
                      <p className="text-sm text-muted-foreground">علی محمدی</p>
                      <Badge variant="outline" className="mt-2">تولید</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg border">
                    <div className="text-center">
                      <h4 className="font-semibold">مدیر کیفیت</h4>
                      <p className="text-sm text-muted-foreground">لیلا حسینی</p>
                      <Badge variant="outline" className="mt-2">کیفیت</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg border">
                    <div className="text-center">
                      <h4 className="font-semibold">سرپرست تعمیرات</h4>
                      <p className="text-sm text-muted-foreground">رضا کریمی</p>
                      <Badge variant="outline" className="mt-2">تعمیرات</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-3 rounded-lg border">
                    <div className="text-center">
                      <h5 className="font-medium">سرپرست خط تولید</h5>
                      <p className="text-sm text-muted-foreground">محمد احمدی</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg border">
                    <div className="text-center">
                      <h5 className="font-medium">بازرس کنترل کیفیت</h5>
                      <p className="text-sm text-muted-foreground">مریم رضایی</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Position Creation Dialog */}
        <Dialog open={isPositionDialogOpen} onOpenChange={setIsPositionDialogOpen}>
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>ایجاد پست جدید</DialogTitle>
              <DialogDescription>
                افزودن پست شغلی جدید به سازمان
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="positionName">نام پست</Label>
                <Input 
                  id="positionName" 
                  placeholder="مثلاً تحلیلگر ارشد کیفیت"
                  value={newPositionForm.name}
                  onChange={(e) => setNewPositionForm({...newPositionForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="department">بخش</Label>
                <Select value={newPositionForm.department} onValueChange={(value) => setNewPositionForm({...newPositionForm, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب بخش" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تولید">تولید</SelectItem>
                    <SelectItem value="کیفیت">کیفیت</SelectItem>
                    <SelectItem value="تعمیرات">تعمیرات</SelectItem>
                    <SelectItem value="اداری">اداری</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reportsTo">گزارش به</Label>
                <Select value={newPositionForm.reportsTo} onValueChange={(value) => setNewPositionForm({...newPositionForm, reportsTo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب پست والد" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مدیر تولید">مدیر تولید</SelectItem>
                    <SelectItem value="مدیر کیفیت">مدیر کیفیت</SelectItem>
                    <SelectItem value="مدیر کارخانه">مدیر کارخانه</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreatePosition} className="w-full">ایجاد پست</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Task Creation Dialog */}
        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>ایجاد وظیفه روتین</DialogTitle>
              <DialogDescription>
                تعریف وظیفه روتین جدید برای یک پست شغلی
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="taskName">نام وظیفه</Label>
                <Input 
                  id="taskName" 
                  placeholder="مثلاً بررسی کالیبراسیون روزانه"
                  value={newTaskForm.name}
                  onChange={(e) => setNewTaskForm({...newTaskForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="position">تخصیص به پست</Label>
                <Select value={newTaskForm.position} onValueChange={(value) => setNewTaskForm({...newTaskForm, position: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب پست" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position.id} value={position.name}>
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="period">دوره تکرار</Label>
                <Select value={newTaskForm.period} onValueChange={(value) => setNewTaskForm({...newTaskForm, period: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دوره" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="روزانه">روزانه</SelectItem>
                    <SelectItem value="هفتگی">هفتگی</SelectItem>
                    <SelectItem value="ماهانه">ماهانه</SelectItem>
                    <SelectItem value="فصلی">فصلی</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">توضیحات</Label>
                <Textarea 
                  id="description" 
                  placeholder="دستورالعمل دقیق وظیفه..."
                  value={newTaskForm.description}
                  onChange={(e) => setNewTaskForm({...newTaskForm, description: e.target.value})}
                />
              </div>
              <Button onClick={handleCreateTask} className="w-full">ایجاد وظیفه</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Organization;
