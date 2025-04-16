import { request } from "../request";
import { useQuery } from "react-query";
import { QueryKeys } from "../keys";
import { Specie } from "types/species";

type GetEpisodsListPayload = {
  query: {
    patient_id: string;
    page: number;
    limit: number;
    [key: string]: any;
  };
};

const getSpecies = async () => {
  const { data } = await request({
    method: "GET",
    service: "admin-species",
    url: `/`,
  });

  return data as Specie[];
};

export const useGetSpecies = (enabled = true) => {
  return useQuery([QueryKeys.SPECIES.List], () => getSpecies(), {
    enabled,
  });
};

type GetEpisodeByIdPayload = {
  params: {
    episode_id: string;
  };
};

export type GetSpecieByIdPayload = {
  params: {
    specie_id: string;
  };
};

const getSpecieById = async ({ params }: GetSpecieByIdPayload) => {
  const { data } = await request({
    method: "GET",
    service: "admin-species",
    url: `/${params.specie_id}`,
  });

  return data as Specie;
};

export const useGetEpisodeById = (
  params: GetSpecieByIdPayload["params"],
  enabled = true
) => {
  return useQuery(
    [QueryKeys.SPECIES.ByID, params],
    () => getSpecieById({ params }),
    {
      enabled,
    }
  );
};
