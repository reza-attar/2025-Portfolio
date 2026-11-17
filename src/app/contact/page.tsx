import Divider from "@/components/ui/Divider";
import ContactLinks from "@/features/contact/components/ContactLinks";
import ContactWindow from "@/features/contact/components/ContactWindow";
import { pageMetadata } from "@/lib/metadata";
import { resume } from "@/lib/resume";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = pageMetadata({
  title: `Contact · ${site.name}`,
  description: `Write to ${site.name} about a product that needs the database, backend, AI layer and interface built together.`,
  path: "/contact",
});

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

      <ContactWindow email={resume.email} />

      <ContactLinks email={resume.email} />
    </main>
  );
}

export default ContactPage;
