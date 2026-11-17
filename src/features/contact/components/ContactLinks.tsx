import { getGithubLink, getLinkedinLink } from "@/lib/utils";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const linkClass =
  "grid h-11 w-11 place-items-center rounded-md text-ink-strong transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-nav-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export default function ContactLinks({ email }: { email: string }) {
  return (
    <section
      aria-label="link to other social medias"
      className="mx-auto flex w-fit justify-center gap-11 text-24"
    >
      <a href={`mailto:${email}`} aria-label="Email" className={linkClass}>
        <MdEmail aria-hidden="true" />
      </a>
      <Link href={getLinkedinLink()} target="_blank" aria-label="LinkedIn (opens in new tab)" className={linkClass}>
        <FaLinkedin aria-hidden="true" />
      </Link>
      <Link href={getGithubLink()} target="_blank" aria-label="GitHub (opens in new tab)" className={linkClass}>
        <FaGithub aria-hidden="true" />
      </Link>
    </section>
  );
}
