import axios, { Method, ResponseType } from "axios";

export type RequestService =
  | "admin"
  | "admin-species"
  | "admin-processograms"
  | "admin-processogram-datas"
  | "admin-processogram-questions"
  | "admin-production-modules"
  | "admin-processogram-images"
  | "public";

const servicesKeyPair: { [key in RequestService]: string } = {
  admin: "admin",
  "admin-species": "admin/species",
  "admin-processograms": "admin/processograms",
  "admin-processogram-datas": "admin/processogram-datas",
  "admin-processogram-questions": "admin/processogram-questions",
  "admin-production-modules": "admin/production-modules",
  "admin-processogram-images": "admin/processogram-images",
  public: "public",
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

export const request = <T = any>({
  url = "",
  method,
  data,
  query,
  service,
  responseType,
  headers = {},
}: IRequest) =>
  axios.request<T>({
    baseURL:
      process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/" + servicesKeyPair[service],
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
