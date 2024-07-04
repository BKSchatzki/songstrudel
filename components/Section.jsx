'use client';

import {
  ClipboardPaste,
  Copy,
} from 'lucide-react';

import SectionAdd from './SectionAdd';
import SectionCell from './SectionCell';
import SectionDelete from './SectionDelete';
import SectionName from './SectionName';
import SectionNotes from './SectionNotes';

const Section = ({
  arrangement,
  setArrangementAndStore,
  isCreator,
  isNewArrangement,
  disabled,
  newSection,
  bgColors,
  shadowColors,
  textColors,
  darkTextColors,
}) => {
  return (
    <>
      {arrangement.sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="mt-4 flex flex-col gap-2"
        >
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            <button
              type="button"
              value="Copy Section"
              onClick={() => {
                localStorage.setItem(
                  'storedSection',
                  JSON.stringify(arrangement.sections[sectionIndex])
                );
              }}
              className="col-span-1 flex items-center justify-center bg-slate-950 bg-opacity-30 shadow-sm shadow-slate-950/30 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none"
            >
              <Copy className="w-4 stroke-slate-100 sm:w-5" />
            </button>
            {(isCreator || isNewArrangement) && (
              <button
                type="button"
                value="Paste Section"
                onClick={() => {
                  const storedSection = JSON.parse(localStorage.getItem('storedSection'));
                  if (storedSection) {
                    const updatedSections = arrangement.sections.map(
                      (sectionToStore, sectionToStoreIndex) =>
                        sectionToStoreIndex === sectionIndex ? storedSection : sectionToStore
                    );
                    setArrangementAndStore(
                      {
                        ...arrangement,
                        sections: updatedSections,
                      },
                      isNewArrangement
                    );
                  }
                }}
                className={`col-span-1 flex items-center justify-center bg-slate-950 bg-opacity-30 shadow-sm shadow-slate-950/30 transition duration-75 ${
                  !disabled && 'active:translate-y-0.5 active:scale-95 active:shadow-none'
                }`}
                disabled={disabled || !localStorage.getItem('storedSection')}
              >
                <ClipboardPaste className="w-4 stroke-slate-100 sm:w-5" />
              </button>
            )}
            <SectionName
              arrangement={arrangement}
              setArrangementAndStore={setArrangementAndStore}
              isCreator={isCreator}
              isNewArrangement={isNewArrangement}
              disabled={disabled}
              section={section}
              sectionIndex={sectionIndex}
            />
            {(isCreator || isNewArrangement) && (
              <SectionDelete
                onClick={() => {
                  const updatedSections = arrangement.sections.filter((_, i) => i !== sectionIndex);
                  setArrangementAndStore(
                    {
                      ...arrangement,
                      sections: updatedSections,
                    },
                    isNewArrangement
                  );
                }}
                disabled={disabled}
              />
            )}
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
                    textColors={textColors}
                    darkTextColors={darkTextColors}
                    instrument={arrangement.instruments[cellIndex]}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    cellData={arrangement.sections[sectionIndex].rows}
                    updateCellAppearance={(rowIndex, cellIndex, newValue) => {
                      const updatedSections = [...arrangement.sections];
                      updatedSections[sectionIndex].rows[rowIndex][cellIndex] = newValue;
                      setArrangementAndStore(
                        {
                          ...arrangement,
                          sections: updatedSections,
                        },
                        isNewArrangement
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
            setArrangementAndStore={setArrangementAndStore}
            isNewArrangement={isNewArrangement}
            disabled={disabled}
            section={section}
            sectionIndex={sectionIndex}
          />
          {isCreator || isNewArrangement ? (
            <SectionAdd
              onClick={() => {
                const updatedSections = [...arrangement.sections];
                const currentIndex = sectionIndex;
                updatedSections.splice(currentIndex + 1, 0, newSection);
                const updatedSectionsWithKeys = updatedSections.map((section, i) => ({
                  ...section,
                  key: i,
                }));
                console.log(updatedSectionsWithKeys);
                setArrangementAndStore(
                  {
                    ...arrangement,
                    sections: updatedSectionsWithKeys,
                  },
                  isNewArrangement
                );
              }}
              disabled={disabled}
            />
          ) : (
            ''
          )}
        </div>
      ))}
    </>
  );
};

export default Section;
