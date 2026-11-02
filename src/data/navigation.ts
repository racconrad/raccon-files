import { show } from './portfolio';

export const allScenes = [
  'home',
  'projects',
  'skills',
  'about',
  'journey',
  'contact',
] as const;
export type Scene = (typeof allScenes)[number];

export const scenes = allScenes.filter(
  (scene) =>
    scene === 'home' ||
    (scene === 'journey'
      ? show.journey && (show.timeline || show.certificates)
      : show[scene])
);
