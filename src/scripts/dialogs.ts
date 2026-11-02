import { reveal } from '../lib/motion';

export function initDialogs(): void {
  let returnFocus: HTMLElement | null = null;

  document
    .querySelectorAll<HTMLButtonElement>('[data-open]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const dialog = document.getElementById(button.dataset.open!);
        if (!(dialog instanceof HTMLDialogElement)) return;

        returnFocus = button;
        if (button.classList.contains('puzzle-piece'))
          button.classList.add('is-discovered');
        dialog.showModal();
        dialog.scrollTop = 0;
        reveal(dialog, 0.35);
      });
    });

  document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dialog) => {
    dialog
      .querySelector('[data-close]')
      ?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () =>
      returnFocus?.focus({ preventScroll: true })
    );
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;
      if (outside) dialog.close();
    });
  });
}
