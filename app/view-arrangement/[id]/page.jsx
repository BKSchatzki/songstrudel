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
  const [isPrivateArrangement, setIsPrivateArrangement] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchArrangement = async () => {
      if (!id) return;
      const res = await fetch(`/api/arrangement/view/${id}`);
      const data = await res.json();
      if (
        data.visibility !== "private" ||
        session?.user.id === data.creator._id
      ) {
        setArrangement(data);
      } else {
        setIsPrivateArrangement(true);
      }
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

  /*   const share = async () => {
    if (!navigator.share) {
      alert("Your browser does not support the Share API");
      return;
    }

    try {
      await navigator.share({
        title: "Check out this arrangement!",
        url: window.location.href,
      });
    } catch (err) {
      console.error(err);
    }
  }; */

  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center pb-8 pt-16 text-center sm:pb-16 sm:pt-32">
      <h1 className="mx-4 mt-4 max-w-xl text-2xl font-bold sm:text-3xl">
        Checking the{" "}
        <span className="bg-gradient-to-t from-red-500 to-amber-500 bg-clip-text text-transparent">
          Oven
        </span>
      </h1>
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
      ) : (
        isPrivateArrangement && (
          <p className="mx-4 mt-4 max-w-md text-base sm:text-lg">
            Hmm. This oven seems to be{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text font-semibold text-transparent">
              locked shut.
            </span>
          </p>
        )
      )}
    </section>
  );
};

export default ViewArrangement;
