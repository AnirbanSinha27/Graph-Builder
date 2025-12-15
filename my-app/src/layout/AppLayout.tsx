import  TopBar  from "./Topbar";
import LeftRail  from "./LeftRail";
import  RightPanel  from "./RightPanel";

export function AppLayout() {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <LeftRail />

        {/* Center Canvas Placeholder */}
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">
            Canvas Area
          </div>
        </main>

        <RightPanel />
      </div>
    </div>
  );
}
