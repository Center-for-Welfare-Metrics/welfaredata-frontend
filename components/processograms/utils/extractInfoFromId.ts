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

export const getElementNameFromId = (id: string): string => {
  const index = id.indexOf("--");
  const name = index !== -1 ? id.slice(0, index) : id;
  return name.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "").trim();
};

export const getLevelAliasFromId = (id: string): string => {
  const level = id.split("--")[1];

  const levelWithoutNumbers = level.replace(/[^a-zA-Z]/g, "");

  return levelWithoutNumbers;
};

export const getLevelNumberById = (id: string | null): number => {
  if (!id) return -1;

  const levelWithoutNumbers = getLevelAliasFromId(id);

  return LEVELS_DICT["--" + levelWithoutNumbers];
};

export const getElementLevelFromId = (id: string) => {
  const levelObject = {
    ps: "Production system",
    lf: "Life fate",
    ph: "Phase",
    ci: "Circumstance",
  };

  const levelWithoutNumbers = getLevelAliasFromId(id);

  if (levelObject[levelWithoutNumbers as keyof typeof levelObject]) {
    return levelObject[levelWithoutNumbers as keyof typeof levelObject];
  }
  return levelWithoutNumbers;
};
