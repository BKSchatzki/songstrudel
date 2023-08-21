"use client";

import { useState } from "react";

const Cell = ({
  initialValue,
  cellAppearance,
  bgColors,
  cellIndex,
  rowIndex,
}) => {
  const [currentCellAppearance, setCurrentCellAppearance] =
    useState(initialValue);

  const handleClick = () => {
    setCurrentCellAppearance(
      (prevIndex) => (prevIndex + 1) % cellAppearance.length,
    );
  };

  return (
    <input
      type="button"
      value={currentCellAppearance}
      onClick={handleClick}
      className={`w-[14.2857%] cursor-pointer bg-slate-100 text-transparent ${
        rowIndex === 1 ? "h-12 sm:h-[4.5rem]" : "h-4 sm:h-6"
      } ${bgColors[cellIndex]} ${cellAppearance[currentCellAppearance]}`}
    />
  );
};

export default Cell;
