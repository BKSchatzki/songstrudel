"use client";

import { useState } from "react";

const Cell = ({ initialValue, cellAppearance }) => {
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
      className={`h-6 w-[14.2857%] cursor-pointer bg-slate-100 text-transparent ${cellAppearance[currentCellAppearance]}`}
    />
  );
};

export default Cell;
