import { scenes, type Scene } from '../data/navigation';

const COOLDOWN = 1100; // ms between scene transitions to absorb trackpad inertia
const SETTLE = 300; // ms of idle scroll before changing scenes
const WHEEL_THRESHOLD = 60;
const SWIPE_THRESHOLD = 70;

// Navigate between scenes via wheel, touch gestures, and keyboard at scroll boundaries.
export function initSceneScroll(): void {
  let lockedUntil = 0;
  let lastInnerScroll = 0;
  let wheel = 0;
  let wheelReset: ReturnType<typeof setTimeout>;
  let touchY: number | null = null;

  const active = () =>
    document.querySelector<HTMLElement>('[data-scene]:not([hidden])');
  const blocked = () =>
    document.querySelector('dialog[open]') ||
    document.querySelector<HTMLElement>('[data-intro]')?.hidden === false ||
    document.body.classList.contains('is-changing-scene');
  const atEdge = (direction: number) => {
    const scene = active();
    if (!scene) return true;
    return direction > 0
      ? scene.scrollTop + scene.clientHeight >= scene.scrollHeight - 2
      : scene.scrollTop <= 0;
  };

  function go(direction: 1 | -1, force = false): void {
    const now = performance.now();
    if (now < lockedUntil || blocked()) return;
    if (!force && (!atEdge(direction) || now - lastInnerScroll < SETTLE))
      return;
    const index = scenes.indexOf(document.body.dataset.activeScene as Scene);
    const next = scenes[index + direction];
    if (!next) return;
    lockedUntil = now + COOLDOWN;
    document
      .querySelector<HTMLAnchorElement>(`[data-scene-dot="${next}"]`)
      ?.click();
  }

  document.addEventListener(
    'scroll',
    (event) => {
      if ((event.target as Element).matches?.('[data-scene]'))
        lastInnerScroll = performance.now();
    },
    { capture: true, passive: true }
  );

  window.addEventListener(
    'wheel',
    (event) => {
      if (event.ctrlKey) return; // Pinch zoom
      // Inertial scroll keeps firing; extend lock while inertia continues.
      const now = performance.now();
      if (now < lockedUntil) {
        lockedUntil = Math.max(lockedUntil, now + 250);
        return;
      }
      wheel += event.deltaY;
      clearTimeout(wheelReset);
      wheelReset = setTimeout(() => (wheel = 0), 180);
      if (Math.abs(wheel) < WHEEL_THRESHOLD) return;
      go(wheel > 0 ? 1 : -1);
      wheel = 0;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchstart',
    (event) => (touchY = event.touches[0].clientY),
    { passive: true }
  );
  window.addEventListener(
    'touchend',
    (event) => {
      if (touchY === null) return;
      const delta = touchY - event.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta > 0 ? 1 : -1);
    },
    { passive: true }
  );

  window.addEventListener('keydown', (event) => {
    if ((event.target as Element).closest('input, textarea, select, dialog'))
      return;
    if (event.key === 'PageDown' || event.key === 'ArrowDown') go(1);
    if (event.key === 'PageUp' || event.key === 'ArrowUp') go(-1);
  });

  document
    .querySelector('[data-scene-next]')
    ?.addEventListener('click', () => go(1, true));
}
