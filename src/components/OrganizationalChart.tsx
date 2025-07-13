
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Custom node component for organizational positions
const PositionNode = ({ data, id }: { data: any; id: string }) => {
  return (
    <Card className="min-w-[200px] border-2 border-primary/20">
      <CardContent className="p-4">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-sm">{data.name}</h3>
          <p className="text-xs text-muted-foreground">{data.employee || 'تخصیص نیافته'}</p>
          <Badge variant="outline" className="text-xs">{data.department}</Badge>
          {data.isManager && (
            <Badge variant="default" className="text-xs">مدیر</Badge>
          )}
        </div>
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
        <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      </CardContent>
    </Card>
  );
};

const nodeTypes = {
  position: PositionNode,
};

interface OrganizationalChartProps {
  positions: any[];
  onPositionsUpdate: (positions: any[]) => void;
}

export const OrganizationalChart: React.FC<OrganizationalChartProps> = ({ 
  positions, 
  onPositionsUpdate 
}) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPosition, setNewPosition] = useState({
    name: '',
    department: '',
    employee: '',
    isManager: false
  });

  // Convert positions to nodes
  const initialNodes: Node[] = positions.map((position, index) => ({
    id: position.id.toString(),
    type: 'position',
    position: { 
      x: (index % 3) * 250 + 50, 
      y: Math.floor(index / 3) * 150 + 50 
    },
    data: {
      name: position.name,
      employee: position.assignedEmployee,
      department: position.department,
      isManager: position.name.includes('مدیر')
    },
  }));

  // Create edges based on parent-child relationships
  const initialEdges: Edge[] = positions
    .filter(pos => pos.parentPosition && pos.parentPosition !== 'بدون گزارش‌دهی')
    .map(pos => {
      const parentPos = positions.find(p => p.name === pos.parentPosition);
      if (parentPos) {
        return {
          id: `e${parentPos.id}-${pos.id}`,
          source: parentPos.id.toString(),
          target: pos.id.toString(),
          type: 'smoothstep',
          animated: false,
        };
      }
      return null;
    })
    .filter(Boolean) as Edge[];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleAddPosition = () => {
    if (!newPosition.name || !newPosition.department) {
      toast({
        title: "خطا",
        description: "لطفا نام پست و بخش را وارد کنید",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...positions.map(p => p.id), 0) + 1;
    const newPos = {
      id: newId,
      name: newPosition.name,
      department: newPosition.department,
      assignedEmployee: newPosition.employee || "تخصیص نیافته",
      routineTasks: 0,
      parentPosition: "بدون گزارش‌دهی"
    };

    const updatedPositions = [...positions, newPos];
    onPositionsUpdate(updatedPositions);

    // Add new node to the chart
    const newNode: Node = {
      id: newId.toString(),
      type: 'position',
      position: { 
        x: (positions.length % 3) * 250 + 50, 
        y: Math.floor(positions.length / 3) * 150 + 50 
      },
      data: {
        name: newPosition.name,
        employee: newPosition.employee || "تخصیص نیافته",
        department: newPosition.department,
        isManager: newPosition.isManager
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setNewPosition({ name: '', department: '', employee: '', isManager: false });
    setIsAddDialogOpen(false);

    toast({
      title: "موفقیت",
      description: "پست جدید به چارت سازمانی اضافه شد",
    });
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    
    const updatedPositions = positions.filter(p => p.id.toString() !== nodeId);
    onPositionsUpdate(updatedPositions);

    toast({
      title: "حذف شد",
      description: "پست از چارت سازمانی حذف شد",
    });
  };

  return (
    <div className="h-[600px] w-full border rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">چارت سازمانی داینامیک</h3>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                افزودن پست
              </Button>
            </DialogTrigger>
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle>افزودن پست جدید</DialogTitle>
                <DialogDescription>
                  پست جدید را به چارت سازمانی اضافه کنید
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="positionName">نام پست</Label>
                  <Input
                    id="positionName"
                    value={newPosition.name}
                    onChange={(e) => setNewPosition({...newPosition, name: e.target.value})}
                    placeholder="مثلاً مدیر فروش"
                  />
                </div>
                <div>
                  <Label htmlFor="department">بخش</Label>
                  <Select 
                    value={newPosition.department} 
                    onValueChange={(value) => setNewPosition({...newPosition, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب بخش" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="تولید">تولید</SelectItem>
                      <SelectItem value="کیفیت">کیفیت</SelectItem>
                      <SelectItem value="تعمیرات">تعمیرات</SelectItem>
                      <SelectItem value="اداری">اداری</SelectItem>
                      <SelectItem value="فروش">فروش</SelectItem>
                      <SelectItem value="مالی">مالی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employee">نام کارمند</Label>
                  <Input
                    id="employee"
                    value={newPosition.employee}
                    onChange={(e) => setNewPosition({...newPosition, employee: e.target.value})}
                    placeholder="نام کارمند تخصیص یافته"
                  />
                </div>
                <Button onClick={handleAddPosition} className="w-full">
                  افزودن پست
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
        dir="rtl"
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
};
