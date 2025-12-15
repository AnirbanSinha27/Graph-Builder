import  TopBar  from "./Topbar";
import LeftRail  from "./LeftRail";
import  RightPanel  from "./RightPanel";
import GraphCanvas from "../canvas/GraphCanvas";

export function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <LeftRail />

        {/* Center Canvas Placeholder */}
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <GraphCanvas/>
        </main>

        <RightPanel />
      </div>
    </div>
  );
}
