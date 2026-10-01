import Link from "next/link";
import DynamicLogo from "./Logo";
import Divider from "./ui/Divider";
import { site } from "@/lib/site";
import { getGithubLink, getLinkedinLink, getYoutubeLink } from "@/lib/utils";

export default function Footer() {
  return (
    <div className="mt-32 print:hidden">
      <Divider />
      <footer className="mx-auto max-w-screen-lg space-y-12 pb-24 pl-4 pt-12 text-ink-muted xl:flex xl:flex-row-reverse xl:justify-between xl:space-y-0">
        <div className="space-y-10 xl:flex xl:flex-row-reverse xl:gap-32 xl:space-y-0">
          <div className="flex flex-col gap-4">
            <h2 className="mb-4 text-16 font-bold text-ink-strong">
              Elsewhere
            </h2>
            <Link
              target="_blank"
              href={"/contact"}
              className="w-fit rounded hover:text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
            >
              Email
            </Link>
            <Link
              target="_blank"
              href={getYoutubeLink()}
              className="w-fit rounded hover:text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
            >
              Youtube
            </Link>
            <Link
              target="_blank"
              href={getLinkedinLink()}
              className="w-fit rounded hover:text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
            >
              LinkedIn
            </Link>
            <Link
              target="_blank"
              href={getGithubLink()}
              className="w-fit rounded hover:text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
            >
              Github
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="mb-4 text-16 font-bold text-ink-strong">Links</h2>
            <Link
              href={"/about"}
              className="w-fit rounded hover:text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
            >
              About
            </Link>
            <Link
              href={"/works"}
              className="w-fit rounded hover:text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
            >
              Work
            </Link>
            <Link
              href={"/contact"}
              className="w-fit rounded hover:text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
            >
              Contact
            </Link>
            <Link
              href={"/resume"}
              className="w-fit rounded hover:text-ink-strong hover:underline hover:underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus"
            >
              Resume
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <DynamicLogo size="large" />
            <p>Thanks for stopping by ッ </p>
          </div>
          <p className="text-14">© 2026 {site.name}. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
