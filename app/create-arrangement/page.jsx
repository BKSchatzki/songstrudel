"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Arrange from "@components/Arrange";

const CreateArrangement = () => {
  const [saving, setSaving] = useState(false);
  const [arrangement, setArrangement] = useState({
    title: "",
    description: "",
    instruments: ["", "", "", "", "", "", ""],
  });

  const createArrangement = async (e) => {};

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
