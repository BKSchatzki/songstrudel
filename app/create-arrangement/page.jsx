"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Arrangement from "@components/Arrangement";

const CreateArrangement = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [arrangement, setArrangement] = useState({
    title: "",
    description: "",
    instruments: ["", "", "", "", "", "", ""],
    sections: [],
  });

  const createArrangement = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/arrangement/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          title: arrangement.title,
          description: arrangement.description,
          instruments: arrangement.instruments,
          sections: arrangement.sections,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center text-center">
      <h1 className="mx-4 mt-4 max-w-xl text-2xl font-bold sm:text-3xl">
        Letting You{" "}
        <span className="bg-gradient-to-t from-red-500 to-amber-500 bg-clip-text text-transparent">
          Cook
        </span>
      </h1>
      <Arrangement
        arrangement={arrangement}
        setArrangement={setArrangement}
        saving={saving}
        handleSubmit={createArrangement}
      />
    </section>
  );
};

export default CreateArrangement;
