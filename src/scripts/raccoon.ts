import { reducedMotion } from '../lib/motion';

type Mood = 'pop' | 'shake' | 'walk';

const source = (pose: string) =>
  `${import.meta.env.BASE_URL}images/raccoon/${pose}.svg`;
// Companion pose per scene (Home and Contact have dedicated scene avatars).
const scenePose: Record<string, string> = {
  projects: 'coding',
  skills: 'studying',
  about: 'music',
};
// Stage side per scene so companion walks across during transitions.
const sceneSide: Record<string, 'left' | 'right'> = {
  projects: 'right',
  skills: 'left',
  about: 'right',
};
const shaky = new Set(['surprise', 'alert', 'doubt', 'sweat', 'overwhelmed']);
const IDLE_MS = 25000;
const HOLD_MS = 1400; // Minimum duration to hold pose
const INTENT_MS = 350; // Hover delay before reacting
const FADE_MS = 180;

const still = () =>
  reducedMotion.matches || document.documentElement.dataset.motion === 'paused';
const wait = (ms: number) => new Promise((done) => setTimeout(done, ms));
const pacing = new WeakMap<HTMLElement, { at: number; timer?: number }>();

// Switch pose with short fade and mood-dependent hop.
async function setPose(
  raccoon: HTMLElement,
  pose: string,
  mood?: Mood
): Promise<void> {
  const image = raccoon.querySelector('img')!;
  if (image.getAttribute('src') === source(pose)) return;
  if (!still()) {
    raccoon.classList.add('is-leaving');
    await wait(FADE_MS);
  }
  image.src = source(pose);
  await image.decode().catch(() => undefined);
  raccoon.classList.remove('is-leaving', 'is-switching');
  raccoon.dataset.mood = mood ?? (shaky.has(pose) ? 'shake' : 'pop');
  if (still()) return;
  void raccoon.offsetWidth; // Force reflow to restart CSS animation
  raccoon.classList.add('is-switching');
}

// Request pose respecting hold duration; latest request wins.
function requestPose(
  raccoon: HTMLElement,
  pose: string,
  { delay = 0, mood }: { delay?: number; mood?: Mood } = {}
): void {
  const state = pacing.get(raccoon) ?? { at: 0 };
  pacing.set(raccoon, state);
  clearTimeout(state.timer);
  const ready = Math.max(delay, state.at + HOLD_MS - performance.now());
  state.timer = window.setTimeout(() => {
    state.at = performance.now();
    void setPose(raccoon, pose, mood);
  }, ready);
}

// Cancel pending transitions and mark current pose timestamp.
function holdFrom(raccoon: HTMLElement, at: number): void {
  clearTimeout(pacing.get(raccoon)?.timer);
  pacing.set(raccoon, { at });
}

function hearts(raccoon: HTMLElement): void {
  if (still()) return;
  for (let index = 0; index < 3; index++) {
    const heart = document.createElement('i');
    heart.className = 'raccoon-heart';
    heart.textContent = '♥';
    heart.style.setProperty('--drift', `${(index - 1) * 26}px`);
    heart.style.animationDelay = `${index * 90}ms`;
    heart.addEventListener('animationend', () => heart.remove());
    raccoon.append(heart);
  }
}

export function initRaccoons(): void {
  const raccoons = document.querySelectorAll<HTMLElement>('[data-raccoon]');
  const companion = document.querySelector<HTMLElement>('.companion');
  const basePose = (raccoon: HTMLElement) =>
    raccoon === companion
      ? (scenePose[document.body.dataset.activeScene ?? ''] ?? 'coding')
      : raccoon.dataset.raccoon!.split(' ')[0];
  // Visible raccoon: active scene avatar, or stage companion fallback.
  const active = () =>
    document.querySelector<HTMLElement>(
      '[data-scene]:not([hidden]) [data-raccoon]'
    ) ?? companion;

  // Preload pose assets for instant switching.
  new Set([
    ...[...raccoons].flatMap((raccoon) => raccoon.dataset.raccoon!.split(' ')),
    ...[...document.querySelectorAll<HTMLElement>('[data-pose]')].map(
      (element) => element.dataset.pose!
    ),
    'walk',
    'walk_music',
    'sleep',
    'sleep_bag',
    'surprise',
    'sweat',
  ]).forEach((pose) => (new Image().src = source(pose)));

  // Cycle to next pose and spawn hearts on click.
  raccoons.forEach((raccoon) => {
    if (!(raccoon instanceof HTMLButtonElement)) return;
    const poses = raccoon.dataset.raccoon!.split(' ');
    let index = 0;
    raccoon.addEventListener('click', () => {
      index = (index + 1) % poses.length;
      holdFrom(raccoon, 0);
      requestPose(raccoon, poses[index]);
      hearts(raccoon);
    });
    raccoon.addEventListener('animationend', (event) => {
      if (event.target === raccoon.querySelector('img'))
        raccoon.classList.remove('is-switching');
    });
  });

  // React to hover/focus/tap on any element with data-pose.
  let watched: Element | null = null;
  const react = (event: Event) => {
    const target = (event.target as Element).closest?.('[data-pose]');
    if (!target || (target === watched && event.type !== 'click')) return;
    watched = target;
    const raccoon = active();
    if (raccoon)
      requestPose(raccoon, (target as HTMLElement).dataset.pose!, {
        delay: event.type === 'click' ? 0 : INTENT_MS,
      });
  };
  ['pointerover', 'focusin', 'click'].forEach((type) =>
    document.addEventListener(type, react)
  );

  // Companion walks across stage on scene change; fast hopping triggers dizzy pose.
  const jumps: number[] = [];
  if (companion) {
    companion.querySelector('img')!.src = source(basePose(companion));
    new MutationObserver(() => {
      watched = null;
      const now = performance.now();
      jumps.push(now);
      while (jumps[0] < now - 5000) jumps.shift();
      const up = document.body.dataset.direction === 'up';
      const side = sceneSide[document.body.dataset.activeScene ?? ''];
      if (side) {
        // Face walking direction; take a few steps if staying on the same side.
        if (side !== companion.dataset.side) companion.dataset.facing = side;
        companion.dataset.side = side;
      }
      holdFrom(companion, now);
      void setPose(companion, up ? 'walk_music' : 'walk', 'walk');
      requestPose(companion, jumps.length >= 4 ? 'sweat' : basePose(companion));
      raccoons.forEach((raccoon) => {
        if (raccoon !== companion) void setPose(raccoon, basePose(raccoon));
      });
    }).observe(document.body, { attributeFilter: ['data-active-scene'] });
  }

  // Sleep on idle; wake up surprised on user activity.
  let idle: ReturnType<typeof setTimeout>;
  let sleeper: HTMLElement | null = null;
  const wake = () => {
    clearTimeout(idle);
    if (sleeper) {
      const raccoon = sleeper;
      sleeper = null;
      raccoon.classList.remove('is-asleep');
      holdFrom(raccoon, performance.now());
      void setPose(raccoon, 'surprise');
      requestPose(raccoon, basePose(raccoon));
    }
    idle = setTimeout(() => {
      sleeper = active();
      if (!sleeper) return;
      sleeper.classList.add('is-asleep');
      holdFrom(sleeper, performance.now());
      void setPose(sleeper, Math.random() < 0.5 ? 'sleep' : 'sleep_bag');
    }, IDLE_MS);
  };
  ['pointermove', 'keydown', 'pointerdown', 'wheel', 'touchstart'].forEach(
    (type) => window.addEventListener(type, wake, { passive: true })
  );
  wake();
}
