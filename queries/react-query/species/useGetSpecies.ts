import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys";
import { Specie } from "types/species";

const getSpecies = async () => {
  const { data } = await request<Specie[]>({
    method: "GET",
    service: "admin-species",
    url: `/`,
  });

  return data;
};

export const useGetSpecies = (enabled = true) => {
  return useQuery({
    queryKey: [QueryKeys.SPECIES.List],
    queryFn: () => getSpecies(),
    enabled,
  });
};

export type GetSpecieByIdPayload = {
  params: {
    specie_id: string;
  };
};

const getSpecieById = async ({ params }: GetSpecieByIdPayload) => {
  const { data } = await request<Specie>({
    method: "GET",
    service: "admin-species",
    url: `/${params.specie_id}`,
  });

  return data;
};

export const useGetSpecieById = (
  params: GetSpecieByIdPayload["params"],
  enabled = true
) => {
  return useQuery({
    queryKey: [QueryKeys.SPECIES.ByID, params],
    queryFn: () => getSpecieById({ params }),
    enabled,
  });
};
