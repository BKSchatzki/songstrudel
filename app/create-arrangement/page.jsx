"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Arrangement from "@components/Arrangement";

const CreateArrangement = () => {
  // Import session and set up router
  const { data: session } = useSession();
  const router = useRouter();
  // Initialize state for document to go in arrangements collection
  const [saving, setSaving] = useState(false);
  const [arrangement, setArrangement] = useState({
    title: "",
    description: "",
    instruments: ["", "", "", "", "", "", ""],
    sections: [],
  });
  // Define CREATE function for arrangements document
  const createArrangement = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Fetch at API route using _id defined in auth route and state
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
      // Redirect to root if successful
      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  // Pass props to Arrange component
  return (
    <Arrangement
      arrangement={arrangement}
      setArrangement={setArrangement}
      saving={saving}
      handleSubmit={createArrangement}
    />
  );
};

export default CreateArrangement;
