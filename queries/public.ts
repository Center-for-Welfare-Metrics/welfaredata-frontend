import api from "./api";

const p = (url) => `public/${url}`;

export default {
  getElements: (specie: string) => api.get(p(`elements?specie=${specie}`)),
};
