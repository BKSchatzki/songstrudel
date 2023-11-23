"use client";

import { useState } from "react";
import Link from "next/link";
import ArrangementTitle from "./ArrangementTitle";
import ArrangementDescription from "./Arrangement.Description";
import ArrangementInstruments from "./ArrangementInstruments";
import SectionAdd from "./SectionAdd";
import Section from "./Section";
import { set } from "mongoose";

const Arrangement = ({
  arrangement,
  setArrangement,
  isCreator,
  isNewArrangement,
  isUserLoggedIn,
  saving,
  handleSubmit,
  handleDelete,
}) => {
  const newSection = {
    name: "",
    notes: "",
    rows: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
  };
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

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleDeleteClick = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      let timer = countdown;
      const intervalId = setInterval(() => {
        timer--;
        setCountdown(timer);
        if (timer === 0) {
          clearInterval(intervalId);
          setConfirmDelete(false);
          setCountdown(3);
        }
      }, 1000);
    } else {
      handleDelete();
    }
  };

  const setArrangementAndStore = (newArrangement) => {
    setArrangement(newArrangement);
    if (isNewArrangement) {
      window.localStorage.setItem(
        "newArrangement",
        JSON.stringify(newArrangement),
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 w-full max-w-xs sm:mt-8 sm:max-w-lg"
    >
      <ArrangementTitle
        arrangement={arrangement}
        setArrangement={setArrangement}
        setArrangementAndStore={setArrangementAndStore}
        isNewArrangement={isNewArrangement}
        disabled={!isCreator && !isNewArrangement}
      />
      <ArrangementDescription
        arrangement={arrangement}
        setArrangement={setArrangement}
        setArrangementAndStore={setArrangementAndStore}
        isNewArrangement={isNewArrangement}
        disabled={!isCreator && !isNewArrangement}
      />
      <ArrangementInstruments
        arrangement={arrangement}
        setArrangement={setArrangement}
        setArrangementAndStore={setArrangementAndStore}
        isNewArrangement={isNewArrangement}
        disabled={!isCreator && !isNewArrangement}
        textColors={textColors}
        shadowColors={shadowColors}
      />
      <SectionAdd
        onClick={() => {
          const updatedSections = [...arrangement.sections];
          updatedSections.unshift(newSection);
          setArrangementAndStore(
            {
              ...arrangement,
              sections: updatedSections,
            },
            isNewArrangement,
          );
        }}
        disabled={!isCreator && !isNewArrangement}
      />
      <Section
        arrangement={arrangement}
        setArrangement={setArrangement}
        setArrangementAndStore={setArrangementAndStore}
        isNewArrangement={isNewArrangement}
        disabled={!isCreator && !isNewArrangement}
        newSection={newSection}
        bgColors={bgColors}
        shadowColors={shadowColors}
      />
      <div className="mt-8 flex items-center justify-center gap-8 sm:justify-end">
        {/* <Link
          href="/"
          className="rounded-sm px-2 py-1 text-xs opacity-50 sm:text-base"
        >
          Back
        </Link> */}
        {isCreator && !isNewArrangement && isUserLoggedIn && (
          <>
            <button
              type="button"
              onClick={handleDeleteClick}
              className={`w-[7.5rem] rounded-sm bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text px-3 py-1.5 text-sm font-semibold text-slate-950 text-transparent shadow-sm shadow-red-600 ring-1 ring-red-600 ring-offset-0 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:w-36 sm:text-lg`}
            >
              {confirmDelete ? `Confirm (${countdown})` : "Delete"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="w-[7.5rem] rounded-sm bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1.5 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-400 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:w-36 sm:text-lg"
            >
              {saving ? "Updating" : "Update"}
            </button>
          </>
        )}
        {isNewArrangement && isUserLoggedIn && (
          <button
            type="submit"
            disabled={saving}
            className="w-3/5 rounded-sm bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1.5 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-400 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:w-36 sm:text-lg"
          >
            {saving ? "Creating" : "Create"}
          </button>
        )}
      </div>
    </form>
  );
};

export default Arrangement;
