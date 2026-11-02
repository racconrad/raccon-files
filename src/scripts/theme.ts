import { savePreference } from '../lib/preferences';

export function initTheme(): void {
  const button = document.querySelector<HTMLButtonElement>(
    '[data-theme-toggle]'
  );

  function applyTheme(theme: string): void {
    document.documentElement.dataset.theme = theme;
    button?.setAttribute('aria-pressed', String(theme === 'light'));
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        'content',
        getComputedStyle(document.documentElement)
          .getPropertyValue('--ground')
          .trim()
      );
  }

  applyTheme(document.documentElement.dataset.theme || 'dark');
  button?.addEventListener('click', () => {
    const theme =
      document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    savePreference('raccon-theme', theme);
  });
}
