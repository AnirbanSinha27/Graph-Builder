const LeftRail = () => {
  return (
    <aside className="w-14 border-r flex flex-col items-center py-4 gap-4 bg-white">
      <RailItem label="Apps" />
      <RailItem label="Graph" />
      <RailItem label="Settings" />
    </aside>
  );
};

function RailItem({ label }: { label: string }) {
  return (
    <div
      className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300
                 flex items-center justify-center cursor-pointer
                 text-xs font-medium text-gray-600"
      title={label}
    >
      {label[0]}
    </div>
  );
}

export default LeftRail;
