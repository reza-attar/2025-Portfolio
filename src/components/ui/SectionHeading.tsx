import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

type Props = {
  // Two-digit position on the page, e.g. "02"
  index: string;
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  className?: ClassValue;
};

export default function SectionHeading({
  index,
  kicker,
  title,
  description,
  className,
}: Props) {
  return (
    <div className={cn("mb-6 space-y-2 xl:mb-10", className)}>
      <p className="font-mono text-13 text-ink-faint">
        <span aria-hidden="true">// </span>
        {index} {kicker}
      </p>
      <h2 className="text-balance text-32 font-bold leading-[1.15] text-ink-strong xl:text-48">
        {title}
      </h2>
      {description && (
        <p className="max-w-[60ch] text-pretty text-15 leading-[1.5] text-ink-muted xl:text-18">
          {description}
        </p>
      )}
    </div>
  );
}
