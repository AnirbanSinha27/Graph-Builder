import { useUIStore } from "../store/useUIstore";

function PanelContent() {
  return (
    <div className="space-y-4">
      <div className="font-medium">Apps</div>
      <div className="h-24 bg-gray-100 rounded" />

      <div className="border-t pt-4 font-medium">
        Node Inspector
      </div>
      <div className="h-48 bg-gray-100 rounded" />
    </div>
  );
}

const RightPanel = () => {

  const isMobileOpen = useUIStore((s) => s.isMobilePanelOpen);
  const setMobilePanelOpen = useUIStore((s) => s.setMobilePanelOpen);

    return (
      <>
      {/* Desktop */}
      <aside className="w-80 border-l p-4 hidden lg:block">
        <PanelContent />
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden">
          <aside className="absolute right-0 top-0 h-full w-80 bg-white p-4">
            <button
              className="mb-4 text-sm"
              onClick={() => setMobilePanelOpen(false)}
            >
              Close
            </button>
            <PanelContent />
          </aside>
        </div>
      )}
    </>
      );
}

export default RightPanel
