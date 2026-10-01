import { Headphones } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function Label({ children }: Props) {
  return (
    <div className="rounded-3xl border border-tag-border bg-tag px-3 py-1.5 text-14 text-tag-fg">
      {children}
    </div>
  );
}

export const AudioBook = () => {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-full border border-onyx/25 bg-gray-dark text-white">
      <Headphones />
    </div>
  );
};
