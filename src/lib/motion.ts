import { gsap } from 'gsap';

export { gsap };
export const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

// Positive y slides from bottom (forward), negative from top (backward).
export function reveal(element: HTMLElement, duration = 0.45, y = 14): void {
  if (
    reducedMotion.matches ||
    document.documentElement.dataset.motion === 'paused'
  )
    return;

  gsap.fromTo(
    element,
    { opacity: 0, y, scale: 0.988 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
      overwrite: true,
    }
  );
}

const still = () =>
  reducedMotion.matches || document.documentElement.dataset.motion === 'paused';

// Staggered reveal for children of each [data-stagger] inside root.
export function revealItems(root: ParentNode): void {
  if (still()) return;
  const items = root.querySelectorAll<HTMLElement>('[data-stagger] > *');
  if (!items.length) return;
  gsap.fromTo(
    items,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      overwrite: true,
    }
  );
}

// Horizontal wipe transition.
export function wipeIn(element: HTMLElement): void {
  if (still()) return;
  gsap.fromTo(
    element,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.55,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
      overwrite: true,
    }
  );
  revealItems(element);
}
