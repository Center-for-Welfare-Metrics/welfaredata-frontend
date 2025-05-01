import { request } from "../request";

export const uploadSvgElement = async (formData: FormData) => {
  const { data } = await request({
    method: "POST",
    service: "admin-processograms",
    url: "/",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
