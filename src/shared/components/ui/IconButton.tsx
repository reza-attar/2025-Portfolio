import type { ButtonHTMLAttributes } from "react";
import Icon, { type IconName } from "./Icon";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
  icon: IconName;
  variant?: "plain" | "danger";
  size?: "sm" | "md";
};

// Square icon-only button; the label is its accessible name and tooltip
export default function IconButton({ label, icon, variant = "plain", size = "md", className, ...rest }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`icon-btn icon-btn-${size} icon-btn-${variant}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <Icon name={icon} size={size === "sm" ? 16 : 20} />
    </button>
  );
}
