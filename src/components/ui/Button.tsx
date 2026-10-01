import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

export const buttonVariants = cva(
  "w-full inline-flex rounded-lg border border-transparent font-medium transition-all justify-center items-center px-[31px] py-[15px] font-inter font-medium gap-2 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-[3px]",
  {
    variants: {
      variant: {
        primary:
          "bg-dark-gradient text-white dark:bg-none dark:bg-[#F5F5F5] dark:text-black",
        secondary: "border-control-border bg-control text-control-fg",
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
