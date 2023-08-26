const ArrangementInstruments = ({
  arrangement,
  setArrangement,
  textColors,
  shadowColors,
}) => {
  return (
    <div className="mb-4 flex flex-grow gap-1 sm:gap-2">
      {arrangement.instruments.map((instrument, instrumentIndex) => (
        <label key={instrumentIndex} className="w-[14.2857%]">
          <span className="hidden">Instruments</span>
          <input
            type="text"
            value={instrument}
            onChange={(e) => {
              const updatedInstruments = [...arrangement.instruments];
              updatedInstruments[instrumentIndex] = e.target.value;
              setArrangement({
                ...arrangement,
                instruments: updatedInstruments,
              });
            }}
            maxLength={4}
            placeholder={`Ins${instrumentIndex + 1}`}
            className={`w-full bg-opacity-50 px-0.5 py-2 text-center text-xs font-semibold shadow-sm outline-none backdrop-blur-md backdrop-filter placeholder:opacity-50 focus:brightness-200 sm:text-base ${textColors[instrumentIndex]} ${shadowColors[instrumentIndex]} placeholder:${textColors[instrumentIndex]}`}
          />
        </label>
      ))}
    </div>
  );
};

export default ArrangementInstruments;
