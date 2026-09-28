# Aerospace Club — Emerald High School

Website for the Aerospace Club at Emerald High School (Dublin, CA).

Plain HTML, CSS, and JavaScript. No build step, no npm install, no framework —
open the folder, edit a file, refresh the browser. That's the whole workflow.

```
index.html               the page structure
assets/css/style.css     all styling (design tokens at the top)
assets/js/data.js        ← ALL CLUB CONTENT LIVES HERE
assets/js/main.js        renders data.js into the page (rarely needs editing)
assets/img/              photos go here
```

---

## Run it locally

Easiest: double-click `index.html`.

Better (matches how it behaves when deployed) — run a local server from the
project folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

---

## Edit the content

**Everything a non-developer needs is in `assets/js/data.js`.** Open it in any
text editor. It's organized into labeled sections with comments.

Three rules:

1. Keep the `"quotes"` around text.
2. Keep the `,` at the end of each line.
3. Keep the `{ }` and `[ ]` brackets matched.

If the page goes blank after an edit, you broke one of those three. Open the
browser console (F12) — it will name the line.

### What's where

| Want to change… | Section in `data.js` |
| --- | --- |
| Club name, tagline, advisor, meeting time/room | `club` |
| The big numbers in the hero | `telemetry` |
| About text and the four "Build / Simulate / Compete / Launch" boxes | `mission` |
| Project cards | `projects` |
| Meetings, launches, competitions (and the countdown) | `events` |
| Officer cards | `officers` |
| Photo grid | `gallery` |
| Sign-up link, join steps | `join` |
| Instagram / Discord / email | `socials` |

### Placeholders

Anything written `TODO:` is something we didn't know — replace it before the
site goes public. Search the file for `TODO` to find them all:

```bash
grep -n "TODO" assets/js/data.js
```

No real names, dates, or statistics were invented. Every officer, meeting
time, event date, and count is a placeholder.

### Adding an event

The countdown is automatic — it always targets the **soonest event in the
future**. You never set it separately. Just add the event:

```js
{
  date: "2026-11-07T09:00",        // YYYY-MM-DDTHH:MM, 24-hour, local time
  title: "Fall Launch Day",
  kind: "Launch",                  // Meeting | Launch | Competition | Review
  place: "Snow Ranch",
  text: "Bring your permission slip and eye protection.",
},
```

Past events stay in the list and automatically grey out. Delete them whenever
you want.

### Adding photos

1. Put the image file in `assets/img/` (JPG or WebP, ~1600px wide is plenty).
2. Point at it in `data.js`:

```js
{ src: "assets/img/launch-day.jpg", alt: "Members loading a rocket onto the pad", caption: "Fall launch day" },
```

`alt` is required — it's what a screen reader reads aloud, and what shows if
the image fails to load. Describe what's actually in the photo.

Officer photos work the same way. Leave `photo: ""` and the card shows the
officer's initials instead, which looks fine — no rush to collect headshots.

### Changing the accent color

Top of `assets/css/style.css`:

```css
--accent: #5ee7ff;   /* cyan */
```

Change that one line and every button, highlight, and label follows.

---

## Deploy

### GitHub Pages (free, recommended)

1. Push to GitHub.
2. Repo → **Settings** → **Pages**.
3. Source: **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → **Save**.
4. Wait ~1 minute. Site is live at `https://<user>.github.io/aerospace-club/`.

Every push to `main` redeploys automatically. The `.nojekyll` file in the root
tells GitHub to serve the files as-is — leave it there.

### Vercel

1. <https://vercel.com/new> → import the repo.
2. Framework preset: **Other**. Build command: leave empty. Output directory: `./`
3. Deploy.

---

## Notes on how it's built

- **Accessibility**: semantic landmarks, skip link, visible focus rings, real
  `<button>`/`<dialog>` elements (the lightbox gets Esc-to-close and focus
  trapping from the browser, not from our code), alt text on every image.
- **Motion**: the starfield, orbital rings, and scroll reveals all check
  `prefers-reduced-motion` and switch off for visitors who've asked for that.
- **Performance**: no framework, no bundler, two Google fonts, one small
  canvas animation that pauses when the tab is hidden.
- **Safety**: all content from `data.js` is HTML-escaped before rendering, so a
  stray `<` in a project description can't break the page.

## Maintaining this

When officers change hands, the handoff is: read this file, then edit
`assets/js/data.js`. Nothing else is required.
