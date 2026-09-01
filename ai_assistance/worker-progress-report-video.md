# Worker Progress Report — Narrated Video

**Video link:** _(add your YouTube/Loom/Drive link here, or place the video
file directly in this repo, e.g. `docs/worker-progress-report-video.mp4`, and
update this link accordingly)_

## What the video should cover (per assignment instructions)

1. **Understanding & assumptions** — explain the form's purpose, and call out
   the assumptions listed in the main [README](../README.md#assumptions-made)
   (recreated logo, font substitution, blue = submitted value convention).
2. **Live dynamic demo** — use the toolbar dropdown to switch between the 3
   sample datasets (Original / Minimal / Detailed) and show how checkboxes,
   filled text, and the pain scale all change. Optionally open "Edit fields"
   and change a value live.
3. **Code walkthrough** — explain:
   - `sample-data.js`: the data shape and the option-label lookup maps
   - `render.js`: how each field/checkbox is conditionally rendered from
     data (e.g. `checkbox(rtw.status === "returnedOn", ...)`)
   - `base.css`: how the boxed sections, checkboxes, and footer/page-number
     layout are built
4. **Challenges faced** — e.g. matching checkbox tick-mark styling with pure
   CSS, aligning the sub-labels ("Date", "(Medical Provider Name)") under
   filled-in fields without a form library.
5. **AI usage** — mention that Claude was used, and point to
   `docs/ai-prompt-history.md`.

Remember: Picture-in-Picture (screen + face) is required for the recording.
