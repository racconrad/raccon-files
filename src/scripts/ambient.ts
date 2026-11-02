import { reducedMotion } from '../lib/motion';
import { readPreference, savePreference } from '../lib/preferences';
import type { Locale } from '../data/portfolio';

export function initAmbient(locale: Locale): void {
  const button = document.querySelector<HTMLButtonElement>(
    '[data-motion-toggle]'
  );
  let paused = readPreference('raccon-motion-paused') === 'true';
  const labels =
    locale === 'es'
      ? ['Pausar ambiente', 'Activar ambiente', 'Movimiento reducido']
      : ['Pause ambience', 'Play ambience', 'Reduced motion'];

  function update(): void {
    document.documentElement.dataset.motion =
      paused || reducedMotion.matches ? 'paused' : 'playing';
    if (!button) return;
    button.textContent = reducedMotion.matches
      ? labels[2]
      : paused
        ? labels[1]
        : labels[0];
    button.disabled = reducedMotion.matches;
    button.setAttribute(
      'aria-pressed',
      String(paused || reducedMotion.matches)
    );
  }
  button?.addEventListener('click', () => {
    paused = !paused;
    savePreference('raccon-motion-paused', String(paused));
    update();
  });
  reducedMotion.addEventListener('change', update);
  const sleep = () =>
    document.documentElement.toggleAttribute(
      'data-motion-sleep',
      document.hidden
    );
  document.addEventListener('visibilitychange', sleep);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>
      entry.target.setAttribute('data-resting', String(!entry.isIntersecting))
    );
  });
  document
    .querySelectorAll('.avatar-slot, .project-preview')
    .forEach((element) => observer.observe(element));
  // Pointer parallax for background and spotlights.
  const root = document.documentElement;
  let frame = 0;
  window.addEventListener(
    'pointermove',
    (event) => {
      if (frame || root.dataset.motion === 'paused') return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty(
          '--px',
          (event.clientX / window.innerWidth - 0.5).toFixed(3)
        );
        root.style.setProperty(
          '--py',
          (event.clientY / window.innerHeight - 0.5).toFixed(3)
        );
      });
    },
    { passive: true }
  );
  update();
  sleep();
}
