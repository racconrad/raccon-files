import type { Locale } from '../data/portfolio';
import { ui } from '../data/ui';

export function initContact(locale: Locale): void {
  const button = document.querySelector<HTMLButtonElement>('[data-copy-link]');
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  const t = ui(locale);
  let timer: ReturnType<typeof setTimeout>;

  button?.addEventListener('click', async () => {
    if (!toast) return;
    let message = t.copied;
    try {
      await navigator.clipboard.writeText(button.dataset.copyLink!);
    } catch {
      message = t.copyFailed;
    }

    clearTimeout(timer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    timer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  });
}
