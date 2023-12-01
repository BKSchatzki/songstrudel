"use client";

import { useState, useEffect } from "react";
import { usePreventAutoZoom } from "@hooks/usePreventAutoZoom";
import { signIn, getProviders } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
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
  handleCopy,
  editSuccess,
  copySuccess,
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
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
    "text-blue-500",
    "text-purple-500",
    "text-pink-500",
  ];
  const darkTextColors = [
    "text-red-950",
    "text-orange-950",
    "text-yellow-950",
    "text-green-950",
    "text-blue-950",
    "text-purple-950",
    "text-pink-950",
  ];
  const textBgColors = [
    "bg-red-950",
    "bg-orange-950",
    "bg-yellow-950",
    "bg-green-950",
    "bg-blue-950",
    "bg-purple-950",
    "bg-pink-950",
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
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const loadProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    loadProviders();
  }, []);

  usePreventAutoZoom();

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
        textBgColors={textBgColors}
        shadowColors={shadowColors}
      />
      {(isCreator || isNewArrangement) && (
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
      )}
      <Section
        arrangement={arrangement}
        setArrangement={setArrangement}
        setArrangementAndStore={setArrangementAndStore}
        isCreator={isCreator}
        isNewArrangement={isNewArrangement}
        disabled={!isCreator && !isNewArrangement}
        newSection={newSection}
        bgColors={bgColors}
        shadowColors={shadowColors}
        textColors={textColors}
        darkTextColors={darkTextColors}
      />
      <div className="mt-8 grid grid-cols-2 items-center justify-center gap-4 px-7 sm:justify-end sm:px-11">
        {/* <Link
          href="/"
          className="rounded-sm px-2 py-1 text-xs opacity-50 sm:text-base"
        >
          Back
        </Link> */}
        {!isNewArrangement && (
          <button
            type="button"
            onClick={handleCopy}
            disabled={copySuccess}
            className={`col-span-2 rounded-sm bg-gradient-to-r from-green-500 to-teal-500 px-3 py-1.5 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-500 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:text-base ${
              copySuccess &&
              "translate-y-0.5 scale-95 cursor-default shadow-none brightness-50"
            }`}
          >
            {copySuccess ? "Successfully Copied" : "Copy URL to Clipboard"}
          </button>
        )}
        {isCreator && !isNewArrangement && isUserLoggedIn && (
          <>
            <button
              type="button"
              onClick={handleDeleteClick}
              className={`col-span-1 rounded-sm bg-gradient-to-r from-rose-600 to-orange-600 px-3 py-1.5 text-sm font-semibold shadow-sm shadow-red-600 ring-1 ring-red-600 ring-offset-0 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:text-base ${
                confirmDelete
                  ? "text-slate-950 brightness-125"
                  : "bg-clip-text text-transparent"
              }`}
            >
              {confirmDelete ? `Confirm (${countdown})` : "Delete"}
            </button>
            <button
              type="submit"
              disabled={saving || editSuccess}
              className={`col-span-1 rounded-sm bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1.5 text-sm font-semibold text-slate-950 shadow-sm shadow-amber-400 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:text-base ${
                (editSuccess || saving) &&
                "translate-y-0.5 scale-95 cursor-default shadow-none brightness-50"
              }`}
            >
              {saving ? "Updating" : editSuccess ? "Updated" : "Update"}
            </button>
          </>
        )}
        {isNewArrangement && isUserLoggedIn ? (
          <button
            type="submit"
            disabled={saving}
            className="col-span-2 col-start-1 rounded-sm bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-1.5 text-sm font-semibold shadow-sm shadow-indigo-500 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:text-base"
          >
            {saving ? "Creating" : "Create"}
          </button>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="col-span-2 flex items-center justify-center gap-2 rounded-sm bg-[#4752c4] px-3 py-1.5 text-sm font-semibold text-slate-100 shadow-sm shadow-[#4752c4] transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:text-base"
            >
              <Image
                src="/assets/images/discord-logo.svg"
                alt="Discord Logo"
                width={25}
                height={25}
              />
              Sign In to Save
            </button>
          ))
        )}
      </div>
    </form>
  );
};

export default Arrangement;
