export type ElementData = {
  _id: string;
  production_system_name: string;
  specie_id: string;
  svg_element_id: string;
  data: {
    [key: string]: {
      id: string;
      level: string;
      name: string;
      description: string;
      duration_label: string;
      duration_in_seconds: number | string;
    };
  };
};

export type Hierarchy = {
  levelNumber: number;
  level: string;
  name: string;
  id: string;
}[];
