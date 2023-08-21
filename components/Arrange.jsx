"use client";

import Link from "next/link";
import { useState } from "react";
import Cell from "./Cell";

const Arrange = ({ arrangement, setArrangement, saving, handleSubmit }) => {
  const textColors = [
    "bg-red-950 text-red-500",
    "bg-orange-950 text-orange-500",
    "bg-yellow-950 text-yellow-500",
    "bg-green-950 text-green-500",
    "bg-blue-950 text-blue-500",
    "bg-purple-950 text-purple-500",
    "bg-pink-950 text-pink-500",
  ];
  const bgColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const [cellAppearance, setCellAppearance] = useState([
    "bg-opacity-5",
    "bg-opacity-20",
    "bg-opacity-60",
    "bg-opacity-100 brightness-150",
  ]);
  const [currentCellAppearance, setCurrentCellAppearance] = useState(0);

  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center text-center">
      {/* ------ */}
      {/* Header */}
      {/* ------ */}
      <h1 className="mx-4 max-w-xl text-2xl font-bold sm:text-3xl">
        Letting You{" "}
        <span className="bg-gradient-to-t from-red-500 to-amber-500 bg-clip-text text-transparent">
          Cook
        </span>
      </h1>
      {/* --------- */}
      {/* Main Form */}
      {/* --------- */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-xs sm:max-w-lg"
      >
        {/* ----- */}
        {/* Title */}
        {/* ----- */}
        <label className="mb-4 flex flex-col rounded-sm bg-slate-950 bg-opacity-50 backdrop-blur-md backdrop-filter focus-within:brightness-150">
          <span className="px-3 py-1.5 text-left text-xs font-semibold sm:text-base">
            Title
          </span>
          <input
            type="text"
            value={arrangement.title}
            maxLength={48}
            onChange={(e) =>
              setArrangement({ ...arrangement, title: e.target.value })
            }
            placeholder="Your arrangement's name ~"
            required
            className="w-full bg-transparent px-6 pb-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
          />
        </label>
        {/* ----------- */}
        {/* Description */}
        {/* ----------- */}
        <label className="mb-4 flex flex-col rounded-sm bg-slate-950 bg-opacity-50 pb-3 backdrop-blur-md backdrop-filter focus-within:brightness-150">
          <span className="px-3 py-1.5 text-left text-xs font-semibold sm:text-base">
            Description
          </span>
          <textarea
            type="text"
            value={arrangement.description}
            rows={6}
            maxLength={240}
            onChange={(e) =>
              setArrangement({ ...arrangement, description: e.target.value })
            }
            placeholder="A quick overview ~"
            required
            className="w-full resize-none bg-transparent px-6 pb-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
          />
        </label>
        {/* -------------- */}
        {/* Instrument Map */}
        {/* -------------- */}
        <div className="mb-4">
          {arrangement.instruments.map((element, index) => (
            <label>
              <span className="hidden">Instruments</span>
              <input
                type="text"
                value={element}
                onChange={(e) => {
                  const updatedInstruments = [...arrangement.instruments];
                  updatedInstruments[index] = e.target.value;
                  setArrangement({
                    ...arrangement,
                    instruments: updatedInstruments,
                  });
                }}
                maxLength={4}
                placeholder={`Ins${index + 1}`}
                className={`w-[14.2857%] bg-slate-950 bg-opacity-50 px-0.5 py-2 text-center text-xs font-semibold outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-200 sm:text-base ${textColors[index]}`}
              />
            </label>
          ))}
        </div>
        {/* -------- */}
        {/* Sections */}
        {/* -------- */}
        <div className="">
          {arrangement.sections.map((section, index) => (
            <div key={index} className="mb-4 flex flex-col ">
              {/* Name Input */}
              <label>
                <span className="hidden">Section Name</span>
                <input
                  type="text"
                  value={section.name}
                  onChange={(e) => {
                    const updatedSections = [...arrangement.sections];
                    updatedSections[index].name = e.target.value;
                    setArrangement({
                      ...arrangement,
                      sections: updatedSections,
                    });
                  }}
                  maxLength={24}
                  placeholder="Section"
                  required
                  className="w-full bg-slate-950 bg-opacity-50 px-3 py-1.5 text-left text-xs font-semibold outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-base"
                />
              </label>
              {/* Notes Textarea */}
              <label>
                <span className="hidden">Section Notes</span>
                <textarea
                  type="text"
                  value={section.notes}
                  rows={5}
                  maxLength={192}
                  onChange={(e) => {
                    const updatedSections = [...arrangement.sections];
                    updatedSections[index].notes = e.target.value;
                    setArrangement({
                      ...arrangement,
                      sections: updatedSections,
                    });
                  }}
                  placeholder="Notes"
                  required
                  className="w-full resize-none bg-slate-950 bg-opacity-50 px-6 text-xs outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-base"
                />
              </label>
              {/* Rows here */}
              <div className="flex flex-col gap-1">
                {section.rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-row flex-nowrap gap-1"
                  >
                    {row.map((cell, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        initialValue={cell}
                        cellAppearance={cellAppearance}
                        bgColors={bgColors}
                        cellIndex={cellIndex}
                        rowIndex={rowIndex}
                        updateCellAppearance={(
                          rowIndex,
                          cellIndex,
                          newValue,
                        ) => {
                          const updatedSections = [...arrangement.sections];
                          updatedSections[rowIndex].rows[cellIndex] = newValue;
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
            </div>
          ))}
        </div>
        {/* ------------------ */}
        {/* Submission Buttons */}
        {/* ------------------ */}
        <div className="mt-8 flex items-center justify-end gap-8">
          <Link
            href="/"
            className="rounded-sm px-2 py-1 text-xs opacity-50 sm:text-base"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="w-20 rounded-sm bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1.5 text-sm font-semibold text-slate-950 sm:w-24 sm:text-lg"
          >
            {saving ? "Saving ~" : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Arrange;
