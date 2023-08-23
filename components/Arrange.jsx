"use client";

import Link from "next/link";
import { useState } from "react";
import ArrangeCell from "./ArrangeCell";
import { Plus, Trash } from "lucide-react";

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
  const shadowColors = [
    "shadow-red-500/50",
    "shadow-orange-500/50",
    "shadow-yellow-500/50",
    "shadow-green-500/50",
    "shadow-blue-500/50",
    "shadow-purple-500/50",
    "shadow-pink-500/50",
  ];

  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center text-center">
      {/* ------ */}
      {/* Header */}
      {/* ------ */}
      <h1 className="mx-4 mt-4 max-w-xl text-2xl font-bold sm:text-3xl">
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
        <label className="mb-4 flex flex-col rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter focus-within:brightness-150">
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
        <label className="mb-4 flex flex-col rounded-sm bg-slate-950 bg-opacity-50 pb-3 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter focus-within:brightness-150">
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
        <div className="mb-4 flex flex-grow gap-1 sm:gap-2">
          {arrangement.instruments.map((instrument, instrumentIndex) => (
            <label key={instrumentIndex} className="w-[14.2857%]">
              <span className="hidden">Instruments</span>
              <input
                type="text"
                value={instrument}
                onChange={(e) => {
                  const updatedInstruments = [...arrangement.instruments];
                  updatedInstruments[instrumentIndex] = e.target.value;
                  setArrangement({
                    ...arrangement,
                    instruments: updatedInstruments,
                  });
                }}
                maxLength={4}
                placeholder={`Ins${instrumentIndex + 1}`}
                className={`w-full bg-opacity-50 px-0.5 py-2 text-center text-xs font-semibold shadow-sm outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-200 sm:text-base ${textColors[instrumentIndex]} ${shadowColors[instrumentIndex]} placeholder:${textColors[instrumentIndex]}`}
              />
            </label>
          ))}
        </div>
        {/* ----------------- */}
        {/* Add First Section */}
        {/* ----------------- */}
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
            updatedSections.unshift(newSection);
            setArrangement({
              ...arrangement,
              sections: updatedSections,
            });
          }}
          className="mx-auto mb-4 flex w-5/6 items-center justify-center bg-slate-950 bg-opacity-30 py-0.5 shadow-md shadow-slate-950/30 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:py-2"
        >
          <Plus className="w-4 stroke-slate-100 sm:w-6" />
        </button>
        {/* -------- */}
        {/* Sections */}
        {/* -------- */}
        <div className="">
          {arrangement.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4 flex flex-col gap-2">
              {/* Name Input */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                <label className="col-span-6">
                  <span className="hidden">Section Name</span>
                  <input
                    type="text"
                    value={section.name}
                    onChange={(e) => {
                      const updatedSections = [...arrangement.sections];
                      updatedSections[sectionIndex].name = e.target.value;
                      setArrangement({
                        ...arrangement,
                        sections: updatedSections,
                      });
                    }}
                    maxLength={24}
                    placeholder="Section"
                    required
                    className="w-full bg-slate-950 bg-opacity-50 px-6 py-3 text-center text-xs font-semibold shadow-sm shadow-slate-950/50 outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-base"
                  />
                </label>
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
              {/* Rows here */}
              <div className="flex flex-col gap-1 sm:gap-2">
                {section.rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-row flex-nowrap gap-1 sm:gap-2"
                  >
                    {row.map((cell, cellIndex) => (
                      <ArrangeCell
                        key={cellIndex}
                        bgColors={bgColors}
                        shadowColors={shadowColors}
                        rowIndex={rowIndex}
                        cellIndex={cellIndex}
                        cellData={arrangement.sections[sectionIndex].rows}
                        updateCellAppearance={(
                          rowIndex,
                          cellIndex,
                          newValue,
                        ) => {
                          const updatedSections = [...arrangement.sections];
                          updatedSections[sectionIndex].rows[rowIndex][
                            cellIndex
                          ] = newValue;
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
                    updatedSections[sectionIndex].notes = e.target.value;
                    setArrangement({
                      ...arrangement,
                      sections: updatedSections,
                    });
                  }}
                  placeholder="Section notes go here ~"
                  required
                  className="w-full resize-none bg-slate-950 bg-opacity-50 px-6 py-3 text-xs shadow-sm shadow-slate-950/50 outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-150 sm:text-base"
                />
              </label>
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
            className="w-20 rounded-sm bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1.5 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-400 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:w-24 sm:text-lg"
          >
            {saving ? "Saving ~" : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Arrange;
