# Handoff: Evitar Agent Platform — BFSI product page

## Overview
A premium, dark, single-page product showcase for Evitar's agentic-AI platform for Indian BFSI (Insurance, HFCs/NBFCs, Cards). It presents a 7-agent "AI workforce," lets a prospect pick a business outcome and see a recommended agent stack, configure the workforce (voice, WhatsApp, shared memory, handoffs, governance), and view a segment-specific Command Center. The page closes on a single CTA: **Book a demo**.

## About the design files
The files in this bundle are a **design reference created in HTML** — a working prototype that shows the intended look, copy, and behavior. They are **not production code to copy verbatim**. The task is to **recreate this design in the target codebase's environment** (React/Vue/etc.) using its established components and patterns. If no front-end environment exists yet, React + a small state store is a good fit (the prototype's logic maps directly to React state).

- `index.html` — the fully self-contained, runnable prototype (open in any browser; no build step, no network needed except Google Fonts). Use this as the source of truth for look & behavior.
- `styles.css` — the only non-inline CSS (font import, resets, keyframes). Everything else is inline per element in `index.html`.
- `script.js` — **reference** for the state, data model, and computed values that drive the page (segment data, goal→stack mapping, journeys, KPIs, config toggles, role views). Port the DATA/STATE; rebuild markup from `index.html`.
- `assets/` — `AgentIcon.dc.html` (inline-SVG icon set), `FONTS.txt`, and one reference screenshot.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions. Recreate pixel-accurately using the codebase's libraries. All metrics/numbers shown are **illustrative placeholders** — do not treat as real results; wire to real data or keep labelled as illustrative.

## Screens / Views
Single long-scroll page, max content width **1200px**, section padding **~90px** vertical / **26px** horizontal, alternating transparent panels on a near-black background.

1. **Nav (sticky, blurred)** — `evitar/ai` wordmark left; links Agents / Customize / Quality / Command Center / Governance; secondary links hide below 760px. Logo right is `/ai` in emerald.
2. **Hero** — eyebrow pill ("Agentic AI for BFSI · Insurance · Lending · Cards"); H1 with metallic-sheen gradient text **"Sell more. Serve faster. Operate smarter."**; segment-specific subhead; two ghost buttons (See it resolve / Explore the agents); an animated **journey ribbon** whose stages change per segment; a narrative line; then the **7-agent constellation** (glass tiles, tap to add to pilot).
3. **Segment switcher ("VIEW AS")** — Life & General Insurance / HFCs & NBFCs / Cards. Drives: hero subhead, journey ribbon, goal menu + outcomes, recommended agents, Command Center KPIs/widgets, and the "Configured for your segment" block. Everything else is common.
4. **Goal selector** — left: outcomes grouped into Growth / Operations / Risk & Governance / Leadership; right: recommended **Primary** vs **Supporting** agents (each with a one-line "why"), a per-goal journey strip, an "Included in every deployment: Command Center" block, and a quiet "Review your stack" link. Selecting a goal pre-adds its agents to the pilot.
5. **Proof demo ("Same question, two outcomes")** — prompt chips; a "Today's bot" vs "With an Evitar agent" two-column comparison; content changes per segment.
6. **Agents in depth** — 3 layers (Engage / Improve / Orchestrate), 7 agent cards with add-to-pilot + Try demo.
7. **Configure your AI workforce** — Agent voice (3 personas) + behaviour sliders; **One customer, one memory** shared-context timeline; **Journey handoff rules** (toggles); **WhatsApp channel setup** (tone radio, language multi-select, message style, rich content); **Governance controls** (toggles).
8. **Drive + Improve loop**, **Quality method** (6 steps), **Command Center** (segment KPI tiles + widgets + cycling AI recommendation + role-based visibility selector), **Governance** (controls + sourced stats), **Configured for your segment**, **Build your pilot / close** (single Book-a-demo CTA), footer.

## Interactions & behavior
- **Segment switch** re-renders the tailored zone (hero subhead, ribbon, goals, recommendations, Command Center, segment block). Common zone is unchanged.
- **Goal select** sets the active goal and auto-adds its recommended agents to the pilot (toggleable).
- **Agent tiles / rows** toggle membership in "your pilot" (shared selection state) → reflected in the close summary.
- **Command Center** AI-recommendation banner **cycles** every ~3.6s (setInterval); role selector swaps the "this role sees" list.
- **Config**: behaviour sliders (0–100), voice persona radio, WhatsApp tone/style radios, language/rich-content multi-toggles, handoff + governance checkboxes — all live local state.
- **Motion**: metallic sheen sweep on H1, slow conic glow behind hero, ribbon glow sweep, glow-pulse on agent icons, hover-lift on tiles. Respect `prefers-reduced-motion` in production.
- **Responsive**: all grids use `auto-fit` + `minmax(min(100%, Npx), 1fr)` so they collapse to one column on mobile; nav links hide under 760px.
- **CTA**: one primary action only — "Book a demo" → `mailto:clients@evitar.ai`.

## State management
Local UI state only (no backend): `seg` (segment), `goal`, `prompt` (demo), `voice`, behaviour sliders (`empathy`/`sales`/`interrupt`), `selected` (pilot set), `recIndex` (cycling rec), WhatsApp config (`waTone`/`waStyle`/`waLangs`/`waRich`), `cmdRole`, governance `govT`, handoff `rules`. See `script.js` for exact shapes and the per-segment data (`segData`, `segExtra`).

## Design tokens
- **Background**: layered — `radial-gradient` emerald/cyan glows over `linear-gradient(#080A12 → #06070C → #05060A)`. Base near-black `#06070C`.
- **Text**: headings `#F3F6FA`; body `#97A2B4`; bright body `#C8D2DE`; faint/mono `#66718a`; dim `#525d72`.
- **Accents**: emerald `#19E08C` (bright `#2CF09C`→`#15C97B` gradient; icon mint `#6FF0B4`); cyan `#5FBDEA` / `#22B6E8`. Emerald text-on-fill `#03130C`.
- **Glass panels**: `linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))`, border `1px solid rgba(255,255,255,0.09)`, inner highlight `inset 0 1px 0 rgba(255,255,255,0.06)`.
- **Radius**: tiles 16–18px, chips 8–9px, pills 30px. **Borders**: hairline `rgba(255,255,255,0.06–0.12)`.
- **Type**: Space Grotesk (headings, 600/700, letter-spacing ~−0.025em), Inter (body, 17px/1.6), Space Mono (eyebrows/labels, uppercase, letter-spacing ~0.16em). H1 `clamp(38px,5.4vw,76px)`; H2 `clamp(30px,3.8vw,48px)`.
- **CTA glow**: `0 14px 34px -12px rgba(25,224,140,0.7)`.

## Assets
- Agent icons: inline SVG (no files) — see `assets/AgentIcon.dc.html`.
- Fonts: Google Fonts (`assets/FONTS.txt`).
- No photographic assets. `assets/reference-process-overview.png` is product context only (anonymised; no client names anywhere).

## Files
- `index.html` — runnable prototype (source of truth)
- `styles.css` — global CSS
- `script.js` — state + data model reference
- `assets/AgentIcon.dc.html`, `assets/FONTS.txt`, `assets/reference-process-overview.png`
