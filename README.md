# Personal site — Muhamad Ariffadhlullah

Portfolio and one-page CV for **Muhamad Ariffadhlullah**, software engineering student at Politeknik Negeri Batam.

Live: [https://grey21onyx.github.io/Personal](https://grey21onyx.github.io/Personal)

Design direction: **onyx editorial** — warm charcoal, bone type and muted brass; Instrument Serif for display, Archivo for body, JetBrains Mono for labels. No frameworks, no build step, no tracking.

## Structure

```
index.html                        all content lives here
css/style.css                     design system, layout, responsive + print rules
js/script.js                      theme toggle, local time, scroll index, reveals
assets/
  fonts/                          self-hosted woff2 (Instrument Serif, Archivo, JetBrains Mono)
  profile.jpg                     portrait (shown in greyscale; colour on hover)
  Muhamad-Ariffadhlullah-CV.pdf   downloadable one-page CV
  favicon.svg                     favicon
  og.png                          1200×630 social share card
```

## Editing

- **Copy** — edit `index.html` directly. Each project is a `<details>` row; the summary is the closed state, the `.work-body` block is the expanded state.
- **Links** — certificate and transcript links point at the Polibatam PBL portal with NIM `4342401070`. Verify they still resolve before publishing changes.
- **CV** — replace `assets/Muhamad-Ariffadhlullah-CV.pdf` with the new export and keep the filename so both download buttons keep working.
- **Portrait** — replace `assets/profile.jpg` (square source, cropped to 4:5 by CSS). The greyscale treatment in `.portrait-frame img` neutralises a coloured backdrop; remove the `filter` if you prefer full colour.
- **Social card** — update `assets/og.png` if the headline changes.

## Local preview

```bash
# from this folder
npx --yes serve .          # or: python -m http.server 8000
```

Then open the printed localhost URL. Opening `index.html` directly from disk also works, but fonts behave better over HTTP.

## Deploy (GitHub Pages)

```bash
git add index.html css js assets README.md
git commit -m "Redesign portfolio"
git push origin main
```

Pages serves the repository root on `main`. The site has no runtime dependencies, so nothing else needs configuring. Relative asset paths work both at `grey21onyx.github.io/Personal/` and on a custom domain.

## Accessibility & behaviour

- Light/dark themes share one token set; the choice is stored in `localStorage`.
- All motion is disabled under `prefers-reduced-motion: reduce`.
- Project rows are native `<details>`/`<summary>`, so they keyboard-navigate and expand without JavaScript.
- Section links use `aria-current`; a skip link is the first tab stop.
- Body text meets WCAG AA on both themes; colour is never the only signal.

## Facts to confirm before applying

Written from the project briefs, PBL transcripts and certificates:

1. **LagiButuh stack** — listed as Flutter · Laravel · MySQL. Adjust if the implementation settled on something else.
2. **Internship availability** — the hero reads “Open to internships · Batam / remote”. Narrow this if you have a specific period.
3. **IPK / GPA** — intentionally omitted. Add it if your transcript is strong and the application asks for it.
4. **English level** — not stated, since no score was provided.
5. **Photo** — the current portrait has a red backdrop; the site desaturates it. A plain grey or white studio backdrop would read better on a CV.
