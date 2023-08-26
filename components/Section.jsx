import SectionName from "./SectionName";
import SectionNotes from "./SectionNotes";
import SectionCell from "./SectionCell";
import { Plus, Trash } from "lucide-react";

const Section = ({
  arrangement,
  setArrangement,
  textColors,
  bgColors,
  shadowColors,
}) => {
  return (
    <div className="">
      {arrangement.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4 flex flex-col gap-2">
          {/* Name Input */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            <SectionName
              arrangement={arrangement}
              section={section}
              setArrangement={setArrangement}
            />
            {/* Delete Section Button */}
            <button
              type="button"
              value="Delete Section"
              onClick={() => {
                const updatedSections = arrangement.sections.filter(
                  (_, i) => i !== sectionIndex,
                );
                setArrangement({
                  ...arrangement,
                  sections: updatedSections,
                });
              }}
              className="col-span-1 flex items-center justify-center bg-slate-950 bg-opacity-30 shadow-sm shadow-slate-950/30 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none"
            >
              <Trash className="w-4 stroke-slate-100 sm:w-5" />
            </button>
          </div>
          {/* --------- */}
          {/* Rows here */}
          {/* --------- */}
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
          {/* ------------- */}
          {/* Section Notes */}
          {/* ------------- */}
          <SectionNotes
            value={section.notes}
            onChange={(e) => {
              const updatedSections = [...arrangement.sections];
              updatedSections[sectionIndex].notes = e.target.value;
              setArrangement({
                ...arrangement,
                sections: updatedSections,
              });
            }}
          />
          {/* Add New Section After Current Button */}
          <button
            type="button"
            value="Add Section"
            onClick={() => {
              const updatedSections = [...arrangement.sections];
              const newSection = {
                name: "",
                notes: "",
                rows: [
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0],
                ],
              };
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
            className="mx-auto flex w-5/6 items-center justify-center bg-slate-950 bg-opacity-30 py-0.5 shadow-md shadow-slate-950/30 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:py-2"
          >
            <Plus className="w-4 stroke-slate-100 sm:w-6" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Section;
