"use client";

// import { unstable_noStore as noStore } from "next/cache";
import { useState, useEffect } from "react";
import FeedCard from "./FeedCard";

const FeedCardList = ({ data, isPersonalFeed, handleDelete }) => {
  return (
    <div
      className={`grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 ${
        !isPersonalFeed && "mt-6 sm:mt-12"
      }`}
    >
      {data.map((arrangement, index) => (
        <FeedCard
          key={arrangement._id}
          data={arrangement}
          isPersonalFeed={isPersonalFeed}
          index={index}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const Feed = ({ isPersonalFeed, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [arrangements, setArrangements] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchArrangements = async () => {
      // noStore();
      setLoading(true);
      const maxAttempts = 5;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          const res = await fetch("/api/arrangement");
          if (!res.ok) throw new Error("Fetch failed.");
          const data = await res.json();
          isPersonalFeed
            ? setArrangements(
                data
                  .filter(
                    (arrangement) => arrangement.creator._id === currentUser,
                  )
                  .reverse(),
              )
            : setArrangements(
                data
                  .reverse()
                  .filter(
                    (arrangement) => arrangement.visibility === "visible",
                  ),
              );
          setLoading(false);
          break;
        } catch (err) {
          if (attempt === maxAttempts - 1) {
            console.error(err);
          }
        }
      }
    };
    fetchArrangements();
  }, []);

  const deleteArrangement = async (id) => {
    if (!id || !isPersonalFeed) return;

    try {
      const res = await fetch(`/api/arrangement/view/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArrangements;
      }
      if (res.ok) {
        setArrangements(
          arrangements.filter((arrangement) => arrangement._id !== id),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      {arrangements.length !== 0 ? (
        <FeedCardList
          data={filteredArrangements}
          isPersonalFeed={isPersonalFeed}
          handleDelete={deleteArrangement}
        />
      ) : (
        <div
          className={`grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 ${
            !isPersonalFeed && "mt-6 sm:mt-12"
          }`}
        >
          <div className="skeleton mb-4 h-[124px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[140px] md:h-[180px] lg:h-[204px]" />
          <div className="skeleton mb-4 h-[124px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[140px] md:h-[180px] lg:h-[204px]" />
          <div className="skeleton mb-4 h-[124px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[140px] md:h-[180px] lg:h-[204px]" />
          <div className="skeleton mb-4 h-[124px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[140px] md:h-[180px] lg:h-[204px]" />
          <div className="skeleton mb-4 h-[124px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[140px] md:h-[180px] lg:h-[204px]" />
          <div className="skeleton mb-4 h-[124px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[140px] md:h-[180px] lg:h-[204px]" />
        </div>
      )}
    </section>
  );
};

export default Feed;
