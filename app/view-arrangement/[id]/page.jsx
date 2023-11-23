"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Arrangement from "@components/Arrangement";

const ViewArrangement = ({ params: { id } }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [arrangement, setArrangement] = useState(null);

  useEffect(() => {
    const fetchArrangement = async () => {
      if (!id) return;
      const res = await fetch(`/api/arrangement/view/${id}`);
      const data = await res.json();
      setArrangement(data);
    };

    if (id) {
      fetchArrangement();
    }
  }, [id]);

  const isCreator = session?.user.id === arrangement?.creator._id;

  const editArrangement = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (!id || !isCreator) return;

    try {
      const res = await fetch(`/api/arrangement/view/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arrangement),
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

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
          saving={saving}
          handleSubmit={editArrangement}
          isCreator={isCreator}
          isNewArrangement={false}
        />
      )}
    </section>
  );
};

export default ViewArrangement;
