const SectionName = ({
  arrangement,
  setArrangementAndStore,
  isCreator,
  isNewArrangement,
  disabled,
  section,
  sectionIndex,
}) => {
  return (
    <label
      className={isCreator || isNewArrangement ? "col-span-4" : "col-span-6"}
    >
      <span className="hidden">Section Name</span>
      <input
        type="text"
        value={section.name}
        onChange={(e) => {
          const updatedSections = [...arrangement.sections];
          updatedSections[sectionIndex].name = e.target.value;
          setArrangementAndStore(
            {
              ...arrangement,
              sections: updatedSections,
            },
            isNewArrangement,
          );
        }}
        maxLength={32}
        placeholder="The section's name ~"
        required
        className="w-full bg-slate-950 bg-opacity-50 px-6 py-3 text-center text-sm shadow-sm shadow-slate-950/50 outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-lg"
        disabled={disabled}
      />
    </label>
  );
};

export default SectionName;
