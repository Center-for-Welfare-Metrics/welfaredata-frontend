import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys";

const getRegistrationCode = async () => {
  const { data } = await request<{
    createdAt: string;
    registrationCode: string;
    updatedAt: string;
  }>({
    method: "GET",
    service: "admin",
    url: "/registration-code",
  });

  return data;
};

export const useGetRegistrationCode = (enabled = true) => {
  return useQuery({
    queryKey: [QueryKeys.REGISTRATION_CODE.GET],
    queryFn: () => getRegistrationCode(),
    enabled: enabled,
    refetchOnWindowFocus: true,
  });
};
