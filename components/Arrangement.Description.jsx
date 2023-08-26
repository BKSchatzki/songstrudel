"use client";

const ArrangementDescription = ({ arrangement, setArrangement }) => {
  return (
    <label className="mb-4 flex flex-col rounded-sm bg-slate-950 bg-opacity-50 pb-3 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter focus-within:brightness-150">
      <span className="px-3 py-1.5 text-left text-xs font-semibold sm:text-base">
        Description
      </span>
      <textarea
        type="text"
        value={arrangement.description}
        rows={6}
        maxLength={240}
        onChange={(e) =>
          setArrangement({ ...arrangement, description: e.target.value })
        }
        placeholder="A quick overview ~"
        required
        className="w-full resize-none bg-transparent px-6 pb-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
      />
    </label>
  );
};

export default ArrangementDescription;
