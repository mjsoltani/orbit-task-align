
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, TrendingUp, Plus, Calendar, Award } from "lucide-react";
import { useState } from "react";

const Strategic = () => {
  const [activeView, setActiveView] = useState("objectives");

  const objectives = [
    {
      id: 1,
      title: "Improve Production Line 1 Efficiency",
      description: "Enhance overall productivity and reduce waste on production line 1",
      period: "Q1 2024",
      owner: "David Johnson",
      status: "Active",
      progress: 65,
      keyResults: [
        {
          id: 1,
          title: "Reduce line downtime from 15 mins/day to 5 mins/day",
          targetValue: 5,
          currentValue: 8,
          unit: "mins/day",
          progress: 70,
          status: "In Progress"
        },
        {
          id: 2,
          title: "Decrease raw material waste by 3%",
          targetValue: 3,
          currentValue: 1.8,
          unit: "%",
          progress: 60,
          status: "In Progress"
        },
        {
          id: 3,
          title: "Increase output by 15%",
          targetValue: 15,
          currentValue: 9,
          unit: "%",
          progress: 60,
          status: "In Progress"
        }
      ]
    },
    {
      id: 2,
      title: "Enhance Quality Control Standards",
      description: "Implement stricter quality measures and reduce defect rates",
      period: "Q1 2024",
      owner: "Lisa Chen",
      status: "Active",
      progress: 45,
      keyResults: [
        {
          id: 4,
          title: "Reduce defect rate to under 2%",
          targetValue: 2,
          currentValue: 3.2,
          unit: "%",
          progress: 40,
          status: "At Risk"
        },
        {
          id: 5,
          title: "Implement 5 new quality checkpoints",
          targetValue: 5,
          currentValue: 3,
          unit: "checkpoints",
          progress: 60,
          status: "In Progress"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "In Progress": return "default";
      case "At Risk": return "destructive";
      case "Completed": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Strategic Planning</h1>
            <p className="text-muted-foreground">Define and track organizational objectives and key results</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Objective
          </Button>
        </div>

        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeView === "objectives" ? "default" : "ghost"}
            onClick={() => setActiveView("objectives")}
            className="flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            Objectives
          </Button>
          <Button
            variant={activeView === "create" ? "default" : "ghost"}
            onClick={() => setActiveView("create")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>

        {activeView === "objectives" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Objectives</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">This quarter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Key Results</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">55%</div>
                  <p className="text-xs text-muted-foreground">Across all OKRs</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {objectives.map((objective) => (
                <Card key={objective.id}>
                  <CardHeader>
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
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {objective.period}
                        </div>
                        <p className="text-sm text-muted-foreground">Owner: {objective.owner}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Overall Progress</span>
                        <span className="font-medium">{objective.progress}%</span>
                      </div>
                      <Progress value={objective.progress} className="h-2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm">Key Results:</h4>
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
                              <span>Current: {kr.currentValue} {kr.unit}</span>
                              <span>Target: {kr.targetValue} {kr.unit}</span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span>Progress</span>
                                <span>{kr.progress}%</span>
                              </div>
                              <Progress value={kr.progress} className="h-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeView === "create" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Objective</CardTitle>
                <CardDescription>Define a high-level organizational goal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="objectiveTitle">Objective Title</Label>
                  <Input 
                    id="objectiveTitle" 
                    placeholder="e.g., Improve Customer Satisfaction" 
                  />
                </div>
                <div>
                  <Label htmlFor="objectiveDescription">Description</Label>
                  <Textarea 
                    id="objectiveDescription" 
                    placeholder="Detailed description of the objective..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="period">Time Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1-2024">Q1 2024</SelectItem>
                      <SelectItem value="q2-2024">Q2 2024</SelectItem>
                      <SelectItem value="h1-2024">H1 2024</SelectItem>
                      <SelectItem value="annual-2024">Annual 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="owner">Objective Owner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="david">David Johnson</SelectItem>
                      <SelectItem value="lisa">Lisa Chen</SelectItem>
                      <SelectItem value="robert">Robert Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Create Objective</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Key Result</CardTitle>
                <CardDescription>Define a measurable outcome for an objective</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="parentObjective">Parent Objective</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select objective" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efficiency">Improve Production Line 1 Efficiency</SelectItem>
                      <SelectItem value="quality">Enhance Quality Control Standards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="krTitle">Key Result Title</Label>
                  <Input 
                    id="krTitle" 
                    placeholder="e.g., Reduce customer complaints by 50%" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetValue">Target Value</Label>
                    <Input 
                      id="targetValue" 
                      type="number" 
                      placeholder="50" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input 
                      id="unit" 
                      placeholder="%, mins, units, etc." 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                  />
                </div>
                <Button className="w-full">Add Key Result</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Strategic;
