# Design QA — MVP 0.1

- Source visual truth: `docs/VISUAL_DNA.md` and `CODEX_PROMPT.md` (written art direction; no raster mock was supplied)
- Implementation: browser-rendered `http://localhost:4173/`
- Desktop viewport: 1440 × 1000 CSS px, device scale 1
- Mobile viewport: 390 × 844 CSS px, device scale 1
- States checked: hero, artifact detail, Revival section, Blueprint modal, mobile hero

## Full-view comparison evidence

The implementation follows the supplied written visual target: near-black water, ink/noise texture, warm-white editorial Chinese display type, a non-linear river/archive sequence, restrained dark gold reserved for recovery, and a paper-like manifesto/blueprint surface. It avoids SaaS cards, blue-purple AI gradients, neon cyberpunk, and generic glassmorphism.

There was no source image to perform a pixel-level side-by-side comparison. This pass therefore verifies conformance to the repository's written visual DNA rather than screenshot fidelity.

## Required fidelity surfaces

- Fonts and typography: large Noto Serif SC display hierarchy with system sans-serif UI copy; desktop and mobile wrapping checked.
- Spacing and layout rhythm: 1440 px composition and 390 px breakpoint rendered without horizontal overflow (`scrollWidth = clientWidth = 390`).
- Colors and tokens: near-black, ink green-gray, warm white, and dark gold remain within the supplied palette.
- Image quality and assets: no copyrighted historical screenshots are used. The visual system is intentionally procedural, matching the MVP specification.
- Copy and content: primary narrative, verification warnings, manifesto, data status, and Revival disclaimer are present.

## Primary interactions tested

- All six artifact buttons opened their matching detail dialog.
- Detail dialogs closed correctly.
- Revival Blueprint opened and closed correctly after its transition completed.
- Footer placeholders provide visible feedback or navigate to an existing section.
- Escape handling is implemented for dialogs.

## Console and build

- Browser console warnings/errors: none during desktop and mobile checks.
- Production build: passed.

## Findings

- No actionable P0/P1/P2 issue remained after the responsive and interaction pass.
- P3: future work should capture a dedicated visual mock and introduce visual-regression snapshots for stronger fidelity comparison.

## Comparison history

- Initial interaction automation clicked during the detail exit transition; after waiting for the intended 650 ms transition, the Blueprint opened correctly. This was a test sequencing issue, not a product defect.

final result: passed
