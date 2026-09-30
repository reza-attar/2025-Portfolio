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
  },
  {
    link: "/about",
    ActiveIcon: RiUser2Fill,
    PassiveIcon: RiUser2Line,
  },
  {
    link: "/works",
    ActiveIcon: RiSuitcase2Fill,
    PassiveIcon: RiSuitcase2Line,
  },
  {
    link: "/contact",
    ActiveIcon: RiPencilFill,
    PassiveIcon: RiPencilLine,
  },
  {
    link: "/resume",
    ActiveIcon: PiReadCvLogoFill,
    PassiveIcon: PiReadCvLogoLight,
  },
] as const;

type Item = {
  link: string;
  PassiveIcon: IconType;
  ActiveIcon: IconType;
  target?: "_blank";
};

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-3 flex min-w-[358px] justify-between rounded-xl border border-nav-border/30 bg-nav-background/30 px-4 py-2.5 dark:border-nav-border/40 dark:bg-nav-background/60 xl:hidden print:hidden">
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
  target,
}: ItemProps) => {
  return (
    <Link
      href={link}
      target={target}
      className={cn(
        "grid h-10 w-14 place-items-center rounded-xl text-white-faint",
        isActive
          ? "w-14 rounded-xl bg-black/50 text-white"
          : "hover:bg-black/20",
      )}
    >
      {isActive ? (
        <ActiveIcon className="text-24" />
      ) : (
        <PassiveIcon className="text-24" />
      )}
    </Link>
  );
};
