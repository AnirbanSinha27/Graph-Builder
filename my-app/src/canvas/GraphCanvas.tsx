import { useCallback, useEffect, forwardRef,useImperativeHandle } from 'react';
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import type { Node, Edge, NodeChange, EdgeChange } from 'reactflow';
import { useUIStore } from '../store/useUIstore';
import { useGraph } from '../api/queries';
import { useReactFlow } from 'reactflow';

// const initialNodes: Node[] = [
//     {
//       id: '1',
//       position: { x: 100, y: 100 },
//       data: { label: 'Postgres' },
//     },
//     {
//       id: '2',
//       position: { x: 400, y: 150 },
//       data: { label: 'Redis' },
//     },
//     {
//       id: '3',
//       position: { x: 250, y: 350 },
//       data: { label: 'MongoDB' },
//     },
//   ];
  
//   const initialEdges: Edge[] = [
//     { id: 'e1-2', source: '1', target: '2' },
//     { id: 'e2-3', source: '2', target: '3' },
//   ];

interface Props {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export interface GraphCanvasHandle {
  fitView: () => void;
}


const GraphCanvas = forwardRef<GraphCanvasHandle, Props>(
  ({ nodes, edges, setNodes, setEdges }, ref) => {
    const rf = useReactFlow();

    useImperativeHandle(ref, () => ({
      fitView: () => rf.fitView({ padding: 0.2 }),
    }));
  const selectedAppId = useUIStore((s) => s.selectedAppId);
  const { data, isLoading, isError } = useGraph(selectedAppId);

  // Load graph data when it arrives
  useEffect(() => {
    if (data) {
      setNodes(data.nodes ?? []);
      setEdges(data.edges ?? []);
    }
  }, [data,setNodes,setEdges]);

  const setSelectedNodeId = useUIStore((s) => s.setSelectedNodeId);
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
          const target = e.target as HTMLElement | null;
          const isEditingText =
            target &&
            (target.tagName === 'INPUT' ||
              target.tagName === 'TEXTAREA' ||
              target.isContentEditable);

          if (isEditingText) {
            return;
          }

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
        [setNodes]
      );
      
      const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
          setEdges((eds) => applyEdgeChanges(changes, eds));
        },
        [setEdges]
      );
      

    if (!selectedAppId) {
      return (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          Select an app to load graph
        </div>
      );
    }
    
    if (isLoading) {
      return (
        <div className="h-full flex items-center justify-center text-foreground">
          Loading graph...
        </div>
      );
    }
    
    if (isError) {
      return (
        <div className="h-full flex items-center justify-center text-destructive">
          Failed to load graph
        </div>
      );
    }
    
  
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
        className="dark-theme"
      >
        <Background gap={16} size={1} color="rgba(255, 255, 255, 0.05)" />
        <Controls className="react-flow__controls-dark" />
      </ReactFlow>
    );
  })


export default GraphCanvas
