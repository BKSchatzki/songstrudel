import { useState } from "react";
import Link from "next/link";

const FeedCard = ({ index, data, isPersonalFeed, handleDelete }) => {
  const [arrangement, setArrangement] = useState(data);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleToggleChange = async (newState) => {
    if (!arrangement._id) return;

    try {
      const updatedArrangement = {
        ...arrangement,
        visibility: newState,
      };

      const res = await fetch(`/api/arrangement/view/${arrangement._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedArrangement),
      });

      if (res.ok) {
        const data = await res.json();
        setArrangement(data);
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      let timer = countdown;
      const intervalId = setInterval(() => {
        timer--;
        setCountdown(timer);
        if (timer === 0) {
          clearInterval(intervalId);
          setConfirmDelete(false);
          setCountdown(3);
        }
      }, 1000);
    } else {
      handleDelete(arrangement._id);
    }
  };

  return (
    <div className="col-span-1">
      <Link href={`/view-arrangement/${arrangement._id}`}>
        <article className="relative cursor-pointer rounded-sm bg-slate-950 bg-opacity-20 px-8 py-3 shadow-md shadow-slate-950/20 backdrop-blur-md transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none">
          {!isPersonalFeed && (
            <span className="absolute -top-2 right-3 rounded-sm bg-slate-950 px-1 py-0.5 text-[0.625rem] opacity-50 backdrop-blur-md md:text-xs">
              {arrangement.creator ? arrangement.creator.username : "Anonymous"}
            </span>
          )}
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
              htmlFor={`private-${index}`}
              className="flex items-center justify-center gap-1 text-secondary sm:gap-2"
            >
              <span className="block cursor-pointer">Private</span>
              <input
                id={`private-${index}`}
                type="checkbox"
                className="toggle toggle-secondary toggle-xs md:toggle-sm"
                checked={arrangement.visibility === "private"}
                onChange={() =>
                  handleToggleChange(
                    !(arrangement.visibility === "private")
                      ? "private"
                      : "unlisted",
                  )
                }
              />
            </label>
            <label
              htmlFor={`visible-${index}`}
              className="flex items-center justify-center gap-1 text-success sm:gap-2"
            >
              <span className="block cursor-pointer">Visible</span>
              <input
                id={`visible-${index}`}
                type="checkbox"
                className="toggle toggle-accent toggle-xs md:toggle-sm"
                checked={arrangement.visibility === "visible"}
                onChange={() =>
                  handleToggleChange(
                    !(arrangement.visibility === "visible")
                      ? "visible"
                      : "unlisted",
                  )
                }
              />
            </label>
            <button
              type="button"
              onClick={handleDeleteClick}
              className={`w-24 rounded-sm bg-gradient-to-r from-rose-600 to-orange-600 px-3 py-1.5 font-semibold shadow-sm shadow-red-600 ring-1 ring-red-600 ring-offset-0 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:w-[6.5rem] ${
                confirmDelete
                  ? "text-slate-950 brightness-125"
                  : "bg-clip-text text-transparent"
              }`}
            >
              {confirmDelete ? `Confirm (${countdown})` : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
