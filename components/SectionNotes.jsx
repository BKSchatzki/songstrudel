const SectionNotes = ({
  arrangement,
  setArrangement,
  setArrangementAndStore,
  isNewArrangement,
  disabled,
  section,
  sectionIndex,
}) => {
  return (
    <label>
      <span className="hidden">Section Notes</span>
      <textarea
        type="text"
        value={section.notes}
        rows={5}
        maxLength={192}
        onChange={(e) => {
          const updatedSections = [...arrangement.sections];
          updatedSections[sectionIndex].notes = e.target.value;
          setArrangementAndStore(
            {
              ...arrangement,
              sections: updatedSections,
            },
            isNewArrangement,
          );
        }}
        placeholder="Section notes go here ~"
        required
        className="w-full resize-none bg-slate-950 bg-opacity-50 px-6 py-3 text-base shadow-sm shadow-slate-950/50 outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-lg"
        disabled={disabled}
      />
    </label>
  );
};

export default SectionNotes;
