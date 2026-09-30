import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

export const buttonVariants = cva(
  "w-full inline-flex rounded-lg font-medium transition-all justify-center items-center px-8 py-4 font-inter font-medium gap-2",
  {
    variants: {
      variant: {
        primary: "dark:drop-shadow-button bg-dark-gradient text-white",
        secondary: "bg-white-faint text-onyx dark:text-gray-dark dark:bg-onyx ",
        text: "",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode;
  suffix?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  icon,
  suffix,
  variant,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn("text-18", buttonVariants({ variant }), className)}
      {...props}
    >
      {icon}
      {children}
      {suffix}
    </button>
  );
};
