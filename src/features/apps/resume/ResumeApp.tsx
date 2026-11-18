import { RESUME_PDF_PATH } from "@/lib/resume";
import Button from "@/shared/components/ui/Button";
import Icon from "@/shared/components/ui/Icon";
import ResumeExtras from "./ResumeExtras";
import ResumePaper from "./ResumePaper";

// A paper-style preview of the resume (content/resume.md), with the PDF one click away
export default function ResumeApp() {
  return (
    <div className="app app-resume">
      <div className="pdf-toolbar">
        <span className="mono-sm">resume.pdf · A4</span>
        <span className="pdf-actions">
          <a className="mono-sm link" href="/resume.md">
            resume.md
          </a>
          <Button variant="primary" href={RESUME_PDF_PATH} download>
            <Icon name="download" size={18} /> Download PDF
          </Button>
        </span>
      </div>
      <div className="paper">
        <ResumePaper />
        <ResumeExtras />
      </div>
    </div>
  );
}
