# Pages

Every route opens a window on the desktop ([window manager](/architecture/window-manager.md)).
Machine-readable routes are in [endpoints](/endpoints/index.md).

* [Windows](windows.md) - `/`, `/projects`, `/projects/<slug>`, `/stack`, `/resume`, `/contact`, `/trash`: what each window shows.
* [Not found](not-found.md) - The 404 page.

# Shared frame

`src/app/layout.tsx` wraps every route in `Shell`: the taskbar (logo/system
menu, nav links, window tray, wallpaper and theme buttons, Tehran clock,
"Hire me"), the desktop with its icons, and a polite live region. Fonts,
the no-flash script and Vercel Analytics are set up there too.
