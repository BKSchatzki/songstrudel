'use client';

import { useSession } from 'next-auth/react';

const ArrangementTitle = ({ arrangement, setArrangementAndStore, isNewArrangement, disabled }) => {
  const { data: session } = useSession();

  return (
    <label className="mb-4 flex flex-col rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter focus-within:brightness-150">
      <span className="absolute -top-2 right-3 rounded-sm bg-slate-950 px-1 py-0.5 text-[0.625rem] opacity-50 backdrop-blur-md sm:text-xs">
        {arrangement.creator ? arrangement.creator.username : session?.user.name ?? 'Anonymous'}
      </span>
      <span className="px-3 py-1.5 text-left text-xs font-semibold sm:text-base">Title</span>
      <input
        type="text"
        value={arrangement.title}
        maxLength={64}
        onChange={(e) =>
          setArrangementAndStore({ ...arrangement, title: e.target.value }, isNewArrangement)
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
