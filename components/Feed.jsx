"use client";

import { useState, useEffect } from "react";
import ArrangementCard from "./ArrangementCard";

const ArrangementCardList = ({ data }) => {
  return (
    <div className="mt-24 flex flex-wrap items-start justify-center gap-8">
      {data.map((arrangement) => (
        <ArrangementCard key={arrangement._id} arrangement={arrangement} />
      ))}
    </div>
  );
};

export const dynamic = "force-dynamic";
export const revalidate = 60;

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [arrangements, setArrangements] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchArrangements = async () => {
      const res = await fetch("/api/arrangement", { cache: "no-store" });
      const data = await res.json();
      setArrangements(data);
    };
    fetchArrangements();
  }, []);

  return (
    <section className="mt-12 w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-4 flex flex-col items-center justify-center"
      >
        <label className="flex w-11/12 max-w-3xl flex-row items-center justify-between rounded-sm bg-slate-950 bg-opacity-50 px-6 py-3 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter placeholder:opacity-50 focus-within:brightness-150">
          <span className="hidden">Name</span>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="Search arrangements ~"
            className="w-full bg-transparent text-center text-sm outline-none placeholder:opacity-50 sm:text-lg"
          />
        </label>
      </form>

      <ArrangementCardList data={arrangements} />
    </section>
  );
};

export default Feed;
