
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Calendar, Users, Plus, Send, Eye, Reply } from "lucide-react";
import { useState } from "react";

const Correspondence = () => {
  const [correspondences, setCorrespondences] = useState([
    {
      id: 1,
      type: "نامه",
      subject: "درخواست جلسه بررسی عملکرد",
      sender: "علی محمدی",
      recipient: "مدیر عامل",
      date: "۱۴۰۳/۰۱/۱۵",
      status: "ارسال شده",
      priority: "عادی"
    }
  ]);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "جلسه بررسی عملکرد",
      organizer: "علی محمدی",
      participants: ["مدیر عامل", "مدیر فروش"],
      date: "۱۴۰۳/۰۱/۲۰",
      time: "۱۰:۰۰",
      status: "برنامه‌ریزی شده"
    }
  ]);

  const [substitutes, setSubstitutes] = useState([
    {
      id: 1,
      person: "علی محمدی",
      substitute: "رضا کریمی",
      startDate: "۱۴۰۳/۰۱/۱۵",
      endDate: "۱۴۰۳/۰۱/۲۵",
      reason: "مرخصی استحقاقی",
      status: "فعال"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ارسال شده": case "فعال": case "برنامه‌ریزی شده": return "default";
      case "دریافت شده": return "secondary";
      case "پاسخ داده شده": return "outline";
      case "منقضی شده": return "destructive";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "فوری": return "destructive";
      case "مهم": return "default";
      case "عادی": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">مکاتبات و هماهنگی</h1>
            <p className="text-muted-foreground">مدیریت نامه‌ها، جلسات و جایگزین‌ها</p>
          </div>
        </div>

        <Tabs defaultValue="correspondence" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="correspondence" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              مکاتبات
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              جلسات
            </TabsTrigger>
            <TabsTrigger value="substitutes" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              جایگزین‌ها
            </TabsTrigger>
          </TabsList>

          <TabsContent value="correspondence" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">مکاتبات</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    نامه جدید
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>ایجاد نامه جدید</DialogTitle>
                    <DialogDescription>
                      نامه یا درخواست جدید خود را ایجاد کنید
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">نوع</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب نوع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="letter">نامه</SelectItem>
                            <SelectItem value="request">درخواست</SelectItem>
                            <SelectItem value="report">گزارش</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">اولویت</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="انتخاب اولویت" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">فوری</SelectItem>
                            <SelectItem value="important">مهم</SelectItem>
                            <SelectItem value="normal">عادی</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="recipient">گیرنده</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب گیرنده" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ceo">مدیر عامل</SelectItem>
                          <SelectItem value="sales">مدیر فروش</SelectItem>
                          <SelectItem value="hr">مدیر منابع انسانی</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">موضوع</Label>
                      <Input id="subject" placeholder="موضوع نامه" />
                    </div>
                    <div>
                      <Label htmlFor="content">متن</Label>
                      <Textarea id="content" placeholder="متن نامه..." rows={5} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">ذخیره پیش‌نویس</Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      ارسال
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {correspondences.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{item.subject}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>فرستنده: {item.sender}</span>
                          <span>گیرنده: {item.recipient}</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(item.priority) as any}>
                          {item.priority}
                        </Badge>
                        <Badge variant={getStatusColor(item.status) as any}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        مشاهده
                      </Button>
                      <Button variant="outline" size="sm">
                        <Reply className="h-4 w-4 mr-1" />
                        پاسخ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">جلسات</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    جلسه جدید
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>برنامه‌ریزی جلسه جدید</DialogTitle>
                    <DialogDescription>
                      جلسه جدید خود را برنامه‌ریزی کنید
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="meetingTitle">عنوان جلسه</Label>
                      <Input id="meetingTitle" placeholder="عنوان جلسه" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="meetingDate">تاریخ</Label>
                        <Input id="meetingDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="meetingTime">ساعت</Label>
                        <Input id="meetingTime" type="time" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="participants">شرکت‌کنندگان</Label>
                      <Textarea id="participants" placeholder="نام شرکت‌کنندگان را وارد کنید..." rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="agenda">دستور جلسه</Label>
                      <Textarea id="agenda" placeholder="دستور جلسه..." rows={4} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>ایجاد جلسه</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {meetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>برگزارکننده: {meeting.organizer}</span>
                          <span>{meeting.date} - {meeting.time}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          شرکت‌کنندگان: {meeting.participants.join("، ")}
                        </div>
                      </div>
                      <Badge variant={getStatusColor(meeting.status) as any}>
                        {meeting.status}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="substitutes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">جایگزین‌ها</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    جایگزین جدید
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>تعریف جایگزین</DialogTitle>
                    <DialogDescription>
                      جایگزین جدید برای دوره غیبت تعریف کنید
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="person">فرد اصلی</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب فرد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ali">علی محمدی</SelectItem>
                          <SelectItem value="sara">سارا احمدی</SelectItem>
                          <SelectItem value="reza">رضا کریمی</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="substitute">جایگزین</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب جایگزین" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reza">رضا کریمی</SelectItem>
                          <SelectItem value="maryam">مریم رضایی</SelectItem>
                          <SelectItem value="ahmad">احمد محمدی</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">تاریخ شروع</Label>
                        <Input id="startDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="endDate">تاریخ پایان</Label>
                        <Input id="endDate" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reason">دلیل</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب دلیل" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">مرخصی استحقاقی</SelectItem>
                          <SelectItem value="sick">مرخصی استعلاجی</SelectItem>
                          <SelectItem value="business">ماموریت کاری</SelectItem>
                          <SelectItem value="other">سایر</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>تعریف جایگزین</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {substitutes.map((sub) => (
                <Card key={sub.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{sub.person} → {sub.substitute}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>از {sub.startDate} تا {sub.endDate}</span>
                          <span>دلیل: {sub.reason}</span>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(sub.status) as any}>
                        {sub.status}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Correspondence;
