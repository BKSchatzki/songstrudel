import { Plus } from "lucide-react";

const SectionButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      value="Add Section"
      onClick={onClick}
      className={`mx-auto mb-4 flex w-5/6 items-center justify-center bg-slate-950 bg-opacity-30 py-0.5 shadow-md shadow-slate-950/30 transition duration-75 ${
        !disabled && "active:translate-y-0.5 active:scale-95 active:shadow-none"
      } sm:py-2`}
      disabled={disabled}
    >
      <Plus className="w-4 stroke-slate-100 sm:w-6" />
    </button>
  );
};

export default SectionButton;
