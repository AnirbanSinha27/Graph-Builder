import { useState } from 'react';

const LeftRail = () => {
  const railItems = [
    { label: "Apps", iconPath: "/app.png" },
    { label: "Graph", iconPath: "/graph.jpg" },
    { label: "Settings", iconPath: "/settings.png" },
  ];

  return (
    <aside className="w-14 border-r flex flex-col items-center py-4 gap-4 bg-gray-950 border-sidebar-border">
      {railItems.map((item) => (
        <RailItem key={item.label} label={item.label} iconPath={item.iconPath} />
      ))}
    </aside>
  );
};

function RailItem({ label, iconPath }: { label: string; iconPath: string }) {
  const [iconError, setIconError] = useState(false);

  return (
    <div
      className="w-8 h-8 rounded bg-sidebar-accent hover:bg-sidebar-accent/80
                 flex items-center justify-center cursor-pointer
                 transition-colors"
      title={label}
    >
      {!iconError ? (
        <img 
          src={iconPath} 
          alt={label}
          className="w-5 h-5"
          onError={() => setIconError(true)}
        />
      ) : (
        <span className="text-xs font-medium text-sidebar-foreground">
          {label[0]}
        </span>
      )}
    </div>
  );
}

export default LeftRail;
