import { useUIStore } from "../store/useUIstore";

const MOCK_APPS = [
  { id: 'app-1', name: 'supertokens-golang' },
  { id: 'app-2', name: 'supertokens-java' },
  { id: 'app-3', name: 'supertokens-python' },
];

function PanelContent() {

  const selectedAppId = useUIStore((s) => s.selectedAppId);
  const setSelectedAppId = useUIStore((s) => s.setSelectedAppId);

  return (
    <div className="space-y-6">
        <div>
          <div className="font-medium mb-2">Apps</div>
          <div className="space-y-1">
            {MOCK_APPS.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`w-full text-left px-2 py-1 rounded text-sm
                  ${selectedAppId === app.id ? 'bg-gray-200' : 'hover:bg-gray-100'}
                `}
              >
                {app.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="border-t pt-4 font-medium mb-2">
            Node Inspector
          </div>
          <div className="h-40 bg-gray-100 rounded" />
        </div>
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
