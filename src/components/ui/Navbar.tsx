"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { PiReadCvLogoFill, PiReadCvLogoLight } from "react-icons/pi";
import {
  RiHome9Fill,
  RiHomeLine,
  RiPencilFill,
  RiPencilLine,
  RiSuitcase2Fill,
  RiSuitcase2Line,
  RiUser2Fill,
  RiUser2Line,
} from "react-icons/ri";

const items: Item[] = [
  {
    link: "/",
    ActiveIcon: RiHome9Fill,
    PassiveIcon: RiHomeLine,
    label: "Home",
  },
  {
    link: "/about",
    ActiveIcon: RiUser2Fill,
    PassiveIcon: RiUser2Line,
    label: "About",
  },
  {
    link: "/works",
    ActiveIcon: RiSuitcase2Fill,
    PassiveIcon: RiSuitcase2Line,
    label: "Works",
  },
  {
    link: "/contact",
    ActiveIcon: RiPencilFill,
    PassiveIcon: RiPencilLine,
    label: "Contact",
  },
  {
    link: "/resume",
    ActiveIcon: PiReadCvLogoFill,
    PassiveIcon: PiReadCvLogoLight,
    label: "Resume",
  },
] as const;

type Item = {
  link: string;
  label: string;
  PassiveIcon: IconType;
  ActiveIcon: IconType;
  target?: "_blank";
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-3 flex min-w-[358px] justify-between rounded-xl border border-nav-border/30 bg-nav-background/80 px-4 py-2.5 backdrop-blur dark:border-nav-border/40 dark:bg-nav-background/60 xl:hidden print:hidden">
      {items.map((item) => (
        <Item key={item.link} isActive={item.link === pathname} {...item} />
      ))}
    </nav>
  );
}

type ItemProps = {
  isActive?: boolean;
} & Item;
const Item = ({
  isActive,
  ActiveIcon,
  PassiveIcon,
  link,
  label,
  target,
}: ItemProps) => {
  return (
    <Link
      href={link}
      target={target}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "grid h-10 w-14 place-items-center rounded-xl text-white-faint",
        isActive
          ? "w-14 rounded-xl bg-black/50 text-white"
          : "hover:bg-black/20",
      )}
    >
      {isActive ? (
        <ActiveIcon aria-hidden="true" className="text-24" />
      ) : (
        <PassiveIcon aria-hidden="true" className="text-24" />
      )}
    </Link>
  );
};
