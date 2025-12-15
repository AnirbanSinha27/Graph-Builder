import  TopBar  from "./Topbar";
import LeftRail  from "./LeftRail";
import  RightPanel  from "./RightPanel";
import GraphCanvas from "../canvas/GraphCanvas";
import { useState } from "react";
import type { Node,Edge } from "reactflow";

export function AppLayout() {

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  return (
    <div className="h-screen flex flex-col">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <LeftRail />

        {/* Center Canvas Placeholder */}
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <GraphCanvas
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}/>
        </main>

        <RightPanel nodes={nodes} setNodes={setNodes}/>
      </div>
    </div>
  );
}
