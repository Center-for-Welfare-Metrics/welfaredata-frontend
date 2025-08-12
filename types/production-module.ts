export type ProductionModule = {
  name: string;
  slug: string;
  description: string;
  specie_id: string;
  processogramsCount: number;
  processograms: {
    _id: string;
    identifier: string;
    url_dark: string | undefined;
    url_light: string | undefined;
  }[];
  creator_id: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export type ProductionModuleById = ProductionModule & {
  specie: {
    _id: string;
    name: string;
    description: string;
    pathname: string;
  };
};
