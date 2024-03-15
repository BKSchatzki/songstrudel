"use client";

import { motion, AnimatePresence } from "framer-motion";
import FeedCard from "./FeedCard";

const FeedCardList = ({ data, isPersonalFeed, handleDelete }) => {
  const skeletonCount = 24;

  return (
    <div
      className={`grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 ${
        !isPersonalFeed && "mt-6 sm:mt-12"
      }`}
    >
      <AnimatePresence mode="wait">
        {data.length === 0 ? (
          <>
            {Array(skeletonCount)
              .fill()
              .map((_, index) => (
                <motion.div
                  key={index}
                  className="skeleton mb-4 h-[124px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[140px] md:h-[180px] lg:h-[204px]"
                  initial={{ opacity: 0, y: 100, ease: "easeInOut" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  exit={{ opacity: 0, y: 100, transition: { duration: 0.1 } }}
                />
              ))}
          </>
        ) : (
          <>
            {data.map((arrangement, index) => (
              <motion.div
                key={arrangement._id}
                initial={{ opacity: 0, ease: "easeInOut" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <FeedCard
                  data={arrangement}
                  isPersonalFeed={isPersonalFeed}
                  index={index}
                  handleDelete={handleDelete}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedCardList;
