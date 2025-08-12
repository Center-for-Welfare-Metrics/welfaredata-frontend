export type Specie = {
  _id: string;
  name: string;
  pathname: string;
  description: string;
  processogramsCount: number;
  productionModulesCount: number;
  processograms: {
    _id: string;
    identifier: string;
    url_dark: string | undefined;
    url_light: string | undefined;
  }[];
  createdAt: string;
  updatedAt: string;
};
