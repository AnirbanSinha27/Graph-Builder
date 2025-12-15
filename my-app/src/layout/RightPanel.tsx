import { useUIStore } from "../store/useUIstore";
import { useApps } from "../api/queries";

import  NodeInspector  from "../inspector/NodeInspector";
import type { Node } from "reactflow";

interface Props {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

function PanelContent({ nodes, setNodes }: Props) {
  const { data, isLoading, isError } = useApps();

  const selectedAppId = useUIStore((s) => s.selectedAppId);
  const setSelectedAppId = useUIStore((s) => s.setSelectedAppId);
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);

  const selectedNode = nodes?.find((n) => n.id === selectedNodeId);

  if (isLoading) {
    return <div className="text-sm text-gray-400">Loading apps...</div>;
  }

  if (isError) {
    return <div className="text-sm text-red-500">Failed to load apps</div>;
  }

  return (
    <div className="space-y-6">
      {/* Apps List */}
      <div>
        <div className="font-medium mb-2">Apps</div>
        <div className="space-y-1">
          {data!.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`w-full text-left px-2 py-1 rounded text-sm
                ${
                  selectedAppId === app.id
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {app.name}
            </button>
          ))}
        </div>
      </div>

      {/* Node Inspector */}
      <div className="border-t pt-4">
        <div className="font-medium mb-2">Node Inspector</div>

        {!selectedNode && (
          <div className="text-sm text-gray-400">
            Select a node to inspect
          </div>
        )}

        {selectedNode && (
          <NodeInspector
            data={selectedNode.data}
            onChange={(newData) => {
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === selectedNode.id
                    ? { ...n, data: newData }
                    : n
                )
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

const RightPanel = ({ nodes, setNodes }: Props) => {
  const isMobileOpen = useUIStore((s) => s.isMobilePanelOpen);
  const setMobilePanelOpen = useUIStore((s) => s.setMobilePanelOpen);

  return (
    <>
      {/* Desktop */}
      <aside className="w-80 border-l p-4 hidden lg:block">
        <PanelContent nodes={nodes} setNodes={setNodes} />
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

            <PanelContent nodes={nodes} setNodes={setNodes} />
          </aside>
        </div>
      )}
    </>
  );
};

export default RightPanel;
