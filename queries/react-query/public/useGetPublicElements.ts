import { request } from "../request";
import { ElementData } from "types/element-data";

type GetPublicElementsParams = {
  specie: string;
};

export const getPublicElements = async (params: GetPublicElementsParams) => {
  const { data } = await request<Element[]>({
    method: "GET",
    service: "public",
    url: "/elements",
    query: params,
  });

  return data;
};

type GetElementsDataParams = {
  specie: string;
};

export const getElementsData = async (params: GetElementsDataParams) => {
  const { data } = await request<ElementData[]>({
    method: "GET",
    service: "public",
    url: "elements/data",
    query: params,
  });

  return data;
};
