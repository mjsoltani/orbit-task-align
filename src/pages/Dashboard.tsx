
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target, Users, TrendingUp, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const routineTasks = [
    { id: 1, name: "Daily Equipment Safety Check", completed: true, position: "Production Line Supervisor" },
    { id: 2, name: "Quality Control Inspection", completed: false, position: "Quality Control Inspector" },
    { id: 3, name: "Team Morning Briefing", completed: true, position: "Production Line Supervisor" },
    { id: 4, name: "Inventory Level Review", completed: false, position: "Production Line Supervisor" }
  ];

  const specialTasks = [
    { 
      id: 1, 
      name: "Install new sensor system on Line 1", 
      dueDate: "2024-01-15", 
      status: "In Progress",
      linkedKR: "Reduce line downtime from 15 mins/day to 5 mins/day"
    },
    { 
      id: 2, 
      name: "Update safety procedures documentation", 
      dueDate: "2024-01-20", 
      status: "To Do",
      linkedKR: "Improve production line 1 efficiency"
    }
  ];

  const objectives = [
    {
      id: 1,
      title: "Improve Production Line 1 Efficiency",
      progress: 65,
      keyResults: [
        { name: "Reduce line downtime", target: "5 mins/day", current: "8 mins/day", progress: 70 },
        { name: "Decrease material waste", target: "3%", current: "1.8%", progress: 60 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Employee Dashboard</h1>
            <p className="text-muted-foreground">Good morning! Here's what needs your attention today.</p>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            Production Line Supervisor
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2/4</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Special Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65%</div>
              <p className="text-xs text-muted-foreground">Progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productivity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                My Routine Tasks
              </CardTitle>
              <CardDescription>Daily responsibilities for your position</CardDescription>
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
                    Daily
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                My Special Tasks
              </CardTitle>
              <CardDescription>Project tasks assigned to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {specialTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{task.name}</h4>
                    <Badge variant={task.status === "In Progress" ? "default" : "secondary"}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                  <div className="bg-muted/50 p-2 rounded text-xs">
                    <strong>Linked Goal:</strong> {task.linkedKR}
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
              My Goals & Impact
            </CardTitle>
            <CardDescription>How your work contributes to company objectives</CardDescription>
          </CardHeader>
          <CardContent>
            {objectives.map((objective) => (
              <div key={objective.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{objective.title}</h3>
                  <Badge variant="outline">{objective.progress}% Complete</Badge>
                </div>
                <Progress value={objective.progress} className="h-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {objective.keyResults.map((kr, index) => (
                    <div key={index} className="p-3 rounded-lg border space-y-2">
                      <h4 className="font-medium text-sm">{kr.name}</h4>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current: {kr.current}</span>
                        <span>Target: {kr.target}</span>
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
