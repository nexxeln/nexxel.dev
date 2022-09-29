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
          "text-md mr-4 md:mr-6 md:text-lg",
          isActive
            ? "medium-text font-medium text-t-pink"
            : "transition-colors duration-300 hover:text-t-pink"
        )}
      >
        {text}
      </a>
    </Link>
  );
};

const Navbar = () => {
  const router = useRouter();
  const links = ["home", "blog", "guestbook", "FAQ", "more"];

  return (
    <nav className="mx-auto flex max-w-sm items-center justify-between capitalize">
      {links.map((link, index) => (
        <NavItem
          href={`/${link === "FAQ" ? "faq" : link}`}
          text={link}
          router={router}
          key={index}
        />
      ))}
    </nav>
  );
};

export default Navbar;
