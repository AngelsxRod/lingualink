interface TagButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const TagButton = ({ label, active = false, onClick }: TagButtonProps) => {
  const baseClasses =
    "px-3 py-1 rounded-lg cursor-pointer select-none flex items-center justify-center text-white font-semibold text-base transition-all duration-150 border-b-[1px] active:translate-y-[2px] active:[box-shadow:0_0px_0_0_#2d9f74,0_0px_0_0_#56d68f] active:border-b-[0px]";

  // Agregar un box-shadow más tenue para los estados inactivos
  const activeClasses =
    "bg-emerald-500 border-emerald-400 [box-shadow:0_6px_0_0_#2d9f74,0_8px_0_0_#56d68f] ";
  const inactiveClasses =
    "bg-gray-500 border-gray-600 [box-shadow:0_2px_0_0_#333333,0_4px_0_0_#444444] ";

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {label}
    </div>
  );
};
