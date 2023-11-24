import TextareaAutosize from "react-textarea-autosize";

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
      <TextareaAutosize
        type="text"
        value={section.notes}
        minRows={2}
        maxRows={24}
        maxLength={512}
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
        className="w-full resize-none overflow-hidden bg-slate-950 bg-opacity-50 px-6 py-3 text-base shadow-sm shadow-slate-950/50 outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-lg"
        disabled={disabled}
      />
    </label>
  );
};

export default SectionNotes;
