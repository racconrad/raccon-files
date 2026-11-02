# Visual guide — raccon-files

Rules for keeping the portfolio consistent. Change values in their source file, not here: this guide explains them.

## Identity

A night stage: a dark background, flat lamps and a black-and-white raccoon guiding visitors through scenes. Flat and graphic, with square edges, thick borders and color used as stage light. Not realistic, no gradients for volume, no soft shadows.

## Color

Source: `src/site.config.ts` (injected as CSS variables by `src/lib/theme.ts`).

### Tones

| Tone     | Dark      | Light     | Use                                |
| -------- | --------- | --------- | ---------------------------------- |
| crimson  | `#dc143c` | `#b0102f` | Main energy, Home, CTAs            |
| amethyst | `#9966cc` | `#6a3c9a` | Projects, Journey                  |
| bone     | `#f2eef4` | `#141116` | Neutral accent, closes every triad |
| rose     | `#ff4f73` | `#a8102f` | Soft variant of crimson (About)    |
| lilac    | `#c4a2f0` | `#5b2f8a` | Soft variant of amethyst (Contact) |

Each tone carries its own `text` color for contrast on solid fills. In light mode, pale tones darken so they stay readable.

### Surfaces

| Token    | Dark      | Light     | Use                     |
| -------- | --------- | --------- | ----------------------- |
| `ground` | `#0f0d11` | `#f6f4f7` | Page background         |
| `panel`  | `#1a171d` | `#ffffff` | Windows and cards       |
| `deep`   | `#141116` | `#ece8ef` | Insets, scrollbar track |
| `ink`    | `#f2eef4` | `#141116` | Main text               |
| `muted`  | `#a79fad` | `#56505c` | Secondary text          |
| `line`   | `#3a3340` | `#c9c2ce` | Borders and dividers    |

Tailwind exposes them as `bg-canvas`, `bg-panel`, `bg-panel-deep`, `text-ink`, `text-muted`, `border-line`, `bg-accent`, `text-accent-ink`.

### Scene triads

Each scene sets `--accent`, `--accent-2` and `--accent-3` as **[dominant, secondary, accent]**:

| Scene    | Triad                     |
| -------- | ------------------------- |
| home     | crimson · amethyst · bone |
| projects | amethyst · crimson · bone |
| skills   | bone · crimson · amethyst |
| about    | rose · amethyst · bone    |
| journey  | amethyst · rose · bone    |
| contact  | lilac · crimson · bone    |

Proportion is roughly 70 / 20 / 10: this is how the header border and the active-menu underline are split. Never use a hex color in a component; use `var(--accent*)` or the `.tone-<name>` class.

## Typography

| Role      | Family                   | Use                                       |
| --------- | ------------------------ | ----------------------------------------- |
| `display` | URW Bookman (Stage), 700 | Scene titles, logo                        |
| `sans`    | Fira Sans (Body), 400    | Prose                                     |
| `mono`    | System monospace         | Buttons, labels, metadata, uppercase tags |

- Common sizes: `text-sm` and `text-xs` for UI, `text-base` for prose, `text-3xl`/`text-4xl` for titles.
- `text-[11px]` is reserved for small mono labels; avoid anything under 10px.
- Buttons and labels: `font-mono uppercase tracking-wider font-semibold`.
- Fonts are self-hosted in `public/fonts/` along with their licenses.

## Shape

Source: `border`, `radius`, `grid` in `src/site.config.ts`.

- Border `2px` everywhere (`var(--border)`), including the focus ring.
- `radius: 0`: everything is square. It's applied globally; don't add `rounded-*`.
- Background grid of `48px` (`var(--grid)`).
- Depth comes from overlapping planes and borders, not blurred shadows.

## Components

- **Action** (`ui/Action.astro`): the main button. Solid `bg-accent`, `text-accent-ink`, mono uppercase, icon + text + arrow.
- **Windows** (`ui/WindowHeader.astro`, `DesktopDialog.astro`): panels with a title bar, used for projects and dialogs.
- **Scene / SceneHeading**: the container and title for each scene.
- **TechnologyList / StackLevels**: stack and levels, with no decorative bars.
- **Stage / StageLamp**: flat lamps and the backdrop; their light uses the scene's triad.

## Raccoon

- Poses in `public/images/raccoon/<pose>.svg`: black ink, white fill, a light outline. Drawn by hand; don't recolor them.
- Each scene has its pose (`src/scripts/raccoon.ts`): projects → `coding`, skills → `studying`, about → `music`.
- Startled poses (`surprise`, `alert`, `doubt`, `sweat`, `overwhelmed`) use the _shake_ animation; the rest use _pop_.
- A new pose: same canvas proportion, transparent background, same stroke weight. It's used by name, with no extra code.

## Motion

- Light, quick and with intent: squash and stretch, a pop when switching poses, walking between scenes.
- Main curves: `cubic-bezier(0.22, 1, 0.36, 1)` (entrances, 0.6–0.9 s) and `cubic-bezier(0.2, 0.8, 0.2, 1)` (underlines, 0.4 s).
- A pose is held for at least 1.4 s; hover reacts after 350 ms.
- Respect `prefers-reduced-motion` and the site's pause button (`data-motion="paused"`): ambient animation stops; content is still visible.

## Responsive

- Minimum width 320px.
- Breakpoints: `< 768px` mobile (one column, small raccoon), `768–1000px` tablet, `≥ 768px` with `max-height: 800px` for short screens.
- Each scene scrolls inside itself when it doesn't fit.

## Accessibility

- Visible focus: a `2px` outline in `--accent` with a 3px offset.
- Check contrast whenever you change a tone or its `text`, in both themes.
- Native dialogs with Escape and focus return.
- All text is in ES and EN (`src/data/ui.ts`).
