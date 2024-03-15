"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Arrangement from "@components/Arrangement";

const ViewArrangement = ({ params: { id } }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [arrangement, setArrangement] = useState(null);
  const [isPrivateArrangement, setIsPrivateArrangement] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchArrangement = async () => {
      const maxAttempts = 5;
      const delayBetweenAttempts = 1000;

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          if (!id) return;
          const res = await fetch(`/api/arrangement/view/${id}`);
          if (!res.ok) throw new Error("Fetch failed.");
          const data = await res.json();
          if (
            data.visibility !== "private" ||
            session?.user.id === data.creator._id
          ) {
            setArrangement(data);
          } else {
            setIsPrivateArrangement(true);
          }
          break;
        } catch (err) {
          if (attempt === maxAttempts - 1) {
            console.error(err);
          } else {
            await new Promise((resolve) =>
              setTimeout(resolve, delayBetweenAttempts),
            );
          }
        }
      }
    };

    if (id) {
      fetchArrangement();
    }
  }, [id, session]);

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
      setEditSuccess(true);
      setTimeout(() => setEditSuccess(false), 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteArrangement = async () => {
    if (!id || !isCreator) return;

    try {
      const res = await fetch(`/api/arrangement/view/${id}`, {
        method: "DELETE",
      });
      router.push("/my-arrangements");
    } catch (err) {
      console.log(err);
    }
  };

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center pb-8 pt-16 text-center sm:pb-16 sm:pt-32">
      <motion.h1
        className="mx-4 mt-4 max-w-xl text-2xl font-bold sm:text-3xl"
        initial={{ opacity: 0, y: 50, ease: "easeInOut" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.3333, duration: 0.5 }}
        exit={{ opacity: 0, y: 50 }}
      >
        Checking the{" "}
        <span className="bg-gradient-to-t from-red-500 to-amber-500 bg-clip-text text-transparent">
          Oven
        </span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 50, ease: "easeInOut" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.3333,
          duration: 0.5,
          delay: 0.1,
        }}
        exit={{ opacity: 0, y: 50 }}
      >
        {arrangement ? (
          <Arrangement
            arrangement={arrangement}
            setArrangement={setArrangement}
            isCreator={isCreator}
            isNewArrangement={false}
            isUserLoggedIn={session?.user.id !== undefined}
            saving={saving}
            handleSubmit={editArrangement}
            handleDelete={deleteArrangement}
            handleCopy={copyUrlToClipboard}
            editSuccess={editSuccess}
            copySuccess={copySuccess}
          />
        ) : isPrivateArrangement ? (
          <p className="mx-4 mt-4 max-w-md text-base sm:text-lg">
            Hmm. This oven seems to be{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text font-semibold text-transparent">
              locked shut.
            </span>
          </p>
        ) : (
          <div className="mt-4 w-full max-w-xs sm:mt-8 sm:max-w-lg">
            <motion.div
              className="skeleton mb-4 h-[60px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[76px]"
              initial={{ opacity: 0, y: 100, ease: "easeInOut" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: 100, transition: { duration: 0.1 } }}
            />
            <motion.div
              className="skeleton mb-4 h-[60px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[76px]"
              initial={{ opacity: 0, y: 100, ease: "easeInOut" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              exit={{ opacity: 0, y: 100, transition: { duration: 0.1 } }}
            />
            <motion.div
              className="skeleton mb-4 h-8 rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-10"
              initial={{ opacity: 0, y: 100, ease: "easeInOut" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              exit={{ opacity: 0, y: 100, transition: { duration: 0.1 } }}
            />
            <motion.div
              className="skeleton mb-4 h-[203px] rounded-sm bg-slate-950 bg-opacity-50 shadow-md shadow-slate-950/50 backdrop-blur-md backdrop-filter sm:h-[276px]"
              initial={{ opacity: 0, y: 100, ease: "easeInOut" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              exit={{ opacity: 0, y: 100, transition: { duration: 0.1 } }}
            />
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default ViewArrangement;
