import SectionName from "./SectionName";
import SectionAdd from "./SectionAdd";
import SectionDelete from "./SectionDelete";
import SectionCell from "./SectionCell";
import SectionNotes from "./SectionNotes";

const Section = ({
  arrangement,
  setArrangement,
  newSection,
  bgColors,
  shadowColors,
}) => {
  return (
    <>
      {arrangement.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex flex-col gap-2">
          {/* SECTION TOP BAR */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            <SectionName
              arrangement={arrangement}
              section={section}
              sectionIndex={sectionIndex}
              setArrangement={setArrangement}
            />
            {/* DELETE CURRENT SECTION */}
            <SectionDelete
              onClick={() => {
                const updatedSections = arrangement.sections.filter(
                  (_, i) => i !== sectionIndex,
                );
                setArrangement({
                  ...arrangement,
                  sections: updatedSections,
                });
              }}
            />
          </div>
          {/* SECTION ROWS AND CELLS */}
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
                    // Pass down the rows of cells
                    cellData={arrangement.sections[sectionIndex].rows}
                    // Pass down method with matrix indeces and newValue parameter to be altered inside component
                    updateCellAppearance={(rowIndex, cellIndex, newValue) => {
                      const updatedSections = [...arrangement.sections];
                      updatedSections[sectionIndex].rows[rowIndex][cellIndex] =
                        newValue;
                      setArrangement({
                        ...arrangement,
                        sections: updatedSections,
                      });
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* SECTION NOTES */}
          <SectionNotes
            arrangement={arrangement}
            section={section}
            sectionIndex={sectionIndex}
            setArrangement={setArrangement}
          />
          {/* ADD SECTION AFTER CURRENT */}
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
              setArrangement({
                ...arrangement,
                sections: updatedSectionsWithKeys,
              });
            }}
          />
        </div>
      ))}
    </>
  );
};

export default Section;
