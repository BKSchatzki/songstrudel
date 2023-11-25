const ArrangementTitle = ({
  arrangement,
  setArrangement,
  setArrangementAndStore,
  isNewArrangement,
  disabled,
}) => {
  return (
    <label className="mb-4 flex flex-col rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter focus-within:brightness-150">
      <span className="px-3 py-1.5 text-left text-xs font-semibold sm:text-base">
        Title
      </span>
      <input
        type="text"
        value={arrangement.title}
        maxLength={64}
        onChange={(e) =>
          setArrangementAndStore(
            { ...arrangement, title: e.target.value },
            isNewArrangement,
          )
        }
        placeholder="Your arrangement's name ~"
        required
        className="w-full bg-transparent px-6 pb-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
        disabled={disabled}
      />
    </label>
  );
};

export default ArrangementTitle;
