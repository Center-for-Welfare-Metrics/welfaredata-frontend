import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../request";
import { Specie } from "types/species";
import toast from "react-hot-toast";
import { QueryKeys } from "../keys";

type CreateSpeciePayload = {
  body: {
    name: string;
    pathname: string;
  };
};

const createSpecie = async ({ body }: CreateSpeciePayload) => {
  const { data } = await request({
    method: "POST",
    service: "admin-species",
    url: "/",
    data: body,
  });

  return data as Specie;
};

export const useCreateSpecie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSpecie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SPECIES.List],
      });
      toast.success("Specie created successfully");
    },
    onError: (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      toast.error("Error creating specie");
    },
  });
};

type UpdateSpecie = Partial<Omit<Specie, "_id">>;

type UpdateSpeciePayload = {
  params: {
    specie_id: string;
  };
  body: UpdateSpecie;
};

const updateSpecie = async ({ params, body }: UpdateSpeciePayload) => {
  const { data } = await request({
    method: "PATCH",
    service: "admin-species",
    url: `/${params.specie_id}`,
    data: body,
  });

  return data as Specie;
};

export const useUpdateSpecie = () => {
  return useMutation({
    mutationFn: updateSpecie,
    onSuccess: () => {
      toast.success("Specie updated successfully");
    },
    onError: (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      toast.error("Error updating specie");
    },
  });
};

type DeleteSpeciePayload = {
  params: {
    specie_id: string;
  };
};

const deleteSpecie = async ({ params }: DeleteSpeciePayload) => {
  await request({
    method: "DELETE",
    service: "admin-species",
    url: `/${params.specie_id}`,
  });
};

export const useDeleteSpecie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSpecie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.SPECIES.List],
      });
      toast.success("Specie deleted successfully");
    },
    onError: (error: AxiosError) => {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      toast.error("Error deleting specie");
    },
  });
};
