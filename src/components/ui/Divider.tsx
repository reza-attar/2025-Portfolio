import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

function Divider({ className }: { className?: ClassValue }) {
  return <hr className={cn("w-screen border-t border-divider", className)} />;
}

export default Divider;
