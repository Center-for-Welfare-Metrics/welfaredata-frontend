export const getElementNameFromId = (id: string): string => {
  const index = id.indexOf("--");
  const name = index !== -1 ? id.slice(0, index) : id;
  return name.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "").trim();
};

export const getLevelFromId = (id: string) => {
  const level = id.split("--")[1];
  return level.replace(/-\d+$/, "");
};

export const getElementLevelFromId = (id: string) => {
  const levelObject = {
    ps: "Production system",
    lf: "Life fate",
    ph: "Phase",
    ci: "Circumstance",
  };

  const level = id.split("--")[1];

  const levelWithoutNumbers = level.replace(/[^a-zA-Z]/g, "");

  if (levelObject[levelWithoutNumbers as keyof typeof levelObject]) {
    return levelObject[levelWithoutNumbers as keyof typeof levelObject];
  }
  return levelWithoutNumbers;
};
