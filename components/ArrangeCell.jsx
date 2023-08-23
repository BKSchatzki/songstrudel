"use client";

import { useEffect, useState } from "react";

const ArrangeCell = ({
  bgColors,
  shadowColors,
  rowIndex,
  cellIndex,
  cellData,
  updateCellAppearance,
}) => {
  const [cellAppearance, setCellAppearance] = useState([
    "bg-opacity-5",
    "bg-opacity-20",
    "bg-opacity-60",
    "bg-opacity-100 brightness-150",
  ]);

  const [currentCellAppearance, setCurrentCellAppearance] = useState(
    cellData[rowIndex][cellIndex],
  );

  useEffect(() => {
    setCurrentCellAppearance(cellData[rowIndex][cellIndex]);
  }, [cellData, rowIndex, cellIndex]);

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
      className={`w-[14.2857%] cursor-pointer text-transparent shadow-sm backdrop-blur-md backdrop-filter transition duration-75 active:translate-y-1 active:scale-95 active:shadow-none ${
        bgColors[cellIndex]
      } ${shadowColors[cellIndex]} ${cellAppearance[currentCellAppearance]} ${
        rowIndex === 1 ? "h-11 sm:h-[4.5rem]" : "h-5 sm:h-8"
      }`}
    />
  );
};

export default ArrangeCell;
