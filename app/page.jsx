"use client";

import Feed from "@components/Feed";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <section className="mx-auto flex w-11/12 max-w-7xl flex-col items-center justify-center pb-8 pt-16 text-center sm:pb-16 sm:pt-32">
      <h1 className="mx-4 mt-4 max-w-xl text-4xl font-bold sm:text-5xl">
        <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Sweet Tunes{" "}
        </span>
        <br />
        In The Oven
      </h1>
      <p className="mx-4 mt-4 max-w-md text-base sm:text-lg">
        SongStrudel is a planning tool for the modern musician to develop ideas,{" "}
        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text font-semibold text-transparent">
          before getting lost in the DAW sauce.
        </span>
      </p>
      {!session?.user.id && (
        <Link
          href="/create-arrangement"
          className="mt-6 rounded-sm bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-xl font-semibold shadow-sm shadow-indigo-500/50 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:mt-12 sm:px-6 sm:py-3 sm:text-2xl"
        >
          Try It Out!
        </Link>
      )}
      <Feed personalFeed={false} />
    </section>
  );
};

export default Home;
