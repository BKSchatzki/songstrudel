"use client";

import { useEffect, useState } from "react";

const SectionCell = ({
  bgColors,
  shadowColors,
  textColors,
  instrument,
  rowIndex,
  cellIndex,
  cellData,
  updateCellAppearance,
  disabled,
}) => {
  const [cellAppearance, setCellAppearance] = useState([
    `bg-opacity-5`,
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
      value={instrument}
      onClick={handleClick}
      className={`w-[14.2857%] text-xs shadow-sm backdrop-blur-md backdrop-filter transition duration-75 sm:text-base ${
        !disabled && "active:translate-y-0.5 active:scale-95 active:shadow-none"
      } ${bgColors[cellIndex]} ${shadowColors[cellIndex]} ${
        cellAppearance[currentCellAppearance]
      } ${
        rowIndex === 1
          ? `h-11 sm:h-[4.5rem] ${textColors[cellIndex]}`
          : "h-5 text-transparent sm:h-8"
      }`}
      disabled={disabled}
    />
  );
};

export default SectionCell;
