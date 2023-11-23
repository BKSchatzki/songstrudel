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
    <nav className="fixed z-10 w-full bg-gradient-to-b from-gray-900 to-transparent px-6 pb-3 pt-3">
      <div className="items-between mx-auto flex max-w-7xl justify-between">
        <div className="flex items-center justify-center gap-5">
          <Link
            href="/"
            onClick={() => setDropdownToggled(false)}
            className="flex items-center justify-center gap-2"
          >
            <Image
              src="/assets/images/songstrudel-logoonly.svg"
              alt="SongStrudel Logo"
              width={37}
              height={37}
              className="z-20 block transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none md:hidden"
            />
            <Image
              src="/assets/images/songstrudel-nameonly.svg"
              alt="SongStrudel Logo"
              width={148}
              height={37}
              className="z-20 hidden transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none md:block"
            />
          </Link>
          <Link
            href="https://www.buymeacoffee.com/bkschatzki"
            target="_blank"
            className="hidden md:block"
          >
            <Image
              src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
              alt="Buy Me A Coffee"
              width={109}
              height={30}
            />
          </Link>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex">
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
        <div className="flex md:hidden">
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
                <div className="fixed right-0 top-0 z-10 flex h-full w-full flex-col items-center gap-6 rounded-sm bg-gray-900 bg-opacity-20 px-4 py-4 pt-32 text-right backdrop-blur-md backdrop-filter">
                  <Link
                    href="/my-arrangements"
                    onClick={() => setDropdownToggled(false)}
                    className="w-3/4 max-w-xs rounded-sm bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1.5 text-center text-sm font-semibold text-slate-950 shadow-sm shadow-amber-400/50 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:text-base"
                  >
                    My Arrangements
                  </Link>
                  <Link
                    href="/create-arrangement"
                    onClick={() => setDropdownToggled(false)}
                    className="w-3/4 max-w-xs rounded-sm bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-1.5 text-center text-sm font-semibold shadow-sm shadow-indigo-500/50 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:text-base"
                  >
                    Create Arrangement
                  </Link>
                  <button
                    type="button"
                    onClick={signOut}
                    className="mt-14 w-3/4 max-w-xs rounded-sm bg-slate-100 px-3 py-1.5 text-sm text-slate-950 shadow-sm shadow-slate-100/50 transition duration-75 active:translate-y-0.5 active:scale-95 active:shadow-none sm:text-base"
                  >
                    Sign Out
                  </button>
                  <Link
                    href="https://www.buymeacoffee.com/bkschatzki"
                    target="_blank"
                    className="fixed left-20 top-[15px]"
                  >
                    <Image
                      src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
                      alt="Buy Me A Coffee"
                      width={109}
                      height={30}
                    />
                  </Link>
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
