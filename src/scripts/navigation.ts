import { scenes } from '../data/navigation';
import type { Locale, Scene } from '../data/portfolio';
import { reveal, revealItems, reducedMotion } from '../lib/motion';

function readScene(): Scene {
  const scene = window.location.hash.slice(1);
  return scenes.find((candidate) => candidate === scene) || 'home';
}

export function initNavigation(locale: Locale): Scene {
  const sections = document.querySelectorAll<HTMLElement>('[data-scene]');
  const links = document.querySelectorAll<HTMLAnchorElement>(
    '[data-scene-link], [data-scene-dot]'
  );
  const languageLink = document.querySelector<HTMLAnchorElement>(
    '[data-language-switch]'
  );

  const blackout = document.querySelector<HTMLElement>('.stage-blackout');
  const wipeBars = document.querySelectorAll<HTMLElement>('.stage-wipe i');
  let cue: Animation | undefined;
  let timer: ReturnType<typeof setTimeout>;
  let pendingScene: Scene | null = null;

  function commitScene(scene: Scene, animate: boolean): void {
    const step =
      scenes.indexOf(scene) -
      scenes.indexOf(document.body.dataset.activeScene as Scene);
    document.body.dataset.direction = step < 0 ? 'up' : 'down';
    document.body.dataset.activeScene = scene;
    sections.forEach((section) => {
      section.hidden = section.dataset.scene !== scene;
      if (!section.hidden) {
        section.scrollTop = 0;
        if (animate) {
          reveal(section, 0.6, step < 0 ? -60 : 60);
          revealItems(section);
        }
      }
    });

    links.forEach((link) => {
      if ((link.dataset.sceneLink ?? link.dataset.sceneDot) === scene)
        link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    if (languageLink)
      languageLink.href = `${import.meta.env.BASE_URL}${locale === 'es' ? 'en/' : ''}#${scene}`;
    window.scrollTo(0, 0);
  }

  function showScene(scene: Scene, animate = true): void {
    clearTimeout(timer);
    cue?.cancel();
    wipeBars.forEach((bar) =>
      bar.getAnimations().forEach((animation) => animation.cancel())
    );
    document.body.classList.remove('is-changing-scene');
    pendingScene = null;
    if (
      !animate ||
      reducedMotion.matches ||
      document.documentElement.dataset.motion === 'paused' ||
      !blackout
    ) {
      commitScene(scene, false);
      return;
    }
    pendingScene = scene;
    document.body.classList.add('is-changing-scene');
    cue = blackout.animate(
      [
        { opacity: 0 },
        { opacity: 0.9, offset: 0.35 },
        { opacity: 0.9, offset: 0.55 },
        { opacity: 0 },
      ],
      {
        duration: 680,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    );
    // Triad color wipe transition while scene switches under cover.
    wipeBars.forEach((bar, index) =>
      bar.animate(
        [
          { transform: 'scaleX(0)', transformOrigin: 'left' },
          { transform: 'scaleX(1)', transformOrigin: 'left', offset: 0.35 },
          { transform: 'scaleX(1)', transformOrigin: 'right', offset: 0.55 },
          { transform: 'scaleX(0)', transformOrigin: 'right' },
        ],
        { duration: 680, delay: index * 30, easing: 'cubic-bezier(.7,0,.3,1)' }
      )
    );
    timer = setTimeout(() => {
      commitScene(scene, true);
      pendingScene = null;
      document.body.classList.remove('is-changing-scene');
    }, 320);
    cue.onfinish = () => document.body.classList.remove('is-changing-scene');
  }
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) showScene(pendingScene || readScene(), false);
  });

  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener('click', (event) => {
        if (link.hash === '#main') {
          event.preventDefault();
          document.getElementById('main')?.focus({ preventScroll: true });
          return;
        }

        const scene = scenes.find((candidate) => link.hash === `#${candidate}`);
        if (!scene) return;

        event.preventDefault();
        if (window.location.hash !== link.hash)
          history.pushState(null, '', link.hash);
        showScene(scene);
      });
    });

  window.addEventListener('hashchange', () => showScene(readScene()));
  const initialScene = readScene();
  showScene(initialScene, false);
  return initialScene;
}
