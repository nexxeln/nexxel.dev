import Link from "next/link";
import { NextRouter } from "next/router";
import { FC } from "react";

const NavItem: FC<{ href: string; text: string; router: NextRouter }> = ({
  href,
  text,
  router,
}) => {
  const isActive = router.pathname === (href === "/home" ? "/" : href);

  return <Link href={href === "/home" ? "/" : href}></Link>;
};
