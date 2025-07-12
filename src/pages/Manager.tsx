
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, AlertTriangle, CheckCircle, Clock, Target, BarChart3 } from "lucide-react";
import { useState } from "react";

const Manager = () => {
  const [selectedTeamMember, setSelectedTeamMember] = useState("all");

  const teamMembers = [
    {
      id: 1,
      name: "محمد احمدی",
      position: "سرپرست خط تولید",
      routineTasksCompleted: 3,
      routineTasksTotal: 4,
      specialTasks: 2,
      overdueTasks: 0,
      productivity: 92
    },
    {
      id: 2,
      name: "مریم رضایی",
      position: "بازرس کنترل کیفیت",
      routineTasksCompleted: 4,
      routineTasksTotal: 4,
      specialTasks: 1,
      overdueTasks: 0,
      productivity: 98
    },
    {
      id: 3,
      name: "حسن کریمی",
      position: "تکنسین تعمیرات",
      routineTasksCompleted: 2,
      routineTasksTotal: 5,
      specialTasks: 1,
      overdueTasks: 1,
      productivity: 75
    },
    {
      id: 4,
      name: "سارا محمدی",
      position: "اپراتور تولید",
      routineTasksCompleted: 5,
      routineTasksTotal: 5,
      specialTasks: 0,
      overdueTasks: 0,
      productivity: 95
    }
  ];

  const objectives = [
    {
      id: 1,
      title: "بهبود کارایی خط تولید ۱",
      progress: 65,
      teamContribution: [
        { member: "محمد احمدی", contribution: 40 },
        { member: "حسن کریمی", contribution: 25 },
        { member: "مریم رضایی", contribution: 20 }
      ]
    },
    {
      id: 2,
      title: "ارتقای استانداردهای کنترل کیفیت",
      progress: 45,
      teamContribution: [
        { member: "مریم رضایی", contribution: 60 },
        { member: "محمد احمدی", contribution: 25 }
      ]
    }
  ];

  const recentActivity = [
    { user: "محمد احمدی", action: "بررسی ایمنی روزانه تجهیزات را تکمیل کرد", time: "۲ ساعت پیش" },
    { user: "مریم رضایی", action: "گزارش بازرسی کنترل کیفیت را به‌روزرسانی کرد", time: "۳ ساعت پیش" },
    { user: "حسن کریمی", action: "نصب سیستم سنسور جدید روی خط ۱ را شروع کرد", time: "۱ روز پیش" },
    { user: "سارا محمدی", action: "تمام وظایف روتین را تکمیل کرد", time: "۱ روز پیش" }
  ];

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">داشبورد مدیر</h1>
            <p className="text-muted-foreground">نمای کلی تیم و مدیریت عملکرد</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="انتخاب عضو تیم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه اعضای تیم</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">اعضای تیم</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <p className="text-xs text-muted-foreground">گزارش مستقیم</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">میانگین بهره‌وری</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(teamMembers.reduce((sum, member) => sum + member.productivity, 0) / teamMembers.length)}٪
              </div>
              <p className="text-xs text-muted-foreground">این هفته</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">وظایف عقب‌افتاده</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamMembers.reduce((sum, member) => sum + member.overdueTasks, 0)}
              </div>
              <p className="text-xs text-muted-foreground">نیاز به توجه</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">اهداف تیم</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(objectives.reduce((sum, obj) => sum + obj.progress, 0) / objectives.length)}٪
              </div>
              <p className="text-xs text-muted-foreground">میانگین پیشرفت</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                عملکرد تیم
              </CardTitle>
              <CardDescription>تکمیل وظایف فردی اعضای تیم و بهره‌وری</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-4 rounded-lg border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold">{member.productivity}٪</div>
                      <p className="text-xs text-muted-foreground">بهره‌وری</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">
                        {member.routineTasksCompleted}/{member.routineTasksTotal}
                      </div>
                      <p className="text-muted-foreground">روتین</p>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{member.specialTasks}</div>
                      <p className="text-muted-foreground">ویژه</p>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${member.overdueTasks > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {member.overdueTasks}
                      </div>
                      <p className="text-muted-foreground">عقب‌افتاده</p>
                    </div>
                  </div>

                  <Progress value={member.productivity} className="h-2" />
                  
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">مشاهده جزئیات</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                پیشرفت اهداف تیم
              </CardTitle>
              <CardDescription>پیشرفت اهداف استراتژیک و مشارکت تیم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {objectives.map((objective) => (
                <div key={objective.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{objective.title}</h4>
                    <Badge variant="outline">{objective.progress}٪</Badge>
                  </div>
                  <Progress value={objective.progress} className="h-2" />
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-muted-foreground">مشارکت اعضای تیم:</h5>
                    {objective.teamContribution.map((contrib, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{contrib.member}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${contrib.contribution}%` }}
                            />
                          </div>
                          <span className="text-muted-foreground">{contrib.contribution}٪</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                فعالیت‌های اخیر
              </CardTitle>
              <CardDescription>آخرین اقدامات و به‌روزرسانی‌های اعضای تیم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                توزیع بار کاری
              </CardTitle>
              <CardDescription>توزیع وظایف در بین اعضای تیم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => {
                  const totalTasks = member.routineTasksTotal + member.specialTasks;
                  const workloadPercentage = Math.min((totalTasks / 8) * 100, 100); // فرض ۸ وظیفه به عنوان ۱۰۰٪ ظرفیت
                  
                  return (
                    <div key={member.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-muted-foreground">{totalTasks} وظیفه</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={workloadPercentage} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground w-12">
                          {Math.round(workloadPercentage)}٪
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                <h5 className="font-medium text-sm mb-2">پیشنهادات:</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• بازتوزیع وظایف از حسن کریمی در نظر گرفته شود</li>
                  <li>• سارا محمدی ظرفیت پذیرش مسئولیت‌های اضافی را دارد</li>
                  <li>• وظایف عقب‌افتاده را با دقت پیگیری کنید</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Manager;
