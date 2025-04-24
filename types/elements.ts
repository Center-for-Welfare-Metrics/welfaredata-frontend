export type ElementStatus = "processing" | "ready" | "error" | "generating";

export type Element = {
  _id: string;
  identifier: string;
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
  status: ElementStatus;
  createdAt: string;
  updatedAt: string;
};

export type ElementById = {
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
  status: ElementStatus;
  createdAt: string;
  updatedAt: string;
};
