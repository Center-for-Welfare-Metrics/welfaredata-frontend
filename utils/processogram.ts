import voca from "voca";
import lodash from "lodash";
import { LevelNames } from "./enum_types";

export interface ICoolFormat {
  levelName:
    | "Circumstance"
    | "Phase"
    | "Life Fate"
    | "Production System"
    | string;
  elementName: string;
  level: number;
  domID: string;
  isHover?: boolean;
}

export const translateStackToCoolFormat = (stack: string[]): ICoolFormat[] => {
  let cool_json: ICoolFormat[] = [];
  try {
    stack.forEach((id, index) => {
      if (id !== null) {
        cool_json.push({
          levelName: getLevelNameByGivingID(id),
          elementName: normalizeElementNameByGivingID(id),
          level: index,
          domID: id,
        });
      }
    });

    return cool_json;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export interface IMedia {
  _id: string;
  originalName: string;
  url: string;
  size: number;
  type: string;
  name?: string;
  descripition?: string;
}
export interface IContentInformation {
  createdAt?: Date;
  description?: string;
  medias?: IMedia[];
  ref__id?: string;
  ref_createdAt?: Date;
  ref_description?: string;
  ref_global_population?: string;
  ref_medias?: IMedia[];
  ref_name?: string;
  ref_alternative_name?: string;
  ref_name_synonyms?: string[];
  ref_specie?: string;
  ref_updatedAt?: Date;
  specie?: string;
  updatedAt?: Date;
  _id?: string;
  noinformation?: boolean;
  elementName?: string;
  levelName: string;
}

export const getCollectionInformationsByCoolFormat = (
  stack: ICoolFormat[],
  collection: any[]
) => {
  const find = (item: ICoolFormat, collection) => {
    if (!item) return null;

    const findProductionSystem = (item: ICoolFormat, collection) => {
      let finded = lodash.find(collection, {
        productionSystem: {
          name: voca.lowerCase(item.elementName),
        },
      });
      return finded;
    };

    const findLifeFate = (item: ICoolFormat, collection) => {
      let finded = lodash.find(collection.lifefates, {
        lifeFate: {
          name: voca.lowerCase(item.elementName),
        },
      });
      return finded;
    };

    const findPhase = (item: ICoolFormat, collection) => {
      let finded = lodash.find(collection.phases, {
        phase: {
          name: voca.lowerCase(item.elementName),
        },
      });
      return finded;
    };

    const findCircumstance = (item: ICoolFormat, collection) => {
      let finded = lodash.find(collection.circumstances, {
        circumstance: {
          name: voca.lowerCase(item.elementName),
        },
      });
      return finded;
    };
    try {
      let levels = {
        0: findProductionSystem,
        1: findLifeFate,
        2: findPhase,
        3: findCircumstance,
      };

      return levels[item.level](item, collection);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const convert_keys = {
    productionSystem: "production system",
    lifeFate: "life fate",
    phase: "phase",
    circumstance: "circumstance",
  };

  const transformToContent = (item, stack_length: number) => {
    if (!item) return null;
    let keys = {
      1: "productionSystem",
      2: "lifeFate",
      3: "phase",
      4: "circumstance",
    };
    try {
      let childrenName = keys[stack_length];
      let children_content = item[childrenName];
      let new_children_content = {};
      Object.keys(children_content).forEach((key) => {
        new_children_content[`ref_${key}`] = children_content[key];
      });

      return {
        ...item,
        ...new_children_content,
        [childrenName]: undefined,
        levelName: convert_keys[childrenName],
      };
    } catch (error) {
      // console.log(error)
      let svgItem = stack[stack_length - 1];
      return {
        ref_name: "",
        ref_description:
          "Information not available yet. Select the feedback tab if you want to leave a suggestion",
        noinformation: true,
        levelName: keys[stack_length],
        elementName: svgItem.elementName,
      };
    }
  };

  if (stack.length > 0) {
    let depth = [];
    let target = collection;
    for (let index in stack) {
      let item = stack[index];
      let finded = find(item, target);
      if (finded) {
        let depth_reference = {
          levelName: voca.lowerCase(item.levelName),
          item: finded,
        };
        depth.push(depth_reference);
        target = finded;
      }
    }
    return {
      content: transformToContent(target, stack.length),
      depth,
    };
  }

  return {
    content: null,
    depth: null,
  };
};

export const getLevelNameByGivingID = (id: string) => {
  if (!id) return null;

  try {
    let map_keys = {
      "--ps": "Production System",
      "--lf": "Life Fate",
      "--ph": "Phase",
      "--ci": "Circumstance",
    };

    let keys = Object.keys(map_keys);

    for (let index in keys) {
      let key = keys[index];

      if (id.includes(key)) {
        return map_keys[key];
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }

  return null;
};

export const normalizeElementNameByGivingID = (id: string) => {
  if (id) {
    try {
      id = id.replace(/--lf|--ps|--ph|--ci|-\d+/g, "");

      id = id.replace(/_/g, " ");

      return voca.titleCase(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  } else {
    return null;
  }
};

export const getElementSizeInformations = (element: Element) => {
  let rect = element.getBoundingClientRect();
  let middleX = rect.left + rect.width / 2;
  let middleY = rect.top + rect.height / 2;

  return { ...rect.toJSON(), middleX, middleY };
};

export const getRightTargetID = ({ element, level, current }) => {
  try {
    let element_helper = element;
    while (
      !element_helper.id?.includes(level) &&
      element_helper.id !== current
    ) {
      element_helper = element_helper.parentElement;
    }
    if (element_helper.id === current) {
      return null;
    }

    return element_helper.id;
  } catch (error) {
    return null;
  }
};

export const getPreviousSiblingFrom = (element: Element) => {
  let previous_sibling = element.nextElementSibling as any;

  let siblingElementName = normalizeElementNameByGivingID(previous_sibling?.id);
  let elementName = normalizeElementNameByGivingID(element.id);

  if (siblingElementName === elementName)
    return getNextSiblingFrom(previous_sibling);

  if (previous_sibling !== null && !previous_sibling.id.includes("--")) {
    return null;
  }

  if (previous_sibling === null) {
    if (element.id.includes("--ci")) {
      let el = element.parentElement.childNodes[0] as any;
      if (!el.id.includes("--")) {
        return null;
      }

      return el;
    }
  }

  return previous_sibling;
};

export const getNextSiblingFrom = (element: Element) => {
  let next_sibling = element.previousElementSibling as any;

  let siblingElementName = normalizeElementNameByGivingID(next_sibling?.id);
  let elementName = normalizeElementNameByGivingID(element.id);

  if (next_sibling !== null && !next_sibling.id.includes("--")) {
    return null;
  }

  if (siblingElementName === elementName)
    return getNextSiblingFrom(next_sibling);

  if (next_sibling === null) {
    if (element.id.includes("--ci")) {
      let child_length = element.parentElement.childNodes.length;
      let el = element.parentElement.childNodes[child_length - 1] as any;
      if (!el.id.includes("--")) {
        return null;
      }
      return el;
    }
  }

  return next_sibling;
};

export interface IDepth {
  item: any;
  levelName: LevelNames;
}

let dict_helper = {
  "life fate": "lifefates",
  phase: "phases",
  circumstance: "circumstances",
};

export const getInfoToUpdateProcessogram = (depth: IDepth[]) => {
  if (!depth || depth.length === 0) return null;
  let id_tree = {};
  let processogram_id;
  depth.forEach((item) => {
    if (item.levelName === "production system") {
      processogram_id = item.item?._id;
    } else {
      id_tree[dict_helper[item.levelName]] = item.item?._id;
    }
  });
  return { processogram_id, id_tree };
};
