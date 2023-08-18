import React from "react";

const Arrange = ({ arrangement, setArrangement, submitting, handleSubmit }) => {
  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center text-center">
      <h1 className="mx-4 mt-4 max-w-xl text-3xl font-bold sm:text-4xl">
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
            className="mb-1.5 text-left text-xs opacity-50"
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
            className="w-full bg-slate-900 px-3 text-base outline-none sm:text-lg"
          />
        </div>
        <div className="mb-4 flex flex-col rounded-sm bg-slate-900 px-3 pb-3 pt-1.5">
          <label
            htmlFor="description"
            className="mb-1.5 text-left text-xs opacity-50"
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
            className="w-full resize-none bg-slate-900 px-3 text-base outline-none sm:text-lg"
          />
        </div>
      </form>
    </section>
  );
};

export default Arrange;
