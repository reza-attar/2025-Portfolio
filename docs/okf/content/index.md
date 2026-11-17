# Content and data

The files that hold the words and numbers on the site. Who owns what is summarised in [sources of truth](/architecture/data-flow.md).

* [Resume source](resume-source.md) - `content/resume.md`: the format the parser accepts, field by field.
* [Site preferences](site-preferences.md) - `src/lib/site.ts`: branding, URL, tagline, nav and wording only the site uses.
* [Case studies](case-studies.md) - `src/lib/case-studies.ts`: the data model and the six studies.
* [Projects](projects.md) - `src/lib/projects.ts`: the cards on /works and the home page, and their order.
* [Layers](layers.md) - `src/lib/layers.ts`: Data, Backend, AI and Interface, with colours and metrics.
* [Highlights](highlights.md) - `src/lib/highlights.ts`: the four headline numbers on the home page.
* [Open source](open-source.md) - `src/lib/open-source.ts`: contributions, empty for now.
