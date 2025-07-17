import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../request";
import { QueryKeys } from "../keys";
import { SearchedImageResult } from "../public/useGetImages";
import toast from "react-hot-toast";

type UploadedImageResult = {
  source: "url-only" | "bucket-s3";
  url: string;
  updated_at: string;
};

type ProcessogramImages = {
  autoSearch: boolean;
  processogram_id: string;
  images: Record<string, UploadedImageResult[]> | undefined;
};

const getImages = async (processogram_id: string) => {
  const { data } = await request<ProcessogramImages>({
    method: "GET",
    service: "admin-processogram-images",
    url: `/processograms/${processogram_id}`,
  });

  return data;
};

export const useGetImages = (processogram_id: string, enabled = true) => {
  return useQuery({
    queryKey: [QueryKeys.GET_IMAGES.List, processogram_id],
    queryFn: () => getImages(processogram_id),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled,
  });
};

type AddProcessogramImage = {
  processogram_id: string;
  key: string;
  url: string;
};

const addProcessogramImage = async (params: AddProcessogramImage) => {
  const { data } = await request<ProcessogramImages>({
    method: "PATCH",
    service: "admin-processogram-images",
    url: `/${params.processogram_id}`,
    data: {
      key: params.key,
      url: params.url,
    },
  });

  return data;
};

export const useAddProcessogramImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddProcessogramImage) => addProcessogramImage(params),
    onSuccess: (_, { processogram_id }) => {
      toast.success("Image added successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_IMAGES.List, processogram_id],
      });
    },
  });
};

const deleteProcessogram = async (params: AddProcessogramImage) => {
  const { data } = await request<ProcessogramImages>({
    method: "PATCH",
    service: "admin-processogram-images",
    url: `/${params.processogram_id}/remove`,
    data: {
      key: params.key,
      url: params.url,
    },
  });

  return data;
};

export const useDeleteProcessogramImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddProcessogramImage) => deleteProcessogram(params),
    onSuccess: (_, { processogram_id }) => {
      toast.success("Image deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_IMAGES.List, processogram_id],
      });
    },
  });
};

type UpdateAutoSearchParams = {
  id: string;
  autoSearch: boolean;
};

const updateAutoSearch = async (params: UpdateAutoSearchParams) => {
  const { data } = await request<ProcessogramImages>({
    method: "PATCH",
    service: "admin-processogram-images",
    url: `/${params.id}/auto-search`,
    data: {
      autoSearch: params.autoSearch,
    },
  });

  return data;
};

export const useUpdateAutoSearch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateAutoSearchParams) => updateAutoSearch(params),
    onSuccess: (_, { id: processogram_id }) => {
      toast.success("Auto search updated successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_IMAGES.List, processogram_id],
      });
    },
  });
};
