import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../request";
import { ProductionModule } from "types/production-module";
import toast from "react-hot-toast";
import { QueryKeys } from "../keys";

type CreateProductionModulePayload = {
  body: {
    name: string;
    specie_id: string;
  };
};

const createProductionModule = async ({
  body,
}: CreateProductionModulePayload) => {
  const { data } = await request({
    method: "POST",
    service: "admin-production-modules",
    url: "/",
    data: body,
  });

  return data as ProductionModule;
};

export const useCreateProductionModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductionModule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTION_MODULES.List],
      });
      toast.success("Production Module created successfully");
    },
    onError: (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      toast.error("Error creating production module");
    },
  });
};
