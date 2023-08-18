"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Arrange from "@components/Arrange";

const CreateArrangement = () => {
  const [submitting, setSubmitting] = useState(false);
  const [arrangement, setArrangement] = useState({
    title: "",
    description: "",
    elements: [],
  });

  const createArrangement = async (e) => {};

  return (
    <Arrange
      arrangement={arrangement}
      setArrangement={setArrangement}
      submitting={submitting}
      handleSubmit={createArrangement}
    />
  );
};

export default CreateArrangement;
