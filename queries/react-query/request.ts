import axios, { Method, ResponseType } from "axios";

export type RequestService = "admin" | "admin-species";

const servicesKeyPair: { [key in RequestService]: string } = {
  admin: "admin",
  "admin-species": "admin/species",
};

type IRequest = {
  method: Method;
  service: RequestService;
  url?: string;
  data?: { [key: string]: any };
  query?: { [key: string]: any };
  responseType?: ResponseType;
  headers?: { [key: string]: any };
};

export const request = ({
  url = "",
  method,
  data,
  query,
  service,
  responseType,
  headers = {},
}: IRequest) =>
  axios.request({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/" + servicesKeyPair[service],
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    url,
    method,
    data,
    params: query,
    responseType,
    withCredentials: true,
  });
