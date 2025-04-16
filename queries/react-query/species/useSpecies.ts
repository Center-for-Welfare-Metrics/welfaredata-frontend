import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { request } from "../request";
import { Specie } from "types/species";
import toast from "react-hot-toast";

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
  return useMutation(createSpecie);
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
  return useMutation(updateSpecie, {
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

  return useMutation(deleteSpecie, {
    onSuccess: () => {
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
