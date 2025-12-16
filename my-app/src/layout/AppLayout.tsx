import  TopBar  from "./Topbar";
import LeftRail  from "./LeftRail";
import  RightPanel  from "./RightPanel";
import GraphCanvas from "../canvas/GraphCanvas";
import type { GraphCanvasHandle } from "../canvas/GraphCanvas";
import { useState,useRef } from "react";
import type { Node,Edge} from "reactflow";
import { ReactFlowProvider } from "reactflow";

export function AppLayout() {

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const graphRef = useRef<GraphCanvasHandle>(null);

  return (
    <div className="h-screen flex flex-col">
      <TopBar onFitView={() => graphRef.current?.fitView()}/>

      <div className="flex flex-1 overflow-hidden">
        <LeftRail />

        {/* Center Canvas Placeholder */}
        <main className="flex-1 bg-background flex items-center justify-center">
          <ReactFlowProvider>
            <GraphCanvas
            nodes={nodes}
            ref={graphRef}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}/>
          </ReactFlowProvider>
        </main>

        <RightPanel nodes={nodes} setNodes={setNodes}/>
      </div>
    </div>
  );
}
