import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";
import {
  cn,
  getGithubLink,
  getLinkedinLink,
  getYoutubeLink,
} from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import DynamicLogo from "./Logo";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="mt-8 flex w-full items-center justify-center xl:justify-between xl:rounded-xl xl:border xl:border-white/25 xl:bg-white/25 print:hidden">
      <DynamicLogo size="small" className="xl:hidden" />
      <div className="hidden gap-10 p-4 text-16 xl:flex">
        <DynamicLogo size="small" />

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about"
                className={navigationMenuTriggerStyle()}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/works"
                className={navigationMenuTriggerStyle()}
              >
                Works
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/contact"
                className={navigationMenuTriggerStyle()}
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/resume"
                className={navigationMenuTriggerStyle()}
              >
                Resume
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* TODO: implement later */}
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>More</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink
                      target="_blank"
                      href={getResumeFileLink()}
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <PiReadCvLogoLight className="h-6 w-6" />
                      <div className="text-lg mb-2 mt-4 font-medium">
                        CV File
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Professionally designed portfolio showcasing skills and
                        career achievements.
                      </p>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/awards" title="Awards">
                    Recognized achievements earned through hard work.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="hidden items-center gap-6 p-4 text-24 xl:flex">
        <Link href={getYoutubeLink()} target="_blank">
          <FaYoutube />
        </Link>
        <Link href={getLinkedinLink()} target="_blank">
          <FaLinkedin />
        </Link>
        <Link href={getGithubLink()} target="_blank">
          <FaGithub />
        </Link>

        {/* TODO: animate */}
        <div className="h-6 border-r border-black/20"></div>
        <ThemeSwitch />
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm line-clamp-2 leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
