import { useCallback, useState,useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import type { Node, Edge, NodeChange, EdgeChange } from 'reactflow';
import { useUIStore } from '../store/useUIstore';

const initialNodes: Node[] = [
    {
      id: '1',
      position: { x: 100, y: 100 },
      data: { label: 'Postgres' },
    },
    {
      id: '2',
      position: { x: 400, y: 150 },
      data: { label: 'Redis' },
    },
    {
      id: '3',
      position: { x: 250, y: 350 },
      data: { label: 'MongoDB' },
    },
  ];
  
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ];

const GraphCanvas = () => {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
  
    const setSelectedNodeId = useUIStore((s) => s.setSelectedNodeId);
    const selectedNodeId = useUIStore((s) => s.selectedNodeId);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
          if (
            (e.key === 'Delete' || e.key === 'Backspace') &&
            selectedNodeId
          ) {
            setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
            setEdges((eds) =>
              eds.filter(
                (e) =>
                  e.source !== selectedNodeId &&
                  e.target !== selectedNodeId
              )
            );
            setSelectedNodeId(null);
          }
        }
      
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [selectedNodeId, setSelectedNodeId]);
  
    const onNodesChange = useCallback(
      (changes: NodeChange[]) => {
        setNodes((nds) => applyNodeChanges(changes, nds));
      },
      []
    );
  
    const onEdgesChange = useCallback(
      (changes: EdgeChange[]) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
      },
      []
    );
  
    return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
        }}
        onPaneClick={() => {
          setSelectedNodeId(null);
        }}
      >
        <Background gap={16} size={1} />
        <Controls />
      </ReactFlow>
    );
}

export default GraphCanvas
