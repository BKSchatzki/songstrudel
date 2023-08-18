import Link from "next/link";

const Arrange = ({ arrangement, setArrangement, saving, handleSubmit }) => {
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
        className="mt-8 w-full max-w-xs sm:max-w-lg"
      >
        <label className="mb-4 flex flex-col rounded-sm bg-slate-900 px-3 pb-3 pt-1.5">
          <span className="mb-1.5 text-left text-xs opacity-75 sm:text-base">
            Title
          </span>
          <input
            type="text"
            value={arrangement.title}
            maxLength={32}
            onChange={(e) =>
              setArrangement({ ...arrangement, title: e.target.value })
            }
            placeholder="Your arrangement's name ~"
            required
            className="w-full bg-slate-900 px-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
          />
        </label>
        <label className="mb-4 flex flex-col rounded-sm bg-slate-900 px-3 pb-3 pt-1.5">
          <span className="mb-1.5 text-left text-xs opacity-75 sm:text-base">
            Description
          </span>
          <textarea
            type="text"
            value={arrangement.description}
            rows={6}
            maxLength={160}
            onChange={(e) =>
              setArrangement({ ...arrangement, description: e.target.value })
            }
            placeholder="A quick overview ~"
            required
            className="w-full resize-none bg-slate-900 px-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
          />
        </label>
        <div className="mb-4 flex-row flex-nowrap items-center justify-between">
          {arrangement.instruments.map((element, index) => (
            <label>
              <span className="hidden">Instruments</span>
              <input
                type="text"
                value={element}
                onChange={(e) => {
                  const updatedInstruments = [...arrangement.instruments];
                  updatedInstruments[index] = e.target.value;
                  setArrangement({
                    ...arrangement,
                    instruments: updatedInstruments,
                  });
                }}
                maxLength={4}
                placeholder={`Ins${index + 1}`}
                className="w-[14.2857%] bg-slate-900 px-0.5 py-2 text-center text-xs font-bold outline-none placeholder:opacity-50 focus:brightness-125 sm:text-base"
              />
            </label>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end gap-8">
          <Link
            href="/"
            className="rounded-lg px-2 py-1 text-xs opacity-50 sm:text-base"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="w-20 rounded-sm bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1.5 text-sm font-semibold text-slate-950 sm:w-24 sm:text-lg"
          >
            {saving ? "Saving ~" : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Arrange;
