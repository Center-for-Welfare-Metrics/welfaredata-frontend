export type Specie = {
  _id: string;
  name: string;
  pathname: string;
  description: string;
  processogramsCount: number;
  productionModulesCount: number;
  processograms_urls?: string[];
  createdAt: string;
  updatedAt: string;
};
