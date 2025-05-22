import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys";
import {
  ProductionModule,
  ProductionModuleById,
} from "types/production-module";

type GetProductionModulesParams = {
  specie_id: string;
};

const getProductionModules = async (params: GetProductionModulesParams) => {
  const { data } = await request({
    method: "GET",
    service: "admin-production-modules",
    url: `/`,
    query: params,
  });

  return data as ProductionModule[];
};

export const useGetProductionModules = (
  params: GetProductionModulesParams,
  enabled = true
) => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTION_MODULES.List, params],
    queryFn: () => getProductionModules(params),
    enabled,
  });
};

export type GetProductionModuleByIdPayload = {
  params: {
    production_module_id: string;
  };
};

const getProductionModuleById = async ({
  params,
}: GetProductionModuleByIdPayload) => {
  const { data } = await request({
    method: "GET",
    service: "admin-production-modules",
    url: `/${params.production_module_id}`,
  });

  return data as ProductionModuleById;
};

export const useGetProductionModuleById = (
  params: GetProductionModuleByIdPayload["params"],
  enabled = true
) => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTION_MODULES.ByID, params],
    queryFn: () => getProductionModuleById({ params }),
    enabled,
  });
};
