"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;

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
    <nav className="mb-16 px-6 pt-3">
      <div className="items-between mx-auto flex max-w-7xl justify-between">
        <Link href="/" className="flex items-center justify-center gap-2">
          {/* <Image
            src="/assets/images/songstrudel-logoonly.svg"
            alt="SongStrudel Logo"
            width={37}
            height={37}
            className="block sm:hidden"
          /> */}
          <Image
            src="/assets/images/songstrudel-nameonly.svg"
            alt="SongStrudel Logo"
            width={148}
            height={37}
            // className="hidden sm:block"
          />
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden sm:flex">
          {isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-5">
              <Link
                href="/create-arrangement"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-1.5 font-semibold"
              >
                Create Arrangement
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="inset-1 rounded-lg px-3 py-1.5 ring-1 ring-slate-100"
              >
                Sign Out
              </button>
              <Link href="/my-arrangements">
                <Image
                  src="/assets/images/songstrudel-logoonly.svg"
                  alt="My Arrangements"
                  width={37}
                  height={37}
                  className="rounded-full"
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
                    className="bg-slate-100 px-3 py-1.5 text-slate-950"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/* Mobile Navigation */}
        <div className="relative flex sm:hidden">
          {isUserLoggedIn ? (
            <div className="flex">
              <Image
                src="/assets/images/songstrudel-logoonly.svg"
                alt="My Arrangements"
                width={37}
                height={37}
                onClick={() => setDropdownToggled((prev) => !prev)}
                className="rounded-full"
              />
              {dropdownToggled && (
                <div className="absolute right-0 top-12 flex w-56 flex-col gap-2 rounded-md bg-gradient-to-r from-blue-800 to-violet-800 px-4 py-4 text-right">
                  <Link
                    href="/my-arrangements"
                    onClick={() => setDropdownToggled(false)}
                    className="font-semibold"
                  >
                    My Arrangements
                  </Link>
                  <Link
                    href="/create-strudel"
                    onClick={() => setDropdownToggled(false)}
                    className="font-semibold"
                  >
                    Create Arrangement
                  </Link>
                  <button
                    type="button"
                    onClick={signOut}
                    className="mt-4 rounded-lg bg-slate-950 px-3 py-1.5"
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
                    className="bg-slate-100 px-3 py-1.5 text-slate-950"
                  >
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
