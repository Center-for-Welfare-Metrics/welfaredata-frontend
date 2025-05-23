import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../request";
import { Processogram } from "types/processogram";
import toast from "react-hot-toast";
import { QueryKeys } from "../keys";

type UpdateProcessogramayload = {
  params: {
    id: string;
  };
  body: {
    name?: string;
    description?: string;
    production_module_id?: string;
    theme?: "light" | "dark";
    specie_id?: string;
  };
};

const updateProcessogram = async ({
  params,
  body,
}: UpdateProcessogramayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "admin-processograms",
    url: `/${params.id}`,
    data: body,
  });
  return data as Processogram;
};

export const useUpdateProcessogram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProcessogram,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROCESSOGRAMS.List],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROCESSOGRAMS.ByID],
      });

      toast.success("Processogram updated successfully");
    },
    onError: (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      toast.error("Error updating processogram");
    },
  });
};

type DeleteProcessogramayload = {
  params: {
    id: string;
  };
};

const deleteProcessogram = async ({ params }: DeleteProcessogramayload) => {
  const { data } = await request({
    method: "DELETE",
    service: "admin-processograms",
    url: `/${params.id}`,
  });
  return data as Processogram;
};

export const useDeleteProcessogram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProcessogram,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTION_MODULES.List],
      });

      toast.success("Processogram deleted successfully");
    },
    onError: (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      toast.error("Error deleting processogram");
    },
  });
};
