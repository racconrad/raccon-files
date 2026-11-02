import { gsap, reducedMotion } from '../lib/motion';
import { readPreference, savePreference } from '../lib/preferences';

export function initIntro(playOnLoad: boolean): void {
  const element = document.querySelector<HTMLElement>('[data-intro]');

  if (!element) return;

  const intro = element;
  const background = document.querySelectorAll<HTMLElement>(
    '.site-header, main, footer'
  );
  let timeline: ReturnType<typeof gsap.timeline> | undefined;
  let timer: ReturnType<typeof setTimeout>;
  let returnFocus: HTMLElement | null = null;

  function finish(): void {
    clearTimeout(timer);
    timeline?.kill();
    const hadFocus = intro.contains(document.activeElement);
    intro.hidden = true;
    document.body.classList.add('stage-ready');
    intro.setAttribute('aria-hidden', 'true');
    background.forEach((element) => element.removeAttribute('inert'));
    // Restore focus to opener or main content to prevent losing focus when intro closes.
    if (hadFocus)
      (returnFocus || document.getElementById('main'))?.focus({
        preventScroll: true,
      });
  }

  function play(forceFull = false): void {
    if (
      reducedMotion.matches ||
      document.documentElement.dataset.motion === 'paused'
    )
      return;

    clearTimeout(timer);
    timeline?.kill();

    const full = forceFull || readPreference('raccon-intro-seen') !== 'true';
    savePreference('raccon-intro-seen', 'true');

    returnFocus =
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
        ? document.activeElement
        : null;
    document.body.classList.remove('stage-ready');
    background.forEach((element) => element.setAttribute('inert', ''));
    intro.hidden = false;
    intro.setAttribute('aria-hidden', 'false');
    intro
      .querySelector<HTMLButtonElement>('[data-skip-intro]')
      ?.focus({ preventScroll: true });

    gsap.set('.intro-tile', { scale: 1, rotation: 0, opacity: 1 });
    gsap.set('.intro-bars i', { scaleX: 0 });
    gsap.set('.intro-content', { opacity: full ? 1 : 1, y: 0 });
    gsap.set('.intro-avatar', {
      opacity: 0,
      scale: 0.6,
      rotation: -8,
    });
    gsap.set('.intro-char', { opacity: 0, y: 40 });
    gsap.set('.intro-line', { opacity: 0 });
    gsap.set('.intro-progress i', { scaleX: 0 });

    timeline = gsap.timeline({ onComplete: finish });

    if (full) {
      timeline
        .fromTo(
          '.intro-bars i',
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.35, stagger: 0.08, ease: 'power4.inOut' }
        )
        .to('.intro-bars i', {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.35,
          stagger: 0.08,
          ease: 'power4.inOut',
        })
        .to(
          '.intro-avatar',
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.55,
            ease: 'back.out(1.8)',
          },
          '-=0.3'
        )
        .to(
          '.intro-char',
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.035,
            ease: 'back.out(2.2)',
          },
          '-=0.35'
        )
        .to('.intro-line', { opacity: 1, duration: 0.3 }, '-=0.2')
        .to(
          '.intro-progress i',
          { scaleX: 1, duration: 0.7, ease: 'steps(12)' },
          '<'
        )
        .to(
          '.intro-content',
          { opacity: 0, y: -24, duration: 0.3, ease: 'power2.in' },
          '+=0.2'
        );
    }

    timeline.to(
      '.intro-tile',
      {
        scale: 0,
        rotation: 90,
        duration: full ? 0.65 : 0.35,
        ease: 'power3.in',
        stagger: { grid: [5, 8], from: 'center', amount: full ? 0.6 : 0.45 },
      },
      full ? '-=0.05' : 0
    );
    timer = setTimeout(finish, 7000);
  }

  intro.querySelector('[data-skip-intro]')?.addEventListener('click', finish);
  document
    .querySelector('[data-replay]')
    ?.addEventListener('click', () => play(true));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !intro.hidden) finish();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) finish();
  });
  if (playOnLoad) play();
}
