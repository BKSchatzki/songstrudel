'use client';

import TextareaAutosize from 'react-textarea-autosize';

const ArrangementDescription = ({
  arrangement,
  setArrangementAndStore,
  isNewArrangement,
  disabled,
}) => {
  return (
    <label className="mb-4 flex flex-col rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter focus-within:brightness-150">
      <span className="px-3 py-1.5 text-left text-xs font-semibold sm:text-base">Description</span>
      <TextareaAutosize
        type="text"
        value={arrangement.description}
        minRows={1}
        maxRows={24}
        maxLength={512}
        onChange={(e) =>
          setArrangementAndStore(
            {
              ...arrangement,
              description: e.target.value,
            },
            isNewArrangement
          )
        }
        placeholder="A quick overview ~"
        className="w-full resize-none overflow-hidden bg-transparent px-6 pb-3 text-sm outline-none placeholder:opacity-50 sm:text-lg"
        disabled={disabled}
      />
    </label>
  );
};

export default ArrangementDescription;
