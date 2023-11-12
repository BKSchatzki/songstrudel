"use client";

import Link from "next/link";
import ArrangementTitle from "./ArrangementTitle";
import ArrangementDescription from "./Arrangement.Description";
import ArrangementInstruments from "./ArrangementInstruments";
import SectionAdd from "./SectionAdd";
import Section from "./Section";

const Arrangement = ({ arrangement, setArrangement, saving, handleSubmit }) => {
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

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xs sm:max-w-lg">
      <ArrangementTitle
        arrangement={arrangement}
        setArrangement={setArrangement}
      />
      <ArrangementDescription
        arrangement={arrangement}
        setArrangement={setArrangement}
      />
      <ArrangementInstruments
        arrangement={arrangement}
        setArrangement={setArrangement}
        textColors={textColors}
        shadowColors={shadowColors}
      />
      <SectionAdd
        onClick={() => {
          const updatedSections = [...arrangement.sections];
          updatedSections.unshift(newSection);
          setArrangement({
            ...arrangement,
            sections: updatedSections,
          });
        }}
      />
      <Section
        arrangement={arrangement}
        setArrangement={setArrangement}
        newSection={newSection}
        bgColors={bgColors}
        shadowColors={shadowColors}
      />
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
  );
};

export default Arrangement;
