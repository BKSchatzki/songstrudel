"use client";

import { useEffect, useState } from "react";

const SectionCell = ({
  bgColors,
  shadowColors,
  rowIndex,
  cellIndex,
  cellData,
  updateCellAppearance,
}) => {
  // Define array of appearances for state to cycle through
  const [cellAppearance, setCellAppearance] = useState([
    "bg-opacity-5",
    "bg-opacity-20",
    "bg-opacity-60",
    "bg-opacity-100 brightness-150",
  ]);

  // Define current appearance as the index of matrix
  const [currentCellAppearance, setCurrentCellAppearance] = useState(
    cellData[rowIndex][cellIndex],
  );

  // Set appearance to change whenever sections are altered, created, destroyed, or moved in sections array
  useEffect(() => {
    setCurrentCellAppearance(cellData[rowIndex][cellIndex]);
  }, [cellData, rowIndex, cellIndex]);

  // Cycle through cellAppearance array and pass newValue (index of cellAppearance) into updatedSections of parent
  const handleClick = () => {
    const newValue = (currentCellAppearance + 1) % cellAppearance.length;
    setCurrentCellAppearance(newValue);
    updateCellAppearance(rowIndex, cellIndex, newValue);
  };

  return (
    <input
      type="button"
      value={currentCellAppearance}
      onClick={handleClick}
      // Colors determined by position in each row, height of middle row larger
      className={`w-[14.2857%] cursor-pointer text-transparent shadow-sm backdrop-blur-md backdrop-filter transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none ${
        bgColors[cellIndex]
      } ${shadowColors[cellIndex]} ${cellAppearance[currentCellAppearance]} ${
        rowIndex === 1 ? "h-11 sm:h-[4.5rem]" : "h-5 sm:h-8"
      }`}
    />
  );
};

export default SectionCell;
