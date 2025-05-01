import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys";
import { Processogram, ProcessogramById } from "types/processogram";

type GetProcessogramsParams = {
  specie_id: string;
};

const getProcessograms = async (params: GetProcessogramsParams) => {
  const { data } = await request({
    method: "GET",
    service: "admin-processograms",
    url: `/`,
    query: params,
  });

  return data as Processogram[];
};

export const useGetProcessograms = (
  params: GetProcessogramsParams,
  enabled = true
) => {
  return useQuery({
    queryKey: [QueryKeys.PROCESSOGRAMS.List, params],
    queryFn: () => getProcessograms(params),
    enabled,
  });
};

export type GetProcessogramByIdPayload = {
  params: {
    processogram_id: string;
  };
};

const getProcessogramById = async ({ params }: GetProcessogramByIdPayload) => {
  const { data } = await request({
    method: "GET",
    service: "admin-processograms",
    url: `/${params.processogram_id}`,
  });

  return data as ProcessogramById;
};

export const useGetProcessogramById = (
  params: GetProcessogramByIdPayload["params"],
  enabled = true
) => {
  return useQuery({
    queryKey: [QueryKeys.PROCESSOGRAMS.ByID, params],
    queryFn: () => getProcessogramById({ params }),
    enabled,
  });
};
