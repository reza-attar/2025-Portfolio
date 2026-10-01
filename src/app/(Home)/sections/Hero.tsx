import { buttonVariants } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import Portrait from "@public/portrait.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-label="introduction"
      className="relative mt-40 flex flex-wrap items-center gap-6"
    >
      <div className="flex-1 basis-[420px] space-y-6 xl:space-y-10">
        <h1 className="text-balance text-48 font-extrabold leading-[1.1] text-ink-muted xl:text-80">
          I&apos;m <span className="text-ink-strong">{site.name}</span>
        </h1>
        <p className="text-15 font-medium leading-[1.4] text-ink-muted xl:max-w-[70%] xl:text-24">
          {site.role} with{" "}
          <span className="font-bold text-ink-strong">{site.experience}</span>{" "}
          of production TypeScript.
          <br />I build the whole path from{" "}
          <span className="font-bold text-ink-strong">schema to interface</span>
          , with Next.js, NestJS and PostgreSQL.
          <br />
          Currently leading{" "}
          <span className="font-bold text-ink-strong">AI products</span> built
          on RAG and LLMs.
        </p>
        <div aria-label="call to actions" className="flex flex-wrap gap-4">
          <Link
            href={"/resume"}
            className={cn("text-18", buttonVariants({ variant: "primary" }))}
          >
            See my Resume
          </Link>
          <Link
            href={"/contact"}
            className={cn("text-18", buttonVariants({ variant: "secondary" }))}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      <Image
        width={540}
        height={540}
        quality={100}
        src={Portrait}
        priority={false}
        placeholder="blur"
        alt={`${site.name} portrait`}
        className="mx-auto aspect-square w-[min(100%,460px)] rounded-full object-cover xl:flex-[0_1_460px]"
      />
    </section>
  );
}
