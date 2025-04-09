export type Element = {
  _id: string;
  identifier: string;
  specie: string;
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
  createdAt: string;
  updatedAt: string;
};
