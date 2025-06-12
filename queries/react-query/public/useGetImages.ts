import { useQuery } from "@tanstack/react-query";
import { request } from "../request";
import { QueryKeys } from "../keys";
import { ProcessogramHierarchy } from "types/processogram";

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

const getImages = async ({ hierarchy }: Params) => {
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

export const useGetImages = (params: Params, enabled = true) => {
  return useQuery({
    queryKey: [QueryKeys.GET_IMAGES.List, params],
    queryFn: () => getImages(params),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled,
    staleTime: Infinity,
  });
};
