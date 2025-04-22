import { gsap } from "gsap";

export const LEVELS_DICT: {
  [key: string]: number;
} = {
  "--ps": 0,
  "--lf": 1,
  "--ph": 2,
  "--ci": 3,
} as const;

export const INVERSE_DICT = Object.fromEntries(
  Object.entries(LEVELS_DICT).map(([key, value]) => [value, key])
) as Record<number, string>;

export const MAX_LEVEL = Object.keys(LEVELS_DICT).length - 1;

export const ANIMATION_DURATION = 0.7; // seconds

export const ANIMATION_EASE: gsap.EaseString = "power1.inOut";
