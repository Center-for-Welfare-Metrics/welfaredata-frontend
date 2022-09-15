import {} from "@/context/data-entry";
import { SpeciesTypes } from "@/utils/enum_types";
import api from "./api";

const p = (url) => `processogram/${url}`;

export default {
  all: (specie: string) => api.get(p(`all/${specie}`)),
  getOne: (_id) => api.get(p(_id)),
  create: (data: { productionSystem: string; specie: SpeciesTypes }) =>
    api.post(p(""), data),
  update: (data: { id_tree: any; values: any }, _id: string) =>
    api.patch(p(_id), data),
  newLayer: (
    data: { id_tree: any; pushTo: string; object: any },
    _id: string
  ) => api.post(p(`${_id}/new_layer`), data),
  getOneReference: (
    fieldReference,
    data: { name: string; specie: SpeciesTypes }
  ) => api.post(`${fieldReference}/getOneReference`, data),
  uploadFileToReference: (
    fieldReference,
    _id: string,
    formData: any,
    uploadProgress: any
  ) =>
    api.patch(`${fieldReference}/${_id}/upload`, formData, {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: uploadProgress,
    }),
  updateReference: (fieldReference, _id: string, data: any, specie) =>
    api.patch(`${fieldReference}/${_id}/${specie}`, data),
  uploadLocalFile: (_id: string, formData: any, uploadProgress: any) =>
    api.patch(p(`${_id}/upload`), formData, {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: uploadProgress,
    }),
  createReference: (
    filedReference,
    data: { name: string; specie: SpeciesTypes; description: "" }
  ) => api.post(`${filedReference}`, data),
  addNewMedia: (
    fieldReference,
    _id: string,
    data: { url: string; type: "youtube" }
  ) => api.patch(`${fieldReference}/${_id}/newmedia`, data),
};
