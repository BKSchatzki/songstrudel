"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const FeedCard = ({ arrangement, handleEdit, handleDelete }) => {
  return (
    <article className="relative w-96 max-w-xl cursor-pointer rounded-sm bg-slate-950 bg-opacity-20 px-8 py-3 shadow-md shadow-slate-950/20 backdrop-blur-md">
      <span className="absolute -top-2 right-3 rounded-sm bg-slate-950 px-1 py-0.5 text-[0.625rem] opacity-50 backdrop-blur-md sm:text-xs">
        {arrangement.creator && arrangement.creator.username}
      </span>
      <div className="mb-4 flex flex-col text-left">
        <h4 className="line-clamp-1 text-sm font-semibold sm:text-base">
          {arrangement.title}
        </h4>
        <p className="line-clamp-3 h-12 text-xs opacity-75 sm:h-14 sm:text-sm">
          {arrangement.description}
        </p>
      </div>
      <ul className="mt-4 flex flex-row flex-nowrap items-center justify-between text-xs opacity-50 sm:text-sm">
        {arrangement.instruments.map((element, index) => (
          <li key={index}>{element ? element : `Ins${index + 1}`}</li>
        ))}
      </ul>
    </article>
  );
};

export default FeedCard;
