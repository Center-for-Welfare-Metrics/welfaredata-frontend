export const LEVELS_DICT = {
  "--ps": 0,
  "--lf": 1,
  "--ph": 2,
  "--ci": 3,
} as const;

export const INVERSE_DICT = Object.fromEntries(
  Object.entries(LEVELS_DICT).map(([key, value]) => [value, key])
) as Record<number, string>;
