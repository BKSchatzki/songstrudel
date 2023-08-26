const SectionNotes = ({
  arrangement,
  setArrangement,
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
          setArrangement({
            ...arrangement,
            sections: updatedSections,
          });
        }}
        placeholder="Section notes go here ~"
        required
        className="w-full resize-none bg-slate-950 bg-opacity-50 px-6 py-3 text-xs shadow-sm shadow-slate-950/50 outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-base"
      />
    </label>
  );
};

export default SectionNotes;
