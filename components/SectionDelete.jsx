import { Trash } from 'lucide-react';

const SectionButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      value="Delete Section"
      onClick={onClick}
      className={`col-span-1 flex items-center justify-center bg-slate-950 bg-opacity-30 shadow-sm shadow-slate-950/30 transition duration-75 ${
        !disabled && "active:translate-y-0.5 active:scale-95 active:shadow-none"
      }`}
      disabled={disabled}
    >
      <Trash className="w-4 stroke-slate-100 sm:w-5" />
    </button>
  );
};

export default SectionButton;
