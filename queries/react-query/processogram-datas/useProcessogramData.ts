import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../request";
import { ProcessogramData } from "types/processogram-data";
import toast from "react-hot-toast";
import { QueryKeys } from "../keys";
import { useUpdateProcessogramDataOnCache } from "./hooks/useUpdateProcessogramDataOnCache";

type UpdateProcessogramDataPayload = {
  params: {
    id: string;
  };
  body: {
    key: string;
    description: string;
  };
  helper: {
    processogram_id: string;
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

  const { update } = useUpdateProcessogramDataOnCache();

  return useMutation({
    mutationFn: updateProcessogramData,
    onError: (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      toast.error("Error updating production module");
    },
    onMutate: ({ helper: { processogram_id }, body: { key, description } }) => {
      update(processogram_id, key, description);
    },
  });
};
