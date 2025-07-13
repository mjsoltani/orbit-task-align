import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Target, TrendingUp, Plus, Calendar, Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Strategic = () => {
  const [activeView, setActiveView] = useState("objectives");
  const [expandedObjectives, setExpandedObjectives] = useState<{ [key: number]: boolean }>({});

  const objectives = [
    {
      id: 1,
      title: "بهبود کارایی خط تولید ۱",
      description: "افزایش بهره‌وری کلی و کاهش ضایعات در خط تولید ۱",
      period: "ربع اول ۱۴۰۳",
      owner: "علی محمدی",
      status: "فعال",
      progress: 65,
      keyResults: [
        {
          id: 1,
          title: "کاهش زمان توقف خط از ۱۵ دقیقه/روز به ۵ دقیقه/روز",
          targetValue: 5,
          currentValue: 8,
          unit: "دقیقه/روز",
          progress: 70,
          status: "در حال انجام"
        },
        {
          id: 2,
          title: "کاهش ضایعات مواد خام به میزان ۳٪",
          targetValue: 3,
          currentValue: 1.8,
          unit: "٪",
          progress: 60,
          status: "در حال انجام"
        },
        {
          id: 3,
          title: "افزایش تولید به میزان ۱۵٪",
          targetValue: 15,
          currentValue: 9,
          unit: "٪",
          progress: 60,
          status: "در حال انجام"
        }
      ]
    },
    {
      id: 2,
      title: "ارتقای استانداردهای کنترل کیفیت",
      description: "اجرای معیارهای کیفی سخت‌گیرانه‌تر و کاهش نرخ نقص",
      period: "ربع اول ۱۴۰۳",
      owner: "لیلا حسینی",
      status: "فعال",
      progress: 45,
      keyResults: [
        {
          id: 4,
          title: "کاهش نرخ نقص به کمتر از ۲٪",
          targetValue: 2,
          currentValue: 3.2,
          unit: "٪",
          progress: 40,
          status: "در خطر"
        },
        {
          id: 5,
          title: "اجرای ۵ نقطه کنترل کیفی جدید",
          targetValue: 5,
          currentValue: 3,
          unit: "نقطه کنترل",
          progress: 60,
          status: "در حال انجام"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "فعال": return "default";
      case "در حال انجام": return "default";
      case "در خطر": return "destructive";
      case "تکمیل": return "secondary";
      default: return "outline";
    }
  };

  const toggleObjective = (id: number) => {
    setExpandedObjectives(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">برنامه‌ریزی استراتژیک</h1>
            <p className="text-muted-foreground">تعریف و پیگیری اهداف سازمانی و نتایج کلیدی</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            هدف جدید
          </Button>
        </div>

        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit space-x-reverse">
          <Button
            variant={activeView === "objectives" ? "default" : "ghost"}
            onClick={() => setActiveView("objectives")}
            className="flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            اهداف
          </Button>
          <Button
            variant={activeView === "create" ? "default" : "ghost"}
            onClick={() => setActiveView("create")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            ایجاد جدید
          </Button>
        </div>

        {activeView === "objectives" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">اهداف فعال</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۲</div>
                  <p className="text-xs text-muted-foreground">این ربع</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">نتایج کلیدی</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۵</div>
                  <p className="text-xs text-muted-foreground">در حال انجام</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">میانگین پیشرفت</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۵۵٪</div>
                  <p className="text-xs text-muted-foreground">در کل OKRها</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {objectives.map((objective) => (
                <Card key={objective.id}>
                  <Collapsible 
                    open={expandedObjectives[objective.id]} 
                    onOpenChange={() => toggleObjective(objective.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <CardTitle className="flex items-center gap-3">
                              {objective.title}
                              <Badge variant={getStatusColor(objective.status) as any}>
                                {objective.status}
                              </Badge>
                            </CardTitle>
                            <CardDescription>{objective.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-left space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {objective.period}
                              </div>
                              <p className="text-sm text-muted-foreground">مسئول: {objective.owner}</p>
                            </div>
                            {expandedObjectives[objective.id] ? 
                              <ChevronUp className="h-5 w-5" /> : 
                              <ChevronDown className="h-5 w-5" />
                            }
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>پیشرفت کلی</span>
                            <span className="font-medium">{objective.progress}٪</span>
                          </div>
                          <Progress value={objective.progress} className="h-2" />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-sm">نتایج کلیدی:</h4>
                          <div className="grid gap-4">
                            {objective.keyResults.map((kr) => (
                              <div key={kr.id} className="p-4 rounded-lg border bg-muted/30 space-y-3">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium text-sm">{kr.title}</h5>
                                  <Badge variant={getStatusColor(kr.status) as any} className="text-xs">
                                    {kr.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span>فعلی: {kr.currentValue} {kr.unit}</span>
                                  <span>هدف: {kr.targetValue} {kr.unit}</span>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span>پیشرفت</span>
                                    <span>{kr.progress}٪</span>
                                  </div>
                                  <Progress value={kr.progress} className="h-1" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === "create" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ایجاد هدف جدید</CardTitle>
                <CardDescription>تعریف یک هدف سطح بالای سازمانی</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="objectiveTitle">عنوان هدف</Label>
                  <Input 
                    id="objectiveTitle" 
                    placeholder="مثلاً بهبود رضایت مشتری" 
                  />
                </div>
                <div>
                  <Label htmlFor="objectiveDescription">توضیحات</Label>
                  <Textarea 
                    id="objectiveDescription" 
                    placeholder="توضیح تفصیلی هدف..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="period">دوره زمانی</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دوره" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1-1403">ربع اول ۱۴۰۳</SelectItem>
                      <SelectItem value="q2-1403">ربع دوم ۱۴۰۳</SelectItem>
                      <SelectItem value="h1-1403">نیمه اول ۱۴۰۳</SelectItem>
                      <SelectItem value="annual-1403">سالانه ۱۴۰۳</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="owner">مسئول هدف</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب مسئول" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ali">علی محمدی</SelectItem>
                      <SelectItem value="leila">لیلا حسینی</SelectItem>
                      <SelectItem value="reza">رضا کریمی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">ایجاد هدف</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>افزودن نتیجه کلیدی</CardTitle>
                <CardDescription>تعریف یک پیامد قابل اندازه‌گیری برای هدف</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="parentObjective">هدف والد</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب هدف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efficiency">بهبود کارایی خط تولید ۱</SelectItem>
                      <SelectItem value="quality">ارتقای استانداردهای کنترل کیفیت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="krTitle">عنوان نتیجه کلیدی</Label>
                  <Input 
                    id="krTitle" 
                    placeholder="مثلاً کاهش شکایات مشتری به میزان ۵۰٪" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetValue">مقدار هدف</Label>
                    <Input 
                      id="targetValue" 
                      type="number" 
                      placeholder="۵۰" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">واحد</Label>
                    <Input 
                      id="unit" 
                      placeholder="٪، دقیقه، واحد، و غیره" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">مهلت</Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                  />
                </div>
                <Button className="w-full">افزودن نتیجه کلیدی</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Strategic;
