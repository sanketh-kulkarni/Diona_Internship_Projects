# AI Prompt History

Per the assignment requirements, this document discloses how AI (Claude, by
Anthropic) was used while building this submission.

## Tool used
Claude (claude.ai), used conversationally to plan the approach and generate
initial code, which was then reviewed, tested, and adjusted.

## Summary of how AI was used

1. **Understanding the assignment** — shared the JD and the assignment brief
   (two PDF forms to replicate: Worker Progress Report, Medical & Travel
   Expense Request) and asked for a breakdown of what's static vs. dynamic
   in each document before any code was written.

2. **Architecture planning** — asked for a plan covering: project structure,
   how to represent form data in JS, how to handle the fixed-3-page form vs.
   the variable-page-count table-driven form, and how to support both
   pre-built sample datasets and live editing, per the assignment's request
   to demonstrate the page working with different data set sizes.

3. **Code generation** — asked Claude to generate:
   - the shared `base.css` (header/footer/checkbox/table/print styling)
   - `sample-data.js`, `render.js`, and `editor.js` for each form
   - the pagination-estimation logic in the Medical & Travel Expense form's
     `render.js` (block height estimation + greedy page-packing)

4. **Verification** — asked Claude to render both pages in a headless
   browser and screenshot them (including edge cases: zero-row dataset,
   many-row dataset, print media emulation) to visually check fidelity
   against the source PDFs before finalizing.

5. **Documentation** — asked Claude to draft this prompt-history file, the
   main README, and the video-outline docs.

## What was NOT AI-generated
- The final visual proofreading against the original PDFs was reviewed
  manually.
- The narrated videos, their explanations, and the "challenges faced"
  discussion are original and recorded by hand.
- Any GitHub repository setup, commit history, and the final submission
  itself.

## Representative prompts (paraphrased from the actual conversation)

- "I'm selected for assignment round for Diona technologies internship" →
  shared the internship JD for context.
- Shared the assignment instructions (submission format, video
  requirements, deadline) and the two source PDFs, and asked for help
  building the HTML/CSS/JS replicas.
- Asked whether output should support print/PDF export matching real page
  breaks, and whether sample data should be hardcoded JSON, a live-editable
  UI, or both — chose "both" and let Claude decide the print-support
  question based on the source material being paginated PDFs.
- Asked Claude to build both forms end-to-end: shared data layer, render
  logic, editor UI, and to verify visually via screenshots before writing
  the README and this disclosure file.
