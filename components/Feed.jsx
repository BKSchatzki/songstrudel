"use client";

// import { unstable_noStore as noStore } from "next/cache";
import { useState, useEffect } from "react";
import FeedCard from "./FeedCard";

const FeedCardList = ({ data, isPersonalFeed }) => {
  return (
    <div
      className={`flex flex-wrap items-start justify-center gap-8 ${
        !isPersonalFeed && "mt-12 sm:mt-24"
      }`}
    >
      {data.map((arrangement) => (
        <FeedCard key={arrangement._id} arrangement={arrangement} />
      ))}
    </div>
  );
};

const Feed = ({ isPersonalFeed, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [arrangements, setArrangements] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchArrangements = async () => {
      // noStore();
      const res = await fetch("/api/arrangement");
      const data = await res.json();
      isPersonalFeed
        ? setArrangements(
            data
              .filter((arrangement) => arrangement.creator._id === currentUser)
              .reverse(),
          )
        : setArrangements(data.reverse());
    };
    fetchArrangements();
  }, []);

  const filteredArrangements = arrangements.filter((arrangement) => {
    const titlesLowercase = arrangement.title.toLowerCase();
    const usernamesLowercase = arrangement.creator.username.toLowerCase();
    const instrumentsLowercase = arrangement.instruments
      .join(" ")
      .toLowerCase();
    const searchWords = searchText.toLowerCase().split(" ");
    return searchWords.every(
      (word) =>
        titlesLowercase.includes(word) ||
        usernamesLowercase.includes(word) ||
        instrumentsLowercase.includes(word),
    );
  });

  return (
    <section className="mt-6 w-full sm:mt-12">
      {!isPersonalFeed && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center"
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
      )}
      <FeedCardList
        data={filteredArrangements}
        isPersonalFeed={isPersonalFeed}
      />
    </section>
  );
};

export default Feed;
