"use client";

import { motion } from 'framer-motion';

import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="mx-auto flex w-11/12 max-w-7xl flex-col items-center justify-center pb-8 pt-16 text-center sm:pb-16 sm:pt-32">
      <motion.h1
        className="mx-4 mt-4 max-w-xl text-4xl font-bold sm:text-5xl"
        initial={{ opacity: 0, y: 50, ease: "easeInOut" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.3333, duration: 0.5 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Sweet Tunes{" "}
        </span>
        <br />
        In The Oven
      </motion.h1>
      <motion.p
        className="mx-4 mt-4 max-w-md text-base sm:text-lg"
        initial={{ opacity: 0, y: 50, ease: "easeInOut" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.3333,
          duration: 0.5,
          delay: 0.1,
        }}
        exit={{ opacity: 0, y: 50 }}
      >
        SongStrudel is a planning tool for the modern musician to develop ideas,{" "}
        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text font-semibold text-transparent">
          before getting lost in the DAW sauce.
        </span>
        <br />
        <span className="mt-4 inline-block text-xs opacity-50 sm:text-sm">
          SongStrudel is current undergoing changes. Enjoy as it is for now!
        </span>
      </motion.p>
      <Feed personalFeed={false} />
    </section>
  );
};

export default Home;
