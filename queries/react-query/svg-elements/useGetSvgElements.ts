import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys";
import { Element, ElementById } from "types/elements";

type GetElementsParams = {
  specie_id: string;
};

const getElements = async (params: GetElementsParams) => {
  const { data } = await request({
    method: "GET",
    service: "admin-elements",
    url: `/`,
    query: params,
  });

  return data as Element[];
};

export const useGetElements = (params: GetElementsParams, enabled = true) => {
  return useQuery({
    queryKey: [QueryKeys.ELEMENTS.List, params],
    queryFn: () => getElements(params),
    enabled,
  });
};

export type GetElementByIdPayload = {
  params: {
    element_id: string;
  };
};

const getElementById = async ({ params }: GetElementByIdPayload) => {
  const { data } = await request({
    method: "GET",
    service: "admin-elements",
    url: `/${params.element_id}`,
  });

  return data as ElementById;
};

export const useGetElementById = (
  params: GetElementByIdPayload["params"],
  enabled = true
) => {
  return useQuery({
    queryKey: [QueryKeys.ELEMENTS.ByID, params],
    queryFn: () => getElementById({ params }),
    enabled,
  });
};
