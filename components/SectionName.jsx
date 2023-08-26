"use client";

const SectionName = ({ arrangement, section, setArrangement }) => {
  return (
    <label className="col-span-6">
      <span className="hidden">Section Name</span>
      <input
        type="text"
        value={section.name}
        onChange={(e) => {
          const updatedSections = [...arrangement.sections];
          updatedSections[sectionIndex].name = e.target.value;
          setArrangement({
            ...arrangement,
            sections: updatedSections,
          });
        }}
        maxLength={24}
        placeholder="Section"
        required
        className="w-full bg-slate-950 bg-opacity-50 px-6 py-3 text-center text-xs font-semibold shadow-sm shadow-slate-950/50 outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-base"
      />
    </label>
  );
};

export default SectionName;
