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
  root_id: string | null;
  element_type: string;
  name: string;
  levelName: string;
  svg_url: string;
  raster_images: {
    [key: string]: {
      src: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
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
  root_id: string | null;
  element_type: string;
  name: string;
  levelName: string;
  svg_url: string;
  raster_images: {
    [key: string]: {
      src: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
  production_module_id: string;
  production_module: {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  status: ProcessogramStatus;
  theme: ProcessogramTheme;
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
