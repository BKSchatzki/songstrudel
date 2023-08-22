"use client";

import { useState } from "react";

const ArrangeCell = ({
  bgColors,
  cellIndex,
  rowIndex,
  updateCellAppearance,
}) => {
  const [cellAppearance, setCellAppearance] = useState([
    "bg-opacity-5",
    "bg-opacity-20",
    "bg-opacity-60",
    "bg-opacity-100 brightness-150",
  ]);

  const [currentCellAppearance, setCurrentCellAppearance] = useState(0);

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
      className={`w-[14.2857%] cursor-pointer text-transparent sm:h-[4.5rem] ${
        bgColors[cellIndex]
      } ${cellAppearance[currentCellAppearance]} ${
        rowIndex === 1 ? "sm:h[4.5rem] h-11" : "h-5 sm:h-8"
      }`}
    />
  );
};

export default ArrangeCell;
