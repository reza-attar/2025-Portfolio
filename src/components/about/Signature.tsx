import Image from "next/image";

// Scales down below 329px so the About page fits narrow phones
const size = "h-auto w-[329px] max-w-full";

// Both signatures are plain images and CSS shows the one for the current theme, so this
// needs no client JavaScript and nothing swaps after hydration. Lazy loading means the
// hidden one (display: none) is never downloaded.
export default function Signature() {
  return (
    <>
      <Image
        unoptimized
        loading="lazy"
        src="/Signature/signature-black.svg"
        width={329}
        height={203}
        alt=""
        aria-hidden="true"
        className={`${size} dark:hidden`}
      />
      <Image
        unoptimized
        loading="lazy"
        src="/Signature/signature-white.svg"
        width={329}
        height={203}
        alt=""
        aria-hidden="true"
        className={`${size} hidden dark:block`}
      />
    </>
  );
}
