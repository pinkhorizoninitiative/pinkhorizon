# CLAUDE.md — Pink Horizon Initiative Website Design Standards

This file governs every design and build decision for the Pink Horizon Initiative website.
The organisation is a **youth-led NGO from Malaysia** focused on empowerment, growth, and social
impact. The website must feel like a credible international youth organisation — not a generic
template, not a charity cliché, not a vibe-coded startup. Every rule below exists to protect
that distinctiveness.

---

## 0. The one rule that matters most

Pink Horizon's brand idea is **strength, possibility, and the expansion of horizons** — not
"soft girl charity." If the page looks like a generic fundraising site, a pastel wellness brand,
or a vibe-coded SaaS startup, you have failed. The site must feel like it belongs on a global
stage alongside credible youth-led organisations (think Tony Blair Institute for Change, Teach
For All, SDSN Youth) — editorial, ambitious, and completely itself.

Pink is a concept, not a colour wash. Use it precisely and sparingly. The headline emotion
is **hope with backbone.**

---

## 1. Hard bans — never ship these

### Colour bans
- **No purple/violet/indigo as primary or dominant colour.** This is the biggest vibe-code
  tell. Avoid `#7c3aed`, `#8b5cf6`, `#a855f7`, `#6366f1` and their neighbours in any
  prominent role.
- **No purple-to-blue or purple-to-pink gradients** anywhere — backgrounds, buttons, or text.
- **No gradient-filled headline words.** A single word in a headline may carry an accent
  *colour* (see §4), but never a gradient fill.
- **No candy-pink or hot-pink colour-washing.** The logo pink (`#e8429a`) can appear as a
  sharp accent but must never dominate backgrounds, section fills, or cards.

### Copy and content bans
- **No meaningless stat blocks** ("5000+ Lives Changed · 98% Satisfaction"). Only show a
  number if it is real, sourced, and belongs to PHI.
- **No emoji inside headings or section titles.** Use real iconography, and use it sparingly.
- **No generic NGO slogans.** Ban "Making a difference," "Changing lives," "Together we
  can," "Empowering communities." Write copy that only PHI could say.
- **No "Why Choose Us?" sections.** No interchangeable testimonial rows with stock headshots.
- **No pill-badge clutter** ("SDG Aligned ✓ · ISO Certified · 24/7 Support 🔒") stacked
  anywhere.

### Layout bans
- **No default centered-everything layout** — a single column of centered text from top to
  bottom reads as template. Use real asymmetric composition.
- **No glassmorphism** — frosted translucent cards with heavy blur and soft glow.
- **No rainbow of soft drop shadows on every card.** Shadows are accents, not textures.
- **No stock NGO photography** (generic handshake photos, stock smiling volunteers, clip-art
  hands forming a circle). Use geometric forms, editorial colour blocks, or real PHI imagery
  if provided.
- **No excessive animations.** Scroll reveals and one hover moment per section maximum.

If a future brief explicitly overrides one of these (e.g. a client approves a specific purple
partnership badge), confirm it is intentional and execute it with care so it still looks
designed, not defaulted.

---

## 2. Design references — follow these

The user has provided four visual references. Study them before building.

### Reference 1 — Pink Horizon Initiative Logo
File: `IMG_5838.jpg`

This is the primary brand artefact. Extract and honour it precisely.

**Logo colour palette (exact source values):**
| Role | Hex | Use |
|------|-----|-----|
| Brand pink | `#e8429a` | Accent only — CTA borders, highlight marks, selective icon fills |
| Dawn gold | `#f5c340` | Warm secondary accent — pulled from the logo's sun |
| Lavender mist | `#b899c8` | Subtle tertiary — horizon mountains; use as a muted texture tone |
| Soft coral | `#f08060` | From the gradient sky in the logo; use for warmth in illustrations |
| White | `#ffffff` | Primary text on dark backgrounds |

The logo's **sunrise over layered mountain silhouettes** is the visual metaphor for the whole
site. The horizon line, the ascent, the dawn — these are the structural and visual motifs to
build from. Do not use the logo illustration literally in the design (beyond placing the actual
logo); abstract the idea into layout, type rhythm, and the single signature element (§5).

### Reference 2 — "Where Commerce Becomes Alchemy" (jennifer-johnston-1)
File: `1783593097584_image.png`

This is the **primary layout and atmosphere reference.** Extract:
- Near-black background (`#0c0b0a` range) as the dominant canvas
- Large editorial serif display type (the "Where Commerce Becomes" portion) paired with a
  contrasting italic accent word ("Alchemy") in a warm gold-green — adapt this pattern for
  PHI using an italic serif for a keyword in the hero
- Atmospheric, non-literal background texture (smoke/cloudlike forms) — adapt as a
  soft radial gradient or subtle grain overlay, NOT literal smoke
- Centered but dramatically scaled — the type is the hero, not an image
- Sparse navigation; restrained CTA buttons with outline style
- Small all-caps tracking for the eyebrow label ("THE FEDERATED MARKETPLACE" → adapt for PHI)

### Reference 3 — Navbar Digital (navdeep-singh-9)
File: `1783593113218_image.png`

Extract:
- **Massive, full-bleed left-aligned headline** — the type takes over the entire viewport
- Dark-on-dark base with a single neon/vivid accent for one word or CTA
- The "SCROLL TO EXPLORE" label at the bottom — small, all-caps, calm
- Dark background with a radial glow at centre-bottom to create depth without gradients
- Left-aligned body copy and CTA block sitting in the bottom-left quadrant

Adapt the scale and left-alignment for PHI. The Navbar accent is lime green (`#b5f23d`);
for PHI, the equivalent is the dawn gold (`#f5c340`) or the brand pink (`#e8429a`) on the
key hero word.

### Reference 4 — Big Horror Athens / units. (SOTD)
File: `1783593154710_image.png`

Extract:
- **Grid-based asymmetric layout** — a sidebar navigation on the left with numbered coloured
  panels, the main content taking the right two-thirds
- Vivid colour panels used as structural dividers, not just decoration
- "Student living, redefined." — notice the period at the end of a headline. Confident, final.
- Feature list with small icons in a tight two-column grid — use for the PHI Focus Areas
  section (SDG 3, SDG 4 breakdowns)
- Electric blue background behind the device frame — extract the idea of one bold
  background accent that frames the entire composition

---

## 3. Token system — use these values, nothing else

Define these as CSS custom properties at `:root`. Do not invent colours outside this system.

```css
:root {
  /* Backgrounds */
  --ink:          #0c0b0a;   /* Near-black — primary background */
  --slate:        #1a1816;   /* Slightly lighter dark — alternate sections */
  --warm-dark:    #231f1c;   /* Card / panel backgrounds */

  /* Foregrounds */
  --chalk:        #f4f0eb;   /* Warm white — primary body text */
  --mist:         #8a7d86;   /* Muted mauve-grey — secondary/caption text */

  /* Brand accents */
  --rose:         #e8429a;   /* PHI pink — used sparingly: CTA borders,
                                 bullet marks, link underlines */
  --dawn:         #f5c340;   /* Dawn gold — accent word in hero, SDG icons,
                                 active states */
  --lavender:     #b899c8;   /* Horizon mist — subtle section dividers,
                                 illustration texture only */

  /* Utility */
  --white:        #ffffff;
  --rule:         rgba(244, 240, 235, 0.10); /* Hairline dividers */
}
```

**Colour discipline:**
- `--ink` covers 70–80% of the visual canvas
- `--chalk` is primary text always
- `--dawn` appears maximum 3–4 times per page (hero word, one section label, CTA hover, footer accent)
- `--rose` appears maximum 3 times (one CTA button border, one hover underline, one small icon)
- `--lavender` appears only as a texture tone, never as a background fill on a section
- No additional colours under any circumstances

---

## 4. Typography — the character of the page

This is the most important design decision. The pairing must feel **editorial and distinctive**,
not like a default dashboard font stack.

### Font faces

| Role | Family | Source |
|------|--------|--------|
| Display / headline | **Cormorant Garamond** — use Italic for accent words | Google Fonts |
| Body / UI | **Plus Jakarta Sans** | Google Fonts |
| Utility / labels | **Plus Jakarta Sans** (all-caps, 0.12em tracking, 500 weight) | Same |

Load with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Type scale

```css
/* Display — hero headline */
.t-display {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(3.2rem, 8vw, 7.5rem);
  font-weight: 300;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--chalk);
}

/* The accent word (italic, coloured) in the hero headline */
.t-display em {
  font-style: italic;
  font-weight: 400;
  color: var(--dawn);
}

/* Section heading */
.t-heading {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2rem, 4.5vw, 3.8rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.015em;
  color: var(--chalk);
}

/* Eyebrow / label (above headings) */
.t-eyebrow {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mist);
}

/* Body copy */
.t-body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 300;
  line-height: 1.75;
  color: var(--chalk);
  opacity: 0.85;
}

/* Caption / meta */
.t-caption {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  color: var(--mist);
}
```

**Rules:**
- Never use Cormorant for body text. It is headline-only.
- Never use Plus Jakarta Sans for display headlines. It is body/UI-only.
- The one italic Cormorant accent word in the hero is the **signature typographic moment** —
  do not repeat the italic treatment on other words (one per page maximum).
- Body copy line-height must never drop below 1.6.
- Hero headline must be at least 3rem on the smallest viewport (375px).

---

## 5. Layout, composition, and the signature element

### Composition philosophy
- Never stack identical centered blocks. Every other section must break the axis.
- Use the **left-rail / right-content split** from Reference 4 for the Impact section.
- Hero is left-aligned, large — the type overwhelms the viewport intentionally (Reference 3).
- The About section breaks right: body copy left, a geometric colour panel right.
- Use whitespace as a design tool; do not fear empty canvas on dark backgrounds.

### The signature element: The Horizon Line
The one memorable design move that belongs only to PHI:

A thin, single-pixel line in `--dawn` gold that runs from left to right across the page as a
section divider — but it does not appear all at once. On scroll, the line **draws itself from
left to right** (a CSS width animation triggered by IntersectionObserver). This references the
sunrise/horizon of the logo, the idea of an expanding horizon of possibility.

- Only use the animated horizon line between major sections (maximum 3 times).
- Outside of these dividers, use `--rule` (the 10% opacity chalk hairline) for internal
  structural dividers.
- Do not use the dawn gold line for anything else — it earns its meaning by scarcity.

### Section structure

```
NAV          — Transparent, blur on scroll. Logo left. Links right. One CTA pill.
HERO         — Full viewport. Dark bg. Left-aligned display type. Accent italic word.
               Subheadline. One CTA button + one ghost button.
HORIZON LINE — Animated gold line draw.
ABOUT        — Asymmetric two-column. Text left, lavender-toned geometric panel right.
IMPACT       — Dark bg. Grid: left rail with SDG labels, right with content panels.
               Inspired by Reference 4's sidebar nav pattern.
HORIZON LINE — Animated gold line draw.
EVENTS       — Horizontal scroll or clean timeline. Dates in rose, titles in Cormorant.
JOIN US      — Full-width dark section. Single headline. One CTA. Minimal.
HORIZON LINE — Animated gold line draw.
CONTACT      — Two-column: email + social links left, short tagline right.
FOOTER       — Simple. Logo, nav links, copyright. No decoration.
```

---

## 6. Hero section — specific build instructions

```
EYEBROW:   "KUALA LUMPUR · MALAYSIA · YOUTH-LED"   [t-eyebrow, --mist]

HEADLINE:  Youth that moves
           the <em>horizon</em>.            [t-display; "horizon" is italic, --dawn]

SUBHEAD:   Pink Horizon Initiative creates lasting social impact through
           community outreach, education, and youth empowerment — focused
           on SDG 3 and SDG 4.              [t-body, max-width 520px]

BUTTONS:   [Be Part of Us →]   [Our Story]
           Primary: border 1px --rose, chalk text, transparent fill
           Ghost: no border, mist text, subtle underline on hover

SCROLL LABEL: "SCROLL TO EXPLORE" — small, all-caps, bottom-left, --mist
```

Background: `--ink`. A very subtle radial gradient from `rgba(245, 195, 64, 0.04)` at centre
to transparent — borrowing the warm glow from Reference 3's green radial. No other decoration.

On mobile (≤ 768px): headline shrinks to `clamp(2.8rem, 10vw, 4rem)`, both buttons stack
vertically.

---

## 7. Buttons and interactive elements

```css
/* Primary CTA */
.btn-primary {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 14px 32px;
  border: 1px solid var(--rose);
  color: var(--chalk);
  background: transparent;
  transition: background 0.25s ease, color 0.25s ease;
}
.btn-primary:hover {
  background: var(--rose);
  color: var(--white);
}

/* Ghost / secondary */
.btn-ghost {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mist);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--rule);
  padding: 14px 0;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.btn-ghost:hover {
  color: var(--chalk);
  border-color: var(--chalk);
}
```

No border-radius on buttons (zero, or maximum 2px). Rounded pill buttons read as SaaS/startup.

---

## 8. Motion — minimal and intentional

- **Horizon Line draw**: The signature moment. CSS `width` from 0 → 100%, 0.8s ease,
  triggered by IntersectionObserver. Use only this one dramatic animated element.
- **Fade-up on scroll**: Sections fade in with `opacity: 0 → 1` and `translateY(24px → 0)`,
  `0.5s ease`. Not every element — only section wrappers and major headings.
- **Hover on CTA**: Background fill (see §7). Duration 0.25s maximum.
- **Nav blur**: `backdrop-filter: blur(12px)` when scrolled past the hero — but only apply
  this to the nav bar, nowhere else.
- **No parallax.** No particle effects. No scroll-jacking. No counting number animations.
- Always wrap motion in:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
  ```

---

## 9. Responsive — non-negotiable

Build mobile-first. Test at minimum **375px, 768px, 1024px, 1440px**.

| Viewport | Hero headline size | Layout |
|----------|--------------------|--------|
| 375px | `clamp(2.8rem, 9vw, 3.5rem)` | Single column, stack all |
| 768px | `clamp(3.5rem, 7vw, 5rem)` | Two-column sections begin |
| 1024px | `clamp(5rem, 7vw, 6.5rem)` | Full grid layout |
| 1440px+ | 7.5rem capped | Max widths kick in |

- Nav collapses to a hamburger at ≤ 768px. The mobile menu opens as a full-screen overlay
  (`background: var(--ink)`), not a dropdown.
- Tap targets minimum 44×44px.
- No horizontal scroll on any viewport.
- The Events section horizontal scroll must not be the page's horizontal scroll — wrap it in a
  constrained container with `overflow-x: auto` and hide the scrollbar visually.
- Images: `max-width: 100%`, `height: auto`, correct `aspect-ratio` set.

---

## 10. Content — copy rules

Every word on this site must be specific to PHI. Follow these rules:

- The word "impact" may appear once in copy. Replace elsewhere with concrete descriptions.
- Never use: "Making a difference," "Together we rise," "Empowering the next generation"
  (unless it appears in an actual PHI document — in which case, pull the real quote and
  attribute it).
- SDG references: Always write them as "SDG 3 — Good Health and Well-being" and
  "SDG 4 — Quality Education" (with the full name, not just the number).
- The tagline "Growth for Youth" appears once, prominently — in the footer and/or the end of
  the hero subheadline. Do not repeat it on every section.
- Event cards: If real event names/dates are not provided, write clearly fictional placeholder
  content (e.g. "Community Health Drive — March 2024") — never use Lorem Ipsum on public-
  facing copy.

---

## 11. Quality floor — build these in silently

- Visible keyboard `:focus-visible` states on all interactive elements (outline: 2px solid
  var(--dawn), offset 3px).
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` — not div soup.
- `alt` text on all meaningful images. Decorative elements get `alt=""`.
- `<label>` elements on any form inputs. The email CTA opens `mailto:` — no form required.
- Font loading: `font-display: swap` is set (Google Fonts does this by default; confirm if
  self-hosting).
- No layout shift from fonts: set `size-adjust` fallbacks on the `@font-face` if needed.
- Colour contrast: all body text must pass WCAG AA (4.5:1 minimum). Check `--chalk` on
  `--ink` (passes), `--mist` on `--ink` (borderline — use only for non-essential labels),
  `--dawn` on `--ink` (passes for large text).

---

## 12. Always check your work before calling it done

Do a real review pass. Do not stop when the code runs.

1. **Screenshot or preview** at 375px and 1440px. Read what you see, not what you intended.
2. **Run the vibe-code checklist** below. Every item must be NO.
3. **Read the copy aloud.** If it sounds like it could be for any NGO anywhere, rewrite it.
4. **Click through** the nav, mobile menu, the "Be Part of Us" mailto link, and the social
   links. Confirm they all work.
5. **Remove one thing** that isn't earning its place (Chanel's rule).
6. **Report back** what you checked and what you changed. Do not just say "it looks good."

### Vibe-code checklist (every item must be NO)
- [ ] Is purple/violet the dominant colour anywhere?
- [ ] Is there a purple/blue/pink gradient?
- [ ] Is the hero a centered slogan + two buttons + stat row?
- [ ] Is any headline word gradient-filled?
- [ ] Are there meaningless stat blocks?
- [ ] Are there emoji in any heading or section title?
- [ ] Is there a "Why Choose Pink Horizon?" or generic NGO-slogan section?
- [ ] Is everything in one centered column?
- [ ] Is the type just default Inter or system-ui with no display face?
- [ ] Do any cards have frosted-glass + soft-glow styling?
- [ ] Is the pink used as a dominant background colour (making it feel stereotypically feminine)?
- [ ] Does the site break, clip, or overflow on mobile?
- [ ] Does the animated horizon line appear more than 3 times?
- [ ] Are the two buttons identical (both filled or both outlined)?

---

## 13. Process summary

**Brief** → Pin subject, audience, and the single page job
→ **Extract** logo palette and reference signatures
→ **Draft** token system (see §3) and layout plan (see §5)
→ **Critique** the plan: would this look work for any NGO? If yes, change something.
→ **Build** following the plan exactly, deriving every colour and type decision from §3 and §4
→ **Check** (§12) → **Critique** again → **Ship**

The site earns distinctiveness from the subject — an audacious Malaysian youth organisation
that believes pink means strength, not softness. Restraint, editorial type, and a dark confident
canvas make it look designed. The horizon line, drawn slowly in gold, is the one moment
visitors will remember.

---

*This file was written for Pink Horizon Initiative. It governs this project only.*
*Version 1.0 — July 2026*
