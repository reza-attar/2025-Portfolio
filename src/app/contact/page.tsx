import Divider from "@/components/ui/Divider";
import Close from "@public/Contact Window/close.svg";
import Fullscreen from "@public/Contact Window/fullscreen.svg";
import Minimize from "@public/Contact Window/minimize.svg";
import { MdEmail } from "react-icons/md";
import { generateEmailLink, getGithubLink, getLinkedinLink } from "@/lib/utils";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import ContactForm from "./form";

function ContactPage() {
  return (
    <main className="mt-20 flex w-full max-w-screen-lg flex-col gap-16 px-4">
      <section className="max-w-[80%] space-y-2">
        <h1 className="text-48 font-bold leading-[1.1] text-ink-strong xl:text-80">
          Get in touch
        </h1>
        <h2 className="text-16 text-ink-faint xl:text-24">
          Let&apos;s build something awesome.
        </h2>
      </section>

      <Divider className="w-full" />

      <section
        aria-label="contact window"
        className="bg-win flex flex-col gap-6 rounded-xl border border-panel-border px-4"
      >
        <div
          className="relative border-b border-win-line py-4 text-center"
          aria-label="contact window header"
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-[50%] flex -translate-y-[50%] items-center gap-2 p-1"
          >
            <Close />
            <Minimize />
            <Fullscreen />
          </div>
          <h2 className="text-16 font-medium text-ink-strong">New message</h2>
        </div>

        <ContactForm />
      </section>

      <section
        aria-label="link to other social medias"
        className="mx-auto flex w-fit justify-center gap-11 text-24"
      >
        <a
          href={generateEmailLink({})}
          aria-label="Email"
          className="grid h-11 w-11 place-items-center rounded-md text-ink-strong hover:bg-nav-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <MdEmail aria-hidden="true" />
        </a>
        <Link
          href={getLinkedinLink()}
          target="_blank"
          aria-label="LinkedIn (opens in new tab)"
          className="grid h-11 w-11 place-items-center rounded-md text-ink-strong hover:bg-nav-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <FaLinkedin aria-hidden="true" />
        </Link>
        <Link
          href={getGithubLink()}
          target="_blank"
          aria-label="GitHub (opens in new tab)"
          className="grid h-11 w-11 place-items-center rounded-md text-ink-strong hover:bg-nav-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <FaGithub aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}

export default ContactPage;
