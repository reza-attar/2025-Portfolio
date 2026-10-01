"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = [
  { label: "About", href: "/about" },
  { label: "Works", href: "/works" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              href={item.href}
              active={pathname === item.href}
              className={cn(
                navigationMenuTriggerStyle(),
                "text-ink hover:bg-nav-hover hover:text-ink focus:bg-nav-hover focus:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[active]:bg-nav-hover",
              )}
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
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
  );
}
