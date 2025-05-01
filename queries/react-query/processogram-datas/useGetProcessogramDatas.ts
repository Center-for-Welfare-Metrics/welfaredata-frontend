import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys";
import { ProcessogramData } from "types/processogram-data";

type GetElementDataByElementParams = {
  processogram_id: string;
};

const getProcessogramDataByProcessogramId = async (
  params: GetElementDataByElementParams
) => {
  const { data } = await request<ProcessogramData>({
    method: "GET",
    service: "admin-processogram-datas",
    url: `/processograms/${params.processogram_id}`,
  });

  return data;
};

export const useGetProcessogramDataByProcessogramId = (
  params: GetElementDataByElementParams
) => {
  return useQuery({
    queryKey: [QueryKeys.PROCESSOGRAM_DATAS.ByID, params.processogram_id],
    queryFn: () => getProcessogramDataByProcessogramId(params),
    enabled: !!params.processogram_id,
    refetchOnWindowFocus: false,
  });
};

type GetElementsData = {
  specie_id: string;
};

const getProcessogramDatas = async (params: GetElementsData) => {
  const { data } = await request<ProcessogramData[]>({
    method: "GET",
    service: "admin-processogram-datas",
    url: "/",
    query: params,
  });

  return data;
};

export const useGetProcessogramDatas = (params: GetElementsData) => {
  return useQuery({
    queryKey: [QueryKeys.PROCESSOGRAM_DATAS.List, params],
    queryFn: () => getProcessogramDatas(params),
    enabled: !!params.specie_id,
    refetchOnWindowFocus: false,
  });
};
