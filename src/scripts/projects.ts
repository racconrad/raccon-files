import { projects, defaultProjectId } from '../data/portfolio';
import { wipeIn } from '../lib/motion';

export function initProjects(): void {
  const ids = projects.map((project) => project.id);
  const selectors = document.querySelectorAll<HTMLButtonElement>(
    '[data-project-select]'
  );
  const broadcasts = document.querySelectorAll<HTMLElement>('[data-broadcast]');
  let currentProject: string = defaultProjectId;

  function selectProject(id: string, animate = false): void {
    if (!ids.includes(id)) return;
    const changed = currentProject !== id;
    currentProject = id;
    document.body.dataset.focus = id;

    selectors.forEach((button) =>
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.projectSelect === id)
      )
    );
    broadcasts.forEach((broadcast) => {
      const active = broadcast.dataset.broadcast === id;
      broadcast.hidden = !active;
      if (active && animate && changed) {
        wipeIn(broadcast);
      }
    });
  }

  selectors.forEach((button) =>
    button.addEventListener('click', () =>
      selectProject(button.dataset.projectSelect!, true)
    )
  );
  const step = (direction: number) =>
    selectProject(
      ids[(ids.indexOf(currentProject) + direction + ids.length) % ids.length],
      true
    );
  document
    .querySelectorAll<HTMLButtonElement>('[data-project-step]')
    .forEach((button) =>
      button.addEventListener('click', () =>
        step(Number(button.dataset.projectStep))
      )
    );
  // Left/Right arrow keys change active project while in projects scene.
  window.addEventListener('keydown', (event) => {
    if (
      document.body.dataset.activeScene !== 'projects' ||
      document.querySelector('dialog[open]') ||
      (event.target as Element).closest('input, textarea, select')
    )
      return;
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });

  selectProject(currentProject, false);
}
