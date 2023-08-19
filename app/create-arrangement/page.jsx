"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Arrange from "@components/Arrange";

const CreateArrangement = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [arrangement, setArrangement] = useState({
    title: "",
    description: "",
    instruments: ["", "", "", "", "", "", ""],
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
    <Arrange
      arrangement={arrangement}
      setArrangement={setArrangement}
      saving={saving}
      handleSubmit={createArrangement}
    />
  );
};

export default CreateArrangement;
