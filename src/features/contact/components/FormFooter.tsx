import SubmitButton from "./SubmitButton";

export default function FormFooter({ email }: { email: string }) {
  return (
    <div className="mb-6 flex flex-col-reverse gap-4 xl:flex-row xl:items-center xl:justify-between">
      <p className="text-14 text-ink-muted">
        Goes straight to my inbox
        <span className="hidden xl:inline">
          {" "}
          (<kbd className="font-inter">⌘/Ctrl ↵</kbd> sends)
        </span>
        . Rather use your mail app? Write to{" "}
        <a
          href={`mailto:${email}`}
          className="rounded-[3px] text-ink-strong underline underline-offset-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          {email}
        </a>
        .
      </p>
      <SubmitButton />
    </div>
  );
}
