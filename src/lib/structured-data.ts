// schema.org data (JSON-LD) that tells search engines who the site is about.
// Facts come from content/resume.md and src/lib/site.ts; rendered with <JsonLd>.
import { resume } from "./resume";
import { site } from "./site";
import { getGithubLink, getLinkedinLink, getYoutubeLink } from "./utils";

const personId = `${site.url}/#person`;

export function person() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: site.url,
    image: `${site.url}/portrait.jpg`,
    description: site.tagline,
    jobTitle: resume.role,
    worksFor: { "@type": "Organization", name: resume.company },
    address: { "@type": "PostalAddress", addressCountry: resume.location },
    email: `mailto:${resume.email}`,
    alumniOf: resume.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    knowsAbout: resume.skills.flatMap((group) => group.items),
    sameAs: [
      getLinkedinLink(),
      getGithubLink(),
      getYoutubeLink(),
      resume.links.stackOverflow,
    ],
  };
}

// Home page: the site and the person it belongs to
export function websiteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.tagline,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      person(),
    ],
  };
}

// About page: Google's profile-page result
export function profilePage() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${site.url}/about`,
    mainEntity: person(),
  };
}

// Case studies: Home › Works › <name>
export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
