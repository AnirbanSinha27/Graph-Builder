import { useUIStore } from "../store/useUIstore";

interface Props {
  onFitView: () => void;
}

const Topbar = ({ onFitView }: Props) => {

  const setMobilePanelOpen = useUIStore((s) => s.setMobilePanelOpen);

    return (
      <header className="h-12 border-b border-border bg-background flex items-center justify-between px-4">
        <div className="font-semibold text-foreground">App Graph Builder</div>

        <div className="flex items-center gap-2">
          <button
            className="text-sm px-2 py-1 border border-border rounded bg-background hover:bg-accent text-foreground transition-colors lg:hidden"
            onClick={() => setMobilePanelOpen(true)}
          >
            Panel
          </button>

          <button onClick={onFitView} className="cursor-pointer text-sm px-2 py-1 border border-border rounded bg-background hover:bg-accent text-foreground transition-colors">
            Fit
          </button>
        </div>
      </header>
      );
}

export default Topbar
