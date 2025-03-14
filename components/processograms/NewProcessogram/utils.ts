import { LEVELS_DICT } from "./consts";

export const getLevelById = (id: string): number => {
  return LEVELS_DICT["--" + id.split("--")[1].split("-")[0]];
};
