import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../request";
import { ProcessogramData } from "types/processogram-data";
import toast from "react-hot-toast";
import { QueryKeys } from "../keys";

type UpdateProcessogramDataPayload = {
  params: {
    id: string;
  };
  body: {
    key: string;
    description: string;
  };
};

const updateProcessogramData = async ({
  params,
  body,
}: UpdateProcessogramDataPayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "admin-processogram-datas",
    url: `/${params.id}`,
    data: body,
  });
  return data as ProcessogramData;
};

export const useUpdateProcessogramData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProcessogramData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROCESSOGRAM_DATAS.List],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PROCESSOGRAM_DATAS.ByID],
      });
      toast.success("Production Module updated successfully");
    },
    onError: (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      toast.error("Error updating production module");
    },
  });
};
