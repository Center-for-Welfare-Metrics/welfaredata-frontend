import { request } from "../request";

export const uploadSvgElement = async (formData: FormData) => {
  const { data } = await request({
    method: "POST",
    service: "admin",
    url: "/upload-svg",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
