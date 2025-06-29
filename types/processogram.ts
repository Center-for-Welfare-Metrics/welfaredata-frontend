export type ProcessogramStatus =
  | "processing"
  | "ready"
  | "error"
  | "generating";

type ProcessogramTheme = "light" | "dark";

export type Processogram = {
  _id: string;
  identifier: string;
  specie_id: string;
  production_module_id: string;
  name: string;
  description: string;
  levelName: string;

  original_name_light: string;
  svg_url_light: string;
  original_size_light: number;
  final_size_light: number;

  original_name_dark: string;
  svg_url_dark: string;
  original_size_dark: number;
  final_size_dark: number;

  raster_images:
    | {
        [key: string]: {
          src: string;
          width: number;
          height: number;
          x: number;
          y: number;
        };
      }
    | undefined;
  is_published: boolean;
  status: ProcessogramStatus;
  theme: ProcessogramTheme;
  createdAt: string;
  updatedAt: string;
};

export type ProcessogramById = {
  _id: string;
  identifier: string;
  specie: {
    _id: string;
    name: string;
    pathname: string;
    creator_id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  specie_id: string;

  name: string;
  description: string;
  levelName: string;

  raster_images: {
    [key: string]: {
      src: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
  is_published: boolean;
  production_module_id: string;
  production_module: {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  status: ProcessogramStatus;

  original_name_light: string;
  svg_url_light: string;
  original_size_light: number;
  final_size_light: number;

  original_name_dark: string;
  svg_url_dark: string;
  original_size_dark: number;
  final_size_dark: number;

  originalSize: number;
  finalSize: number;
  createdAt: string;
  updatedAt: string;
};

export type ProcessogramHierarchy = {
  levelNumber: number;
  level: string;
  name: string;
  id: string;
  rawId: string;
};
