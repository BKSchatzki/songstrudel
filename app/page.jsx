import Feed from "@components/Feed";

// export const dynamic = "force-dynamic";

const Home = () => {
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
      <Feed personalFeed={false} />
    </section>
  );
};

export default Home;
