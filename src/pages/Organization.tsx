import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Building, UserCheck, Settings, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { OrganizationalChart } from "@/components/OrganizationalChart";

const Organization = () => {
  const [activeTab, setActiveTab] = useState("positions");
  const { toast } = useToast();
  
  // Dialog states
  const [isPositionDialogOpen, setIsPositionDialogOpen] = useState(false);
  const [isPersonnelDialogOpen, setIsPersonnelDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  
  // Form states
  const [newPositionForm, setNewPositionForm] = useState({
    name: "",
    department: "",
    reportsTo: ""
  });

  const [newPersonnelForm, setNewPersonnelForm] = useState({
    name: "",
    positionId: "",
    email: "",
    phone: ""
  });
  
  const [newTaskForm, setNewTaskForm] = useState({
    name: "",
    position: "",
    period: "",
    description: ""
  });

  // Separate data structures
  const [positions, setPositions] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [routineTasks, setRoutineTasks] = useState([]);

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
      id: Date.now(),
      name: newPositionForm.name,
      department: newPositionForm.department,
      parentPosition: newPositionForm.reportsTo || null
    };

    setPositions([...positions, newPosition]);
    setNewPositionForm({ name: "", department: "", reportsTo: "" });
    setIsPositionDialogOpen(false);
    
    toast({
      title: "موفقیت",
      description: "پست جدید با موفقیت ایجاد شد",
    });
  };

  const handleCreatePersonnel = () => {
    if (!newPersonnelForm.name || !newPersonnelForm.positionId) {
      toast({
        title: "خطا",
        description: "لطفا نام و پست را انتخاب کنید",
        variant: "destructive"
      });
      return;
    }

    const newPerson = {
      id: Date.now(),
      name: newPersonnelForm.name,
      positionId: parseInt(newPersonnelForm.positionId),
      email: newPersonnelForm.email,
      phone: newPersonnelForm.phone
    };

    setPersonnel([...personnel, newPerson]);
    setNewPersonnelForm({ name: "", positionId: "", email: "", phone: "" });
    setIsPersonnelDialogOpen(false);
    
    toast({
      title: "موفقیت",
      description: "پرسنل جدید با موفقیت اضافه شد",
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
    } else if (activeTab === "personnel") {
      setIsPersonnelDialogOpen(true);
    } else if (activeTab === "tasks") {
      setIsTaskDialogOpen(true);
    } else {
      toast({
        title: "افزودن جدید",
        description: "برای افزودن موارد جدید از تب‌های مربوطه استفاده کنید",
      });
    }
  };

  // Helper function to get personnel assigned to a position
  const getPersonnelForPosition = (positionId) => {
    return personnel.filter(p => p.positionId === positionId);
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
            variant={activeTab === "personnel" ? "default" : "ghost"}
            onClick={() => setActiveTab("personnel")}
            className="flex items-center gap-2"
          >
            <UserCheck className="h-4 w-4" />
            پرسنل
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                پست‌های شغلی
              </CardTitle>
              <CardDescription>مدیریت پست‌های سازمانی و تخصیص کارکنان</CardDescription>
            </CardHeader>
            <CardContent>
              {positions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>هنوز هیچ پست سازمانی تعریف نشده است</p>
                  <p className="text-sm">برای شروع، پست جدید اضافه کنید</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">نام پست</TableHead>
                      <TableHead className="text-right">بخش</TableHead>
                      <TableHead className="text-right">مسئول</TableHead>
                      <TableHead className="text-right">گزارش به</TableHead>
                      <TableHead className="text-right">وظایف</TableHead>
                      <TableHead className="text-right">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions.map((position) => (
                      <TableRow key={position.id}>
                        <TableCell className="font-medium">{position.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{position.department}</Badge>
                        </TableCell>
                         <TableCell>
                           <div className="flex items-center gap-2">
                             <UserCheck className="h-4 w-4 text-muted-foreground" />
                             {getPersonnelForPosition(position.id).length > 0 
                               ? getPersonnelForPosition(position.id).map(p => p.name).join(', ')
                               : 'تخصیص نیافته'
                             }
                           </div>
                         </TableCell>
                         <TableCell className="text-sm text-muted-foreground">
                           {position.parentPosition || 'بدون گزارش‌دهی'}
                         </TableCell>
                         <TableCell>
                           <Badge variant="secondary">
                             {routineTasks.filter(t => t.position === position.name).length} وظیفه
                           </Badge>
                         </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditPosition(position.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setPositions(positions.filter(p => p.id !== position.id));
                                toast({
                                  title: "حذف پست",
                                  description: `پست ${position.name} حذف شد`,
                                  variant: "destructive"
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "tasks" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                وظایف روتین
              </CardTitle>
              <CardDescription>مدیریت وظایف خودکار بر اساس پست‌های شغلی</CardDescription>
            </CardHeader>
            <CardContent>
              {routineTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>هنوز هیچ وظیفه روتین تعریف نشده است</p>
                  <p className="text-sm">برای شروع، وظیفه جدید اضافه کنید</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">نام وظیفه</TableHead>
                      <TableHead className="text-right">پست مسئول</TableHead>
                      <TableHead className="text-right">دوره تکرار</TableHead>
                      <TableHead className="text-right">توضیحات</TableHead>
                      <TableHead className="text-right">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routineTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{task.position}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{task.period}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                          {task.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditTask(task.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setRoutineTasks(routineTasks.filter(t => t.id !== task.id));
                                toast({
                                  title: "حذف وظیفه",
                                  description: `وظیفه ${task.name} حذف شد`,
                                  variant: "destructive"
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "personnel" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                پرسنل
              </CardTitle>
              <CardDescription>مدیریت کارکنان و تخصیص آن‌ها به پست‌های سازمانی</CardDescription>
            </CardHeader>
            <CardContent>
              {personnel.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>هنوز هیچ پرسنلی اضافه نشده است</p>
                  <p className="text-sm">برای شروع، پرسنل جدید اضافه کنید</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">نام</TableHead>
                      <TableHead className="text-right">پست</TableHead>
                      <TableHead className="text-right">ایمیل</TableHead>
                      <TableHead className="text-right">تلفن</TableHead>
                      <TableHead className="text-right">عملیات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personnel.map((person) => {
                      const position = positions.find(p => p.id === person.positionId);
                      return (
                        <TableRow key={person.id}>
                          <TableCell className="font-medium">{person.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {position ? position.name : 'پست نامشخص'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {person.email || '-'}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {person.phone || '-'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setPersonnel(personnel.filter(p => p.id !== person.id));
                                  toast({
                                    title: "حذف پرسنل",
                                    description: `${person.name} حذف شد`,
                                    variant: "destructive"
                                  });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === "chart" && (
          <Card>
            <CardHeader>
              <CardTitle>چارت سازمانی داینامیک</CardTitle>
              <CardDescription>مدیریت تعاملی ساختار سازمانی با قابلیت اضافه کردن و وصل کردن پست‌ها</CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationalChart 
                positions={positions} 
                onPositionsUpdate={setPositions}
              />
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

        {/* Personnel Creation Dialog */}
        <Dialog open={isPersonnelDialogOpen} onOpenChange={setIsPersonnelDialogOpen}>
          <DialogContent className="sm:max-w-[425px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>اضافه کردن پرسنل</DialogTitle>
              <DialogDescription>
                افزودن کارمند جدید و تخصیص به پست
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="personnelName">نام کارمند</Label>
                <Input 
                  id="personnelName" 
                  placeholder="نام و نام خانوادگی"
                  value={newPersonnelForm.name}
                  onChange={(e) => setNewPersonnelForm({...newPersonnelForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="assignPosition">انتخاب پست</Label>
                <Select value={newPersonnelForm.positionId} onValueChange={(value) => setNewPersonnelForm({...newPersonnelForm, positionId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب پست" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position.id} value={position.id.toString()}>
                        {position.name} - {position.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email">ایمیل</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="email@example.com"
                  value={newPersonnelForm.email}
                  onChange={(e) => setNewPersonnelForm({...newPersonnelForm, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">تلفن</Label>
                <Input 
                  id="phone" 
                  placeholder="شماره تلفن"
                  value={newPersonnelForm.phone}
                  onChange={(e) => setNewPersonnelForm({...newPersonnelForm, phone: e.target.value})}
                />
              </div>
              <Button onClick={handleCreatePersonnel} className="w-full">اضافه کردن پرسنل</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Organization;
