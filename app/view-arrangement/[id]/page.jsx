"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Arrangement from "@components/Arrangement";

const ViewArrangementPage = () => {
  const [arrangement, setArrangement] = useState(null);
  const router = useRouter();
  const { id } = router.query || {};

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

  return arrangement ? (
    <Arrangement arrangement={arrangement} />
  ) : (
    <div>Loading...</div>
  );
};

export default ViewArrangementPage;
