const Topbar = () => {
    return (
        <header className="h-12 border-b flex items-center justify-between px-4">
          <div className="font-semibold">
            App Graph Builder
          </div>
    
          <div className="flex items-center gap-2">
            <button className="text-sm px-2 py-1 border rounded">
              Fit
            </button>
            <button className="text-sm px-2 py-1 border rounded">
              Settings
            </button>
          </div>
        </header>
      );
}

export default Topbar
