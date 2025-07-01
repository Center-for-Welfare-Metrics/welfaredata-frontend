import { Processogram } from "types/processogram";

type PartialProcessogram = {
  original_name_dark: string | undefined;
  final_size_dark: number | undefined;
  original_size_dark: number | undefined;
  original_name_light: string | undefined;
  final_size_light: number | undefined;
  original_size_light: number | undefined;
};

export const getDarkProcessogramDetails = (element: PartialProcessogram) => {
  if (
    element.original_name_dark &&
    element.final_size_dark &&
    element.original_size_dark
  ) {
    return {
      original_size: element.original_size_dark,
      final_size: element.final_size_dark,
      name: element.original_name_dark,
    };
  }

  return undefined;
};

export const getLightProcessogramDetails = (element: PartialProcessogram) => {
  if (
    element.original_name_light &&
    element.final_size_light &&
    element.original_size_light
  ) {
    return {
      original_size: element.original_size_light,
      final_size: element.final_size_light,
      name: element.original_name_light,
    };
  }

  return undefined;
};
