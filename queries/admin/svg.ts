import api from "queries/api";

const p = (url?) => url?`admin/upload-svg/${url}`:`admin/upload-svg`;

export default {
  uploadSvg: (data: FormData) =>
    api.post(p(), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
