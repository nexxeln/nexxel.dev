"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { clx } from "~~/utils";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
    "/about": {
      name: "about me",
    },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="-ml-[8px] mb-8 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive =
                pathname === path ||
                (pathname?.startsWith(path) && pathname[path.length] === "/");
              return (
                <Link
                  key={path}
                  href={path}
                  className={clx(
                    "relative flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200",
                    isActive &&
                      "underline decoration-wavy decoration-[0.1em] underline-offset-4",
                  )}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
