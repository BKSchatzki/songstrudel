"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Feed from "@components/Feed";
import { useEffect } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

  return (
    <section className="mx-auto flex w-11/12 max-w-7xl flex-col items-center justify-center pb-8 pt-16 text-center sm:pb-16 sm:pt-32">
      <h1 className="mx-4 mt-4 max-w-xl text-3xl font-bold sm:text-4xl">
        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
          Your Tunes{" "}
        </span>
        <br className="sm:hidden" />
        Right Below
      </h1>
      <p className="mx-4 mt-4 max-w-md text-base sm:text-lg">
        Set privacy and visibility, and{" "}
        <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text font-semibold text-transparent">
          throw out the duds.
        </span>
      </p>
      <Feed isPersonalFeed={true} currentUser={session?.user.id} />
    </section>
  );
};

export default Profile;
