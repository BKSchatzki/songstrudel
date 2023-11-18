import SectionName from "./SectionName";
import SectionAdd from "./SectionAdd";
import SectionDelete from "./SectionDelete";
import SectionCell from "./SectionCell";
import SectionNotes from "./SectionNotes";

const Section = ({
  arrangement,
  setArrangement,
  setArrangementAndStore,
  isNewArrangement,
  disabled,
  newSection,
  bgColors,
  shadowColors,
}) => {
  return (
    <>
      {arrangement.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex flex-col gap-2">
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            <SectionName
              arrangement={arrangement}
              setArrangement={setArrangement}
              setArrangementAndStore={setArrangementAndStore}
              isNewArrangement={isNewArrangement}
              disabled={disabled}
              section={section}
              sectionIndex={sectionIndex}
            />
            <SectionDelete
              onClick={() => {
                const updatedSections = arrangement.sections.filter(
                  (_, i) => i !== sectionIndex,
                );
                setArrangementAndStore(
                  {
                    ...arrangement,
                    sections: updatedSections,
                  },
                  isNewArrangement,
                );
              }}
              disabled={disabled}
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            {section.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-row flex-nowrap gap-1 sm:gap-2"
              >
                {row.map((cell, cellIndex) => (
                  <SectionCell
                    key={cellIndex}
                    bgColors={bgColors}
                    shadowColors={shadowColors}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    cellData={arrangement.sections[sectionIndex].rows}
                    updateCellAppearance={(rowIndex, cellIndex, newValue) => {
                      const updatedSections = [...arrangement.sections];
                      updatedSections[sectionIndex].rows[rowIndex][cellIndex] =
                        newValue;
                      setArrangementAndStore(
                        {
                          ...arrangement,
                          sections: updatedSections,
                        },
                        isNewArrangement,
                      );
                    }}
                    disabled={disabled}
                  />
                ))}
              </div>
            ))}
          </div>
          <SectionNotes
            arrangement={arrangement}
            setArrangement={setArrangement}
            setArrangementAndStore={setArrangementAndStore}
            isNewArrangement={isNewArrangement}
            disabled={disabled}
            section={section}
            sectionIndex={sectionIndex}
          />
          <SectionAdd
            onClick={() => {
              const updatedSections = [...arrangement.sections];
              const currentIndex = sectionIndex;
              updatedSections.splice(currentIndex + 1, 0, newSection);
              const updatedSectionsWithKeys = updatedSections.map(
                (section, i) => ({
                  ...section,
                  key: i,
                }),
              );
              console.log(updatedSectionsWithKeys);
              setArrangementAndStore(
                {
                  ...arrangement,
                  sections: updatedSectionsWithKeys,
                },
                isNewArrangement,
              );
            }}
            disabled={disabled}
          />
        </div>
      ))}
    </>
  );
};

export default Section;
