# Medical & Travel Expense Request — Narrated Video

**Video link:** _(add your YouTube/Loom/Drive link here, or place the video
file directly in this repo, e.g. `docs/medical-travel-expense-video.mp4`, and
update this link accordingly)_

## What the video should cover (per assignment instructions)

1. **Understanding & assumptions** — explain that this form displays six
   independent expense categories as tables, and that page count is not
   fixed — it depends on data volume. Call out the assumptions in the main
   [README](../README.md#assumptions-made).
2. **Live dynamic demo — this is the key part for this form**:
   - Switch to **"No expenses submitted"** and show all 6 tables correctly
     render "None reported" with no layout breakage, still producing a
     correct 2-page document.
   - Switch to **"Many rows (auto re-paginates)"** and show the page count
     / page-break point change compared to "Original" — this demonstrates
     the pagination logic responding to data size, which is explicitly
     called out in the assignment brief.
   - Optionally use "Edit rows" to add/remove a row live and show the table
     and page layout update immediately.
3. **Code walkthrough** — explain:
   - `sample-data.js`: each table section is a plain array of row objects
   - `render.js`: the `tableBlock()` helper that builds a table + an
     estimated height, and `paginateBlocks()`, the greedy bin-packing
     function that decides which blocks go on which page based on a body
     height budget
   - `editor.js`: how add/remove row buttons mutate the data array and
     trigger a full re-render (rather than patching the DOM directly)
4. **Challenges faced** — e.g. estimating block height in JS to approximate
   real page overflow without a headless PDF renderer; handling the
   "Bus/Taxi Fare" table's conditional empty "Address of Starting Point"
   cell seen in the source PDF.
5. **AI usage** — mention that Claude was used, and point to
   `docs/ai-prompt-history.md`.

Remember: Picture-in-Picture (screen + face) is required for the recording.
