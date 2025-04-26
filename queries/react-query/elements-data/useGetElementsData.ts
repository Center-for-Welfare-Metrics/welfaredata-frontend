import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys";
import { ElementData } from "types/element-data";

type GetElementDataByElementParams = {
  element_id: string;
};

const getElementDataBySvgElementID = async (
  params: GetElementDataByElementParams
) => {
  const { data } = await request<ElementData>({
    method: "GET",
    service: "admin-element-data",
    url: `/by-element/${params.element_id}`,
  });

  return data;
};

export const useGetElementDataBySvgElementID = (
  params: GetElementDataByElementParams
) => {
  return useQuery({
    queryKey: [QueryKeys.ELEMENT_DATA.ByID, params.element_id],
    queryFn: () => getElementDataBySvgElementID(params),
    enabled: !!params.element_id,
    refetchOnWindowFocus: false,
  });
};

type GetElementsData = {
  specie_id: string;
};

const getElementsData = async (params: GetElementsData) => {
  const { data } = await request<ElementData[]>({
    method: "GET",
    service: "admin-element-data",
    url: "/",
    query: params,
  });

  return data;
};

export const useGetElementsData = (params: GetElementsData) => {
  return useQuery({
    queryKey: [QueryKeys.ELEMENT_DATA.List, params],
    queryFn: () => getElementsData(params),
    enabled: !!params.specie_id,
    refetchOnWindowFocus: false,
  });
};
