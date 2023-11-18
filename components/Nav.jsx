"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [dropdownToggled, setDropdownToggled] = useState(false);

  useEffect(() => {
    const loadProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    loadProviders();
  }, []);

  return (
    <nav className="mb-8 bg-gradient-to-b from-gray-900 to-transparent px-6 pb-10 pt-3 sm:mb-8">
      <div className="items-between mx-auto flex max-w-7xl justify-between">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/assets/images/songstrudel-logoonly.svg"
            alt="SongStrudel Logo"
            width={37}
            height={37}
            className="block transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:hidden"
          />
          <Image
            src="/assets/images/songstrudel-nameonly.svg"
            alt="SongStrudel Logo"
            width={148}
            height={37}
            className="hidden transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:block"
          />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden sm:flex">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link
                href="/create-arrangement"
                className="rounded-sm bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-1.5 font-semibold shadow-sm shadow-indigo-500/50 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none"
              >
                Create Arrangement
              </Link>
              <button
                type="button"
                onClick={signOut}
                className=" rounded-sm px-3 py-1.5"
              >
                Sign Out
              </button>
              <Link href="/my-arrangements">
                <Image
                  src={session?.user.image}
                  alt="My Arrangements"
                  width={37}
                  height={37}
                  className="rounded-full transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="flex items-start justify-center gap-2 rounded-sm bg-[#4752c4] px-3 py-1.5 font-semibold text-slate-100 shadow-sm shadow-[#4752c4] transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none"
                  >
                    <Image
                      src="/assets/images/discord-logo.svg"
                      alt="Discord Logo"
                      width={25}
                      height={25}
                    />
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/* Mobile Nav */}
        <div className="flex sm:hidden">
          {session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                alt="My Discord Avatar"
                width={37}
                height={37}
                onClick={() => setDropdownToggled((prev) => !prev)}
                className="z-20 rounded-full transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none"
              />
              {dropdownToggled && (
                <div className="absolute right-0 top-0 z-10 flex h-full flex-col gap-6 rounded-sm bg-gray-900 bg-opacity-20 px-4 py-4 ps-8 pt-20 text-right backdrop-blur-md backdrop-filter">
                  <Link
                    href="/my-arrangements"
                    onClick={() => setDropdownToggled(false)}
                    className="font-semibold"
                  >
                    My Arrangements
                  </Link>
                  <Link
                    href="/create-arrangement"
                    onClick={() => setDropdownToggled(false)}
                    className="font-semibold"
                  >
                    Create Arrangement
                  </Link>
                  <button
                    type="button"
                    onClick={signOut}
                    className="mt-14 rounded-sm bg-slate-100 px-3 py-1.5 text-slate-950 shadow-sm shadow-slate-100 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="flex items-start justify-center gap-2 rounded-sm bg-[#4752c4] px-3 py-1.5 font-semibold text-slate-100 shadow-md shadow-[#4752c4] transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none"
                  >
                    <Image
                      src="/assets/images/discord-logo.svg"
                      alt="Discord Logo"
                      width={25}
                      height={25}
                    />
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
