# Diona Technologies — Assignment 1
## Dynamic Document Replication (HTML / CSS / JavaScript)

This repository contains two standalone, dynamically data-driven web pages that
replicate the layout, structure, and pagination behaviour of two WCB Manitoba
PDF forms:

1. **Worker Progress Report** — [`/worker-progress-report/index.html`](./worker-progress-report/index.html)
2. **Medical & Travel Expense Request** — [`/medical-travel-expense/index.html`](./medical-travel-expense/index.html)

Both are built with plain HTML, CSS, and vanilla JavaScript — no frameworks or
build step. Open either `index.html` directly in a browser, or serve the
folder with any static file server.

---

## What "dynamic" means here

Every visible piece of content that differs between real submissions of these
forms is driven by a JavaScript data object, **not hardcoded into the HTML**:

- Worker name, claim number, worker app ID, submitted timestamp
- Every checkbox selection (which option is ticked)
- Every filled-in date, name, and free-text field
- The 1–10 pain scale selection
- All six expense tables in the Medical & Travel form — each can hold **zero,
  one, or many rows**, and the page automatically re-paginates (adds/removes
  pages) as row counts change, matching how the source PDF grows past a page.

Each form ships with:
- **A toolbar** to switch between 3 sample datasets instantly (including an
  edge case with zero rows/blank fields, and a "heavy" case with many rows to
  demonstrate re-pagination).
- **A live "Edit" panel** to change any field or add/remove table rows by
  hand and re-render immediately.
- **A Print / Save as PDF button** — the CSS includes real `@media print`
  rules so the page breaks correctly onto Letter-sized pages if exported.

## Repository structure

```
wcb-forms/
├── worker-progress-report/
│   ├── index.html        # page shell, toolbar, editor panel
│   ├── sample-data.js     # 3 sample datasets + option-label maps
│   ├── render.js          # builds the 3-page HTML from a data object
│   └── editor.js           # wires up the live edit panel + dataset switcher
├── medical-travel-expense/
│   ├── index.html
│   ├── sample-data.js     # 3 sample datasets (incl. empty & heavy cases)
│   ├── render.js          # builds table blocks + auto-paginates by
│   │                       #   estimated block height
│   └── editor.js           # per-table add/remove-row UI
├── assets/
│   ├── base.css            # shared styling for both forms (header, footer,
│   │                       #   checkboxes, tables, print rules)
│   └── logo.svg             # recreated WCB-style logo mark (see note below)
└── ai-assistance/
│   ├── ai-prompt-history.md   # full prompt log (see AI usage section)
│   ├── worker-progress-report-video.md   # link to narrated video
│   └── medical-travel-expense-video.md   # link to narrated video
├──video/
│   ├──worker-progress-report-video.mp4
│   └──medical-travel-expense-video.mp4
```

## How pagination works

**Worker Progress Report** has a fixed 3-page structure in the source PDF, so
`render.js` renders 3 fixed page sections. All dynamic content changes what
appears *inside* those pages, not how many there are.

**Medical & Travel Expense Request** doesn't have a fixed page count — the
source PDF re-flows depending on how many expense rows exist. To replicate
that, `render.js` builds each of the 6 tables as an independent "block" with
an estimated pixel height (header + note + row count × row height), then
greedily packs blocks onto pages against a fixed body-height budget, starting
a new page when the next block would overflow. This is why the "Many rows"
sample dataset produces 2 pages with a different split point than the
"Original" dataset, and the "No expenses" dataset still produces a full,
correctly laid-out 2-page document with "None reported" placeholders.

## Assumptions made

Since I only had the rendered PDFs (not the original form spec or design
system) to work from, I made these assumptions:

- **Logo**: The actual WCB Manitoba logo image wasn't extractable in usable
  form, so `assets/logo.svg` is a recreated placeholder mark in a similar
  style/color, not the official asset. This is disclosed for transparency —
  swap it for the real logo file if required.
- **Exact fonts**: The PDFs use a serif body face consistent with Times/
  Georgia; I used Georgia as the closest widely-available web-safe match.
- **Field validation states** (e.g. what happens if two mutually-exclusive
  checkboxes are somehow both true in the data) are not enforced — the
  sample data is trusted to be well-formed, since the form is a read-only
  *display* of already-submitted data, not an interactive form for the
  worker to fill in.
- Blue-colored text in the PDFs is used for **worker-submitted values**
  (vs. black static labels) — I preserved that convention.

## AI usage disclosure

AI assistance (Claude) was used during this assignment for planning the
approach, generating the initial HTML/CSS/JS structure, and the pagination
estimation logic. The full prompt history is in
[`docs/ai-prompt-history.md`](./ai-assistance/ai-prompt-history.md), and this is also
called out in both narrated videos as required.

## Videos

- Worker Progress Report walkthrough: see [`docs/worker-progress-report-video.md`](./docs/worker-progress-report-video.md)
- Medical & Travel Expense Request walkthrough: see [`docs/medical-travel-expense-video.md`](./docs/medical-travel-expense-video.md)
