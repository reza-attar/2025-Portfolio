# Pages

Routes a visitor opens in the browser. Machine-readable routes are in [endpoints](/endpoints/index.md).

* [Home](home.md) - `/`: the hero with the system diagram, then highlights, layers, the current product, work, experience and widgets.
* [About](about.md) - `/about`: portrait, "At a glance", the short story and the job list.
* [Works](works.md) - `/works`: every project card, then "More case studies".
* [Case study](case-study.md) - `/works/<slug>`: the template shared by the six case-study pages.
* [Contact](contact.md) - `/contact`: a mail-window form that opens the visitor's email app.
* [Resume](resume.md) - `/resume`: the full resume, with linkable sections and print styles.
* [Not found](not-found.md) - The 404 page.

# Shared frame

Every page is wrapped by `src/app/layout.tsx`: the desktop `Header`, the
`Footer`, the mobile `Navbar` (bottom bar below the `xl` breakpoint), two
decorative gradient images, the theme provider and Vercel Analytics. See
[components](/design/components.md).
