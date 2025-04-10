export const Spinner = ({ className }) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`w-8 h-8 border-t-2 border-b-2 border-emerald-500 rounded-full animate-spin ${className}`}></div>
    </div>
  );
};
