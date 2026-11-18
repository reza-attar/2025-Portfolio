import { profile } from "@/lib/profile";
import { generateEmailLink } from "@/lib/utils";
import Button from "@/shared/components/ui/Button";
import Icon from "@/shared/components/ui/Icon";

export default function ContactApp() {
  const { links } = profile;
  return (
    <div className="app app-contact">
      <h1 className="h2">Let&apos;s talk.</h1>
      <p className="lede">{profile.availability}. Email is the fastest way to reach me.</p>
      <dl className="kv">
        <dt>email</dt>
        <dd>{links.email}</dd>
        <dt>tz</dt>
        <dd>{profile.timezone} (UTC+3:30)</dd>
      </dl>
      <div className="actions">
        <Button variant="primary" href={generateEmailLink({ to: links.email, subject: "Hello from reza.os", body: "" })}>
          <Icon name="mail" size={18} /> Email me
        </Button>
        <Button href={links.github} target="_blank" rel="noopener noreferrer">
          <Icon name="github" size={18} /> GitHub
        </Button>
        <Button href={links.linkedin} target="_blank" rel="noopener noreferrer">
          <Icon name="linkedin" size={18} /> LinkedIn
        </Button>
      </div>
    </div>
  );
}
