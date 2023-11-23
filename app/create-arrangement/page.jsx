"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    const storedArrangement = window.localStorage.getItem("newArrangement");
    if (storedArrangement) {
      setArrangement(JSON.parse(storedArrangement));
    }
  }, []);

  const createArrangement = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/arrangement/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          title: arrangement.title,
          description: arrangement.description,
          instruments: arrangement.instruments,
          sections: arrangement.sections,
        }),
      });
      if (res.ok) {
        window.localStorage.removeItem("newArrangement");
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
        isNewArrangement={true}
        isUserLoggedIn={session?.user.id !== undefined}
        saving={saving}
        handleSubmit={createArrangement}
      />
    </section>
  );
};

export default CreateArrangement;
