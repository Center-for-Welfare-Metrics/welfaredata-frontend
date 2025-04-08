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
    [key: string]: string;
  };
  createdAt: string;
  updatedAt: string;
};
