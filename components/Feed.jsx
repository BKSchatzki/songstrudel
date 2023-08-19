"use client";

import { useState, useEffect } from "react";
import ArrangementCard from "./ArrangementCard";

const ArrangementCardList = ({ data }) => {
  return (
    <div>
      {data.map((arrangement) => (
        <ArrangementCard key={arrangement._id} arrangement={arrangement} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [arrangements, setArrangements] = useState([]);

  const handleSearchTextChange = (e) => {};

  useEffect(() => {
    const fetchArrangements = async () => {
      const res = await fetch("/api/arrangement");
      const data = await res.json();
      setArrangements(data);
    };
    fetchArrangements();
  }, []);

  return (
    <section className="mt-12">
      <h3 className="mx-4 mb-4 max-w-xl text-xl font-semibold sm:text-2xl">
        Search Arrangements
      </h3>
      <form className="mt-4 flex flex-col items-end justify-center">
        <label className="flex flex-row items-center justify-between rounded-sm bg-slate-950 bg-opacity-50 px-3 py-1.5 backdrop-blur-md backdrop-filter focus-within:brightness-150">
          <span className="w-16 border-0 border-r border-r-slate-100 border-opacity-10 pr-3 text-right text-xs opacity-75 sm:text-base">
            Name
          </span>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder=""
            className="bg-transparent px-3 pl-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
          />
        </label>
        <label className="flex flex-row items-center justify-between rounded-sm bg-slate-950 bg-opacity-50 px-3 py-1.5 backdrop-blur-md backdrop-filter focus-within:brightness-150">
          <span className="w-16 border-0 border-r border-r-slate-100 border-opacity-10 pr-3 text-right text-xs opacity-75 sm:text-base">
            Title
          </span>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder=""
            className="bg-transparent px-3 pl-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
          />
        </label>
      </form>

      <ArrangementCardList data={[arrangements]} />
    </section>
  );
};

export default Feed;
