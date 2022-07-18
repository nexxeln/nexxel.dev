import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { FC } from "react";
import { clsx } from "clsx";

const NavItem: FC<{ href: string; text: string; router: NextRouter }> = ({
  href,
  text,
  router,
}) => {
  const isActive = router.pathname === (href === "/home" ? "/" : href);

  return (
    <Link href={href === "/home" ? "/" : href}>
      <a
        className={clsx(
          "text-lg mr-4",
          isActive &&
            "text-transparent bg-clip-text bg-gradient-to-r from-t-pink via-t-purple to-t-orange"
        )}
      >
        {text}
      </a>
    </Link>
  );
};

const Navbar = () => {
  const router = useRouter();
  const links = [
    "home",
    "blog",
    "guestbook",
    "stats",
    "photography",
    "shortener",
  ];

  return (
    <nav className="flex items-center justify-between capitalize">
      {links.map((link, index) => (
        <NavItem href={`/${link}`} text={link} router={router} key={index} />
      ))}
    </nav>
  );
};

export default Navbar;
