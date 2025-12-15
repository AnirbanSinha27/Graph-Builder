import { useUIStore } from "../store/useUIstore";

const Topbar = () => {

  const setMobilePanelOpen = useUIStore((s) => s.setMobilePanelOpen);

    return (
      <header className="h-12 border-b flex items-center justify-between px-4">
        <div className="font-semibold">App Graph Builder</div>

        <div className="flex items-center gap-2">
          <button
            className="text-sm px-2 py-1 border rounded lg:hidden"
            onClick={() => setMobilePanelOpen(true)}
          >
            Panel
          </button>

          <button className="text-sm px-2 py-1 border rounded">
            Fit
          </button>
        </div>
      </header>
      );
}

export default Topbar
