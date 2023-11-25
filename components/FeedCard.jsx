import Link from "next/link";

const FeedCard = ({ arrangement, isPersonalFeed }) => {
  return (
    <div className="col-span-1">
      <Link href={`/view-arrangement/${arrangement._id}`}>
        <article className="relative cursor-pointer rounded-sm bg-slate-950 bg-opacity-20 px-8 py-3 shadow-md shadow-slate-950/20 backdrop-blur-md transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none">
          <span className="absolute -top-2 right-3 rounded-sm bg-slate-950 px-1 py-0.5 text-[0.625rem] opacity-50 backdrop-blur-md md:text-xs">
            {arrangement.creator ? arrangement.creator.username : "Anonymous"}
          </span>
          <div className="mb-4 flex flex-col text-left">
            <h2 className="line-clamp-1 text-sm font-semibold md:text-base">
              {arrangement.title}
            </h2>
            <p className="line-clamp-3 h-12 text-xs opacity-75 sm:line-clamp-4 sm:h-16 md:line-clamp-5 md:h-24 md:text-sm lg:line-clamp-6 lg:h-[7.5rem]">
              {arrangement.description}
            </p>
          </div>
          <ul className="mt-4 flex flex-row flex-nowrap items-center justify-between text-xs opacity-50 md:text-sm">
            {arrangement.instruments.map((element, index) => (
              <li key={index}>{element ? element : `Ins${index + 1}`}</li>
            ))}
          </ul>
        </article>
      </Link>
      {isPersonalFeed && (
        <div className="rounded-sm bg-slate-800 bg-opacity-20 px-3 py-1.5 shadow-md shadow-slate-800/20 backdrop-blur-md">
          <div className="flex w-full items-center justify-evenly gap-1 text-xs sm:gap-3 md:text-sm">
            <label
              htmlFor="private"
              className="flex items-center justify-center gap-1 text-secondary sm:gap-2"
            >
              <span className="block">Private</span>
              <input
                id="private"
                type="checkbox"
                className="toggle toggle-secondary toggle-xs md:toggle-sm"
              />
            </label>
            <label
              htmlFor="listed"
              className="flex items-center justify-center gap-1 text-success sm:gap-2"
            >
              <span className="block">Listed</span>
              <input
                id="listed"
                type="checkbox"
                className="toggle toggle-accent toggle-xs md:toggle-sm"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                return;
              }}
              className={`w-24 rounded-sm bg-gradient-to-r from-rose-600 to-orange-600 px-3 py-1.5 font-semibold shadow-sm shadow-red-600 ring-1 ring-red-600 ring-offset-0 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:w-[6.5rem]`}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
