import { useQuery } from "@tanstack/react-query";
import { request } from "../request";
import { QueryKeys } from "../keys";
import { ProcessogramHierarchy } from "types/processogram";
import { ProcessogramImages } from "../processogram-images/useGetImages";

type Params = {
  hierarchy: ProcessogramHierarchy[];
};

export type SearchedImageResult = {
  link: string;
  title: string;
  image: {
    thumbnailLink: string;
  };
};

export type SearchImageRespose = {
  images: SearchedImageResult[];
  searchTerm: string;
};

const removeRawId = (hierarchy: ProcessogramHierarchy[]) => {
  return hierarchy.map((item) => {
    const { rawId, ...rest } = item;
    return rest;
  });
};

const searchImages = async ({ hierarchy }: Params) => {
  const sanitizedHierarchy = removeRawId(hierarchy);

  const { data } = await request<SearchImageRespose>({
    method: "POST",
    service: "public",
    url: "/search-images",
    data: {
      hierarchy: sanitizedHierarchy,
    },
  });

  return data;
};

export const useGetSearchedImages = (params: Params, enabled = true) => {
  return useQuery({
    queryKey: [QueryKeys.GET_IMAGES.Search, params],
    queryFn: () => searchImages(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled,
    staleTime: Infinity,
  });
};

const getImages = async (processogram_id: string) => {
  const { data } = await request<ProcessogramImages>({
    method: "GET",
    service: "public",
    url: `processogram-images/processograms/${processogram_id}`,
  });

  return data;
};

export const useGetPublicImages = (processogram_id: string, enabled = true) => {
  return useQuery({
    queryKey: [QueryKeys.GET_IMAGES.List, processogram_id],
    queryFn: () => getImages(processogram_id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled,
  });
};
