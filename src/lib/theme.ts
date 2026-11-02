import { site } from '../site.config';
import { scenes } from '../data/navigation';

const vars = (
  tones: Record<string, { color: string; text: string }>,
  surface: Record<string, string>
) =>
  Object.entries(surface)
    .map(([key, value]) => `--${key}:${value};`)
    .join('') +
  Object.entries(tones)
    .map(
      ([key, { color, text }]) => `--c-${key}:${color};--c-${key}-text:${text};`
    )
    .join('');
const tone = (name: string) =>
  `--accent:var(--c-${name});--accent-ink:var(--c-${name}-text);`;
const triad = ([main, second, third]: readonly string[]) =>
  `${tone(main)}--accent-2:var(--c-${second});--accent-3:var(--c-${third});`;

export const themeCss = `:root{${vars(site.colors, site.surfaces.dark)}--border:${site.border};--radius:${site.radius};--grid:${site.grid};${triad(site.sections.home)}}
:root[data-theme="light"]{${vars(site.lightColors, site.surfaces.light)}}
${Object.keys(site.colors)
  .map((name) => `.tone-${name}{${tone(name)}}`)
  .join('')}
${scenes.map((scene) => `body[data-active-scene="${scene}"]{${triad(site.sections[scene])}}`).join('')}`;
