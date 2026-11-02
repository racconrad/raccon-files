import type { Locale } from '../data/portfolio';
import { initNavigation } from './navigation';
import { initProjects } from './projects';
import { initDialogs } from './dialogs';
import { initTheme } from './theme';
import { initContact } from './contact';
import { initAmbient } from './ambient';
import { initIntro } from './intro';
import { initRaccoons } from './raccoon';
import { initSceneScroll } from './scroll';

export function initPortfolio(): void {
  const locale: Locale = document.body.dataset.locale === 'en' ? 'en' : 'es';
  document.body.classList.add('is-enhanced', 'stage-ready');

  initAmbient(locale);
  const scene = initNavigation(locale);
  initProjects();
  initDialogs();
  initTheme();
  initContact(locale);
  initRaccoons();
  initSceneScroll();
  initIntro(scene === 'home');
}
