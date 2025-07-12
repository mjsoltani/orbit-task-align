
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Building, UserCheck, Settings } from "lucide-react";
import { useState } from "react";

const Organization = () => {
  const [activeTab, setActiveTab] = useState("positions");

  const positions = [
    {
      id: 1,
      name: "Production Line Supervisor",
      department: "Production",
      assignedEmployee: "John Smith",
      routineTasks: 4,
      parentPosition: "Production Manager"
    },
    {
      id: 2,
      name: "Quality Control Inspector",
      department: "Quality",
      assignedEmployee: "Maria Garcia",
      routineTasks: 3,
      parentPosition: "Quality Manager"
    },
    {
      id: 3,
      name: "Production Manager",
      department: "Production",
      assignedEmployee: "David Johnson",
      routineTasks: 2,
      parentPosition: "Plant Director"
    },
    {
      id: 4,
      name: "Maintenance Technician",
      department: "Maintenance",
      assignedEmployee: "Mike Wilson",
      routineTasks: 5,
      parentPosition: "Maintenance Supervisor"
    }
  ];

  const routineTasks = [
    {
      id: 1,
      name: "Daily Equipment Safety Check",
      position: "Production Line Supervisor",
      period: "Daily",
      checklist: ["Check emergency stops", "Verify safety guards", "Test warning lights"],
      description: "Comprehensive safety inspection of production equipment"
    },
    {
      id: 2,
      name: "Quality Control Inspection",
      position: "Quality Control Inspector",
      period: "Daily",
      checklist: ["Sample product quality", "Check dimensions", "Document results"],
      description: "Random quality sampling and testing procedures"
    },
    {
      id: 3,
      name: "Weekly Production Report",
      position: "Production Manager",
      period: "Weekly",
      checklist: ["Compile metrics", "Analyze trends", "Submit report"],
      description: "Weekly production performance analysis and reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">HR & Organization</h1>
            <p className="text-muted-foreground">Manage organizational structure and routine tasks</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>

        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "positions" ? "default" : "ghost"}
            onClick={() => setActiveTab("positions")}
            className="flex items-center gap-2"
          >
            <Building className="h-4 w-4" />
            Positions
          </Button>
          <Button
            variant={activeTab === "tasks" ? "default" : "ghost"}
            onClick={() => setActiveTab("tasks")}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Routine Tasks
          </Button>
          <Button
            variant={activeTab === "chart" ? "default" : "ghost"}
            onClick={() => setActiveTab("chart")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Org Chart
          </Button>
        </div>

        {activeTab === "positions" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Positions</CardTitle>
                <CardDescription>Manage organizational positions and assignments</CardDescription>
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
                        <span className="text-muted-foreground">Assigned to:</span>
                        <p className="font-medium">{position.assignedEmployee}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reports to:</span>
                        <p className="font-medium">{position.parentPosition}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {position.routineTasks} routine tasks assigned
                      </span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create New Position</CardTitle>
                <CardDescription>Add a new job position to the organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="positionName">Position Name</Label>
                  <Input id="positionName" placeholder="e.g., Senior Quality Analyst" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="quality">Quality</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="admin">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reportsTo">Reports To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production-manager">Production Manager</SelectItem>
                      <SelectItem value="quality-manager">Quality Manager</SelectItem>
                      <SelectItem value="plant-director">Plant Director</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Create Position</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Routine Tasks</CardTitle>
                <CardDescription>Tasks automatically assigned based on job positions</CardDescription>
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
                      <span className="text-sm font-medium text-muted-foreground">Assigned to:</span>
                      <p className="text-sm">{task.position}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Checklist:</span>
                      <ul className="text-sm list-disc list-inside ml-2 space-y-1">
                        {task.checklist.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="ghost" size="sm">Edit Task</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Routine Task</CardTitle>
                <CardDescription>Define a new routine task for a job position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="taskName">Task Name</Label>
                  <Input id="taskName" placeholder="e.g., Daily Calibration Check" />
                </div>
                <div>
                  <Label htmlFor="position">Assign to Position</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supervisor">Production Line Supervisor</SelectItem>
                      <SelectItem value="inspector">Quality Control Inspector</SelectItem>
                      <SelectItem value="technician">Maintenance Technician</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="period">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Detailed task instructions..." />
                </div>
                <Button className="w-full">Create Task</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "chart" && (
          <Card>
            <CardHeader>
              <CardTitle>Organizational Chart</CardTitle>
              <CardDescription>Visual representation of reporting relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6 p-6">
                <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20">
                  <div className="text-center">
                    <h3 className="font-semibold">Plant Director</h3>
                    <p className="text-sm text-muted-foreground">Sarah Johnson</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-secondary/50 p-4 rounded-lg border">
                    <div className="text-center">
                      <h4 className="font-semibold">Production Manager</h4>
                      <p className="text-sm text-muted-foreground">David Johnson</p>
                      <Badge variant="outline" className="mt-2">Production</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg border">
                    <div className="text-center">
                      <h4 className="font-semibold">Quality Manager</h4>
                      <p className="text-sm text-muted-foreground">Lisa Chen</p>
                      <Badge variant="outline" className="mt-2">Quality</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 p-4 rounded-lg border">
                    <div className="text-center">
                      <h4 className="font-semibold">Maintenance Supervisor</h4>
                      <p className="text-sm text-muted-foreground">Robert Brown</p>
                      <Badge variant="outline" className="mt-2">Maintenance</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-3 rounded-lg border">
                    <div className="text-center">
                      <h5 className="font-medium">Production Line Supervisor</h5>
                      <p className="text-sm text-muted-foreground">John Smith</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg border">
                    <div className="text-center">
                      <h5 className="font-medium">Quality Control Inspector</h5>
                      <p className="text-sm text-muted-foreground">Maria Garcia</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Organization;
