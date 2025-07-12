
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
      name: "Install new sensor system on Line 1",
      description: "Replace old sensors with IoT-enabled monitoring system",
      dueDate: "2024-01-15",
      priority: "High",
      status: "In Progress",
      assignedTo: ["John Smith", "Mike Wilson"],
      linkedKR: "Reduce line downtime from 15 mins/day to 5 mins/day",
      checklist: [
        { item: "Order sensors", completed: true },
        { item: "Schedule downtime", completed: true },
        { item: "Install hardware", completed: false },
        { item: "Configure software", completed: false },
        { item: "Test system", completed: false }
      ],
      createdBy: "David Johnson"
    },
    {
      id: 2,
      name: "Update safety procedures documentation",
      description: "Revise and update all safety procedure documents",
      dueDate: "2024-01-20",
      priority: "Medium",
      status: "To Do",
      assignedTo: ["Maria Garcia"],
      linkedKR: "Implement 5 new quality checkpoints",
      checklist: [
        { item: "Review current procedures", completed: false },
        { item: "Identify gaps", completed: false },
        { item: "Draft updates", completed: false },
        { item: "Manager approval", completed: false }
      ],
      createdBy: "Lisa Chen"
    },
    {
      id: 3,
      name: "Calibrate quality measurement equipment",
      description: "Monthly calibration of all quality testing equipment",
      dueDate: "2024-01-12",
      priority: "High",
      status: "Completed",
      assignedTo: ["Maria Garcia"],
      linkedKR: "Reduce defect rate to under 2%",
      checklist: [
        { item: "Test precision scales", completed: true },
        { item: "Calibrate thickness gauge", completed: true },
        { item: "Update calibration log", completed: true },
        { item: "Generate report", completed: true }
      ],
      createdBy: "Lisa Chen"
    }
  ];

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === "all") return true;
    if (activeFilter === "todo") return task.status === "To Do";
    if (activeFilter === "progress") return task.status === "In Progress";
    if (activeFilter === "completed") return task.status === "Completed";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "secondary";
      case "In Progress": return "default";
      case "Completed": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Task Management</h1>
            <p className="text-muted-foreground">Manage special projects and strategic initiatives</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={activeFilter === "all" ? "default" : "ghost"}
              onClick={() => setActiveFilter("all")}
              size="sm"
            >
              All Tasks
            </Button>
            <Button
              variant={activeFilter === "todo" ? "default" : "ghost"}
              onClick={() => setActiveFilter("todo")}
              size="sm"
            >
              To Do
            </Button>
            <Button
              variant={activeFilter === "progress" ? "default" : "ghost"}
              onClick={() => setActiveFilter("progress")}
              size="sm"
            >
              In Progress
            </Button>
            <Button
              variant={activeFilter === "completed" ? "default" : "ghost"}
              onClick={() => setActiveFilter("completed")}
              size="sm"
            >
              Completed
            </Button>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <p className="text-xs text-muted-foreground">Active projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.filter(t => t.status === "In Progress").length}
              </div>
              <p className="text-xs text-muted-foreground">Active work</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.filter(t => t.priority === "High").length}
              </div>
              <p className="text-xs text-muted-foreground">Urgent tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Assigned users</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Task List</h2>
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
                      <span className="text-muted-foreground">Due Date:</span>
                      <p className="font-medium">{task.dueDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created by:</span>
                      <p className="font-medium">{task.createdBy}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground text-sm">Assigned to:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {task.assignedTo.map((person, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {person}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Linked to Goal:</span>
                    <p className="text-sm mt-1">{task.linkedKR}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Progress Checklist:</span>
                    <div className="mt-2 space-y-2">
                      {task.checklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
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
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
              <CardDescription>Add a new project task linked to strategic objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="taskName">Task Name</Label>
                <Input id="taskName" placeholder="e.g., Implement new quality process" />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Detailed task description..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="linkedKR">Linked Key Result *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select key result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtime">Reduce line downtime from 15 mins/day to 5 mins/day</SelectItem>
                    <SelectItem value="waste">Decrease raw material waste by 3%</SelectItem>
                    <SelectItem value="output">Increase output by 15%</SelectItem>
                    <SelectItem value="defects">Reduce defect rate to under 2%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="assignTo">Assign To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="maria">Maria Garcia</SelectItem>
                    <SelectItem value="mike">Mike Wilson</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Create Task</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
