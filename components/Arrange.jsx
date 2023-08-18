import React from "react";

const Arrange = ({ arrangement, setArrangement, submitting, handleSubmit }) => {
  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center text-center">
      <h1 className="mx-4 mt-4 max-w-xl text-2xl font-bold sm:text-3xl">
        Letting You{" "}
        <span className="bg-gradient-to-t from-red-500 to-amber-500 bg-clip-text text-transparent">
          Cook
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-xs sm:max-w-sm"
      >
        <div className="mb-4 flex flex-col rounded-sm bg-slate-900 px-3 pb-3 pt-1.5">
          <label
            htmlFor="title"
            className="mb-1.5 text-left text-xs opacity-75"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={arrangement.title}
            maxLength={32}
            onChange={(e) =>
              setArrangement({ ...arrangement, title: e.target.value })
            }
            placeholder="Your arrangement's name ~"
            className="w-full bg-slate-900 px-3 text-sm outline-none placeholder:opacity-50 sm:text-base"
          />
        </div>
        <div className="mb-4 flex flex-col rounded-sm bg-slate-900 px-3 pb-3 pt-1.5">
          <label
            htmlFor="description"
            className="mb-1.5 text-left text-xs opacity-75"
          >
            Description
          </label>
          <textarea
            type="text"
            id="description"
            value={arrangement.description}
            rows={6}
            maxLength={160}
            onChange={(e) =>
              setArrangement({ ...arrangement, description: e.target.value })
            }
            placeholder="A quick overview ~"
            className="w-full resize-none bg-slate-900 px-3 text-sm outline-none placeholder:opacity-50 sm:text-base"
          />
        </div>
        <div className="flex-row flex-nowrap items-center justify-between">
          {arrangement.instruments.map((_, index) => (
            <input
              type="text"
              maxLength={4}
              placeholder={`Ins${index + 1}`}
              className="w-[14.2857%] bg-slate-900 px-0.5 py-2 text-center text-xs font-bold outline-none placeholder:opacity-50 focus:brightness-125 sm:text-sm"
            />
          ))}
        </div>
      </form>
    </section>
  );
};

export default Arrange;
