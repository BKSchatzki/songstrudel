"use client";

import Feed from "@components/Feed";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const Home = () => {
  const { data: session } = useSession();

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
      </motion.p>
      {/* {!session?.user.id && (
        <Link
          href="/create-arrangement"
          className="mt-6 rounded-sm bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-xl font-semibold shadow-sm shadow-indigo-500/50 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:mt-12 sm:px-6 sm:py-3 sm:text-2xl"
        >
          Try It Out!
        </Link>
      )} */}
      <Feed personalFeed={false} />
    </section>
  );
};

export default Home;
