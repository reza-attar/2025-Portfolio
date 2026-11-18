import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark";
type Common = { variant?: Variant; size?: "md" | "lg"; children: ReactNode; className?: string };

type Props =
  | (Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">)
  | (Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">);

// Chunky outlined button with an offset shadow. Renders <a> when `href` is set.
// One primary (orange) button per window.
export default function Button({ variant = "secondary", size = "md", className, ...rest }: Props) {
  const cls = `btn btn-${variant} btn-${size}${className ? ` ${className}` : ""}`;
  if (rest.href !== undefined) return <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  return <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
