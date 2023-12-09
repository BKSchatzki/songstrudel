"use client";

import { useState, useEffect } from "react";
import { usePreventAutoZoom } from "@hooks/usePreventAutoZoom";
import FeedCardList from "./FeedCardList";
import { motion } from "framer-motion";

const Feed = ({ isPersonalFeed, currentUser }) => {
  const [searchText, setSearchText] = useState("");
  const [arrangements, setArrangements] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchArrangements = async () => {
      setLoading(true);
      const maxAttempts = 5;
      const delayBetweenAttempts = 1000;

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
          } else {
            await new Promise((resolve) =>
              setTimeout(resolve, delayBetweenAttempts),
            );
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

  usePreventAutoZoom();

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
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 10, ease: "easeInOut" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            bounce: 0.3333,
            duration: 0.5,
            delay: 0.2,
          }}
          exit={{ opacity: 0, y: 10 }}
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
        </motion.form>
      )}
      <FeedCardList
        data={filteredArrangements}
        isPersonalFeed={isPersonalFeed}
        handleDelete={deleteArrangement}
      />
    </section>
  );
};

export default Feed;
