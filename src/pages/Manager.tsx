
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
      name: "John Smith",
      position: "Production Line Supervisor",
      routineTasksCompleted: 3,
      routineTasksTotal: 4,
      specialTasks: 2,
      overdueTasks: 0,
      productivity: 92
    },
    {
      id: 2,
      name: "Maria Garcia",
      position: "Quality Control Inspector",
      routineTasksCompleted: 4,
      routineTasksTotal: 4,
      specialTasks: 1,
      overdueTasks: 0,
      productivity: 98
    },
    {
      id: 3,
      name: "Mike Wilson",
      position: "Maintenance Technician",
      routineTasksCompleted: 2,
      routineTasksTotal: 5,
      specialTasks: 1,
      overdueTasks: 1,
      productivity: 75
    },
    {
      id: 4,
      name: "Sarah Johnson",
      position: "Production Operator",
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
      title: "Improve Production Line 1 Efficiency",
      progress: 65,
      teamContribution: [
        { member: "John Smith", contribution: 40 },
        { member: "Mike Wilson", contribution: 25 },
        { member: "Maria Garcia", contribution: 20 }
      ]
    },
    {
      id: 2,
      title: "Enhance Quality Control Standards",
      progress: 45,
      teamContribution: [
        { member: "Maria Garcia", contribution: 60 },
        { member: "John Smith", contribution: 25 }
      ]
    }
  ];

  const recentActivity = [
    { user: "John Smith", action: "Completed Daily Equipment Safety Check", time: "2 hours ago" },
    { user: "Maria Garcia", action: "Updated Quality Control Inspection report", time: "3 hours ago" },
    { user: "Mike Wilson", action: "Started Install new sensor system on Line 1", time: "1 day ago" },
    { user: "Sarah Johnson", action: "Completed all routine tasks", time: "1 day ago" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>
            <p className="text-muted-foreground">Team overview and performance management</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
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
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <p className="text-xs text-muted-foreground">Direct reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Productivity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(teamMembers.reduce((sum, member) => sum + member.productivity, 0) / teamMembers.length)}%
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamMembers.reduce((sum, member) => sum + member.overdueTasks, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(objectives.reduce((sum, obj) => sum + obj.progress, 0) / objectives.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Average progress</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Performance
              </CardTitle>
              <CardDescription>Individual team member task completion and productivity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-4 rounded-lg border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{member.productivity}%</div>
                      <p className="text-xs text-muted-foreground">Productivity</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">
                        {member.routineTasksCompleted}/{member.routineTasksTotal}
                      </div>
                      <p className="text-muted-foreground">Routine</p>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{member.specialTasks}</div>
                      <p className="text-muted-foreground">Special</p>
                    </div>
                    <div className="text-center">
                      <div className={`font-medium ${member.overdueTasks > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {member.overdueTasks}
                      </div>
                      <p className="text-muted-foreground">Overdue</p>
                    </div>
                  </div>

                  <Progress value={member.productivity} className="h-2" />
                  
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Team Goal Progress
              </CardTitle>
              <CardDescription>Progress on strategic objectives and team contributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {objectives.map((objective) => (
                <div key={objective.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{objective.title}</h4>
                    <Badge variant="outline">{objective.progress}%</Badge>
                  </div>
                  <Progress value={objective.progress} className="h-2" />
                  
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-muted-foreground">Team Contributions:</h5>
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
                          <span className="text-muted-foreground">{contrib.contribution}%</span>
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
                Recent Activity
              </CardTitle>
              <CardDescription>Latest team member actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
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
                Workload Distribution
              </CardTitle>
              <CardDescription>Task distribution across team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => {
                  const totalTasks = member.routineTasksTotal + member.specialTasks;
                  const workloadPercentage = Math.min((totalTasks / 8) * 100, 100); // Assuming 8 tasks is 100% capacity
                  
                  return (
                    <div key={member.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-muted-foreground">{totalTasks} tasks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={workloadPercentage} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground w-12">
                          {Math.round(workloadPercentage)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                <h5 className="font-medium text-sm mb-2">Recommendations:</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Consider redistributing tasks from Mike Wilson</li>
                  <li>• Sarah Johnson has capacity for additional responsibilities</li>
                  <li>• Monitor overdue tasks closely</li>
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
