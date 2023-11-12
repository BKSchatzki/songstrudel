"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Arrangement from "@components/Arrangement";

const ViewArrangement = ({ params: { id } }) => {
  const [arrangement, setArrangement] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArrangement = async () => {
      if (!id) return;
      const res = await fetch(`/api/arrangement/view/${id}`);
      console.log(res);
      const data = await res.json();
      setArrangement(data);
    };

    if (id) {
      fetchArrangement();
    }
  }, [id]);

  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center text-center">
      <h1 className="mx-4 mt-4 max-w-xl text-2xl font-bold sm:text-3xl">
        Opening the{" "}
        <span className="bg-gradient-to-t from-red-500 to-amber-500 bg-clip-text text-transparent">
          Oven
        </span>
      </h1>
      {arrangement && (
        <Arrangement
          arrangement={arrangement}
          setArrangement={setArrangement}
        />
      )}
    </section>
  );
};

export default ViewArrangement;
