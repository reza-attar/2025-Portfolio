import { Button } from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import PortraitImage from "@public/portrait.jpg";
import { SendHorizontal } from "lucide-react";

import { getYoutubeLink } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Signature from "@/components/about/Signature";

export default function AboutPage() {
  return (
    <main className="mt-20 max-w-screen-lg space-y-16 [&>*]:px-4">
      <section className="max-w-[80%] space-y-2">
        <h1 className="sr-only">About Reza Attar</h1>
        <h2 className="text-48 font-bold xl:text-80">A little bit about me</h2>
        <h2 className="text-16 text-gray-medium xl:text-24">
          Who I am and what I do.
        </h2>
      </section>

      <Divider className="w-full" />

      <div className="space-y-16 xl:flex xl:flex-row-reverse xl:justify-between xl:space-y-0">
        <div className="xl:space-y-24">
          <Image
            width={250}
            height={322}
            quality={100}
            priority={false}
            placeholder="blur"
            src={PortraitImage}
            className="rounded-lg border object-cover dark:border-gray-dark xl:h-[443px] xl:w-[344px]"
            alt="a portrait of Reza Attar"
          />
          <Button
            variant={"primary"}
            icon={<SendHorizontal />}
            className="mx-auto hidden w-fit xl:flex"
          >
            <Link href={"/contact"}>Get in touch</Link>
          </Button>
        </div>

        <div className="space-y-16 xl:max-w-[50%]">
          <div className="space-y-8 [&>div>h3]:text-16 [&>div>h3]:font-semibold [&>div>h3]:dark:text-gray-dark/50 [&>div>p]:text-15 [&>div>p]:text-gray-dark xl:[&>div>p]:text-18 [&>div]:space-y-2">
            <div>
              <h3>WHO I AM</h3>
              <p>
                I&apos;m <span className="text-onyx dark:text-white">Reza</span>
                (Pronounced “Rezâ”) a front-end engineer and back-end engineer
                based in Iran 🇮🇷.
              </p>
            </div>
            <div>
              <h3>WHAT I DO</h3>
              <p>
                With 9 years of experience in my different roles at different
                companies! I decided to grow my personal brand! I have honed my
                skills in ReactJS, NextJS, Tailwindcss, Typescript, Cypress,
                NodeJS, Vitest. Started a{" "}
                <Link
                  target="_blank"
                  href={getYoutubeLink()}
                  className="text-onyx underline dark:text-white"
                >
                  Youtube Channel
                </Link>{" "}
                since 2024 to teach people and help the people in need!
              </p>
            </div>
            <div>
              <h3>WHAT I DID</h3>
              <p>
                Before becoming a software engineer I was always curious how
                electronic devices work, Starting with linux and continued my
                journey in Wordpress, It boosts me up up by tons! This was from
                the age of 15, Attended to three coding contests in Tehran
                Sharif University and{" "}
                <span className="text-onyx dark:text-white">won</span> two of
                them and got the 3rd place with my friends and teammates!
              </p>
            </div>
          </div>
          <p className="text-15 text-gray-dark [&>a]:text-onyx [&>a]:underline [&>a]:dark:text-white">
            Feel free to reach out via{" "}
            <Link href={"mailto:attarzadeh76@gmail.com"}>e-mail</Link> or
            <Link href={"/resume"}>Resume</Link>, or Connect with me on{" "}
            <Link href={"link to linkedin"}>LinkedIn</Link>.
          </p>
          <div className="space-y-4">
            <h5 className="xl:hidden">Let&apos;s build something great,</h5>
            <Signature />
          </div>
        </div>
      </div>

      <div className="xl:hidden">
        <Button variant={"primary"} icon={<SendHorizontal />}>
          <Link href={"/contact"}>Get in touch</Link>
        </Button>
      </div>
    </main>
  );
}
