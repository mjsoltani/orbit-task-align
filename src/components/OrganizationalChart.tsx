
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
  ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, Building } from "lucide-react";
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
  personnel: any[];
  onPositionsUpdate?: (positions: any[]) => void;
}

export const OrganizationalChart: React.FC<OrganizationalChartProps> = ({ 
  positions,
  personnel,
  onPositionsUpdate 
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Helper function to get personnel for a position
  const getPersonnelForPosition = (positionId: number) => {
    return personnel.filter(p => p.positionId === positionId);
  };

  // Update nodes when positions or personnel change
  React.useEffect(() => {
    const newNodes: Node[] = positions.map((position, index) => {
      const assignedPersonnel = getPersonnelForPosition(position.id);
      const employeeNames = assignedPersonnel.length > 0 
        ? assignedPersonnel.map(p => p.name).join(', ')
        : 'تخصیص نیافته';
        
      return {
        id: position.id.toString(),
        type: 'position',
        position: { 
          x: (index % 3) * 250 + 50, 
          y: Math.floor(index / 3) * 150 + 50 
        },
        data: {
          name: position.name,
          employee: employeeNames,
          department: position.department,
          isManager: position.name.includes('مدیر'),
          positionId: position.id
        },
      };
    });
    setNodes(newNodes);
  }, [positions, personnel]);

  // Update edges when positions change
  React.useEffect(() => {
    const newEdges: Edge[] = positions
      .filter(pos => pos.parentPosition)
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
    setEdges(newEdges);
  }, [positions]);

  const onConnect = useCallback(
    (params: Connection) => {
      // When user connects two nodes, update the parent-child relationship
      const sourcePosition = positions.find(p => p.id.toString() === params.source);
      const targetPosition = positions.find(p => p.id.toString() === params.target);
      
      if (sourcePosition && targetPosition && onPositionsUpdate) {
        const updatedPositions = positions.map(pos => 
          pos.id === targetPosition.id 
            ? { ...pos, parentPosition: sourcePosition.name }
            : pos
        );
        onPositionsUpdate(updatedPositions);
      }
      
      setEdges((eds) => addEdge(params, eds));
    },
    [positions, onPositionsUpdate]
  );


  return (
    <div className="h-[600px] w-full border rounded-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">چارت سازمانی</h3>
        <p className="text-muted-foreground text-sm">
          برای اضافه کردن پست جدید از تب پست‌های سازمانی استفاده کنید
        </p>
      </div>
      
      {positions.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>چارت سازمانی خالی است</p>
            <p className="text-sm">ابتدا پست‌های سازمانی را تعریف کنید</p>
          </div>
        </div>
      ) : (
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
          connectionLineType={ConnectionLineType.SmoothStep}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: false,
          }}
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      )}
    </div>
  );
};
