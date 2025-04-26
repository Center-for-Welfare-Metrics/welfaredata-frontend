export const getElementNameFromId = (id: string): string => {
  const index = id.indexOf("--");
  const name = index !== -1 ? id.slice(0, index) : id;
  return name.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "").trim();
};
