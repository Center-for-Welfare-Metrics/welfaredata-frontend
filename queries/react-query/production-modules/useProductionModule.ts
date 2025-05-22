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

type UpdateProductionModulePayload = {
  params: {
    id: string;
  };
  body: {
    name?: string;
    description?: string;
    specie_id?: string;
  };
};

const updateProductionModule = async ({
  params,
  body,
}: UpdateProductionModulePayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "admin-production-modules",
    url: `/${params.id}`,
    data: body,
  });
  return data as ProductionModule;
};

export const useUpdateProductionModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductionModule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTION_MODULES.List],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTION_MODULES.ByID],
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
