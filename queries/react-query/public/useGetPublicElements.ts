import { Specie } from "types/species";
import { request } from "../request";
import { ProcessogramData } from "types/processogram-data";
import { ProcessogramQuestionData } from "types/processogram-questions";

type GetPublicElementsParams = {
  specie: string;
};

export const getPublicProcessograms = async (
  params: GetPublicElementsParams
) => {
  const { data } = await request<Element[]>({
    method: "GET",
    service: "public",
    url: "/processograms",
    query: params,
  });

  return data;
};

type GetElementsDataParams = {
  specie: string;
};

export const getPublicProcessogramDatas = async (
  params: GetElementsDataParams
) => {
  const { data } = await request<ProcessogramData[]>({
    method: "GET",
    service: "public",
    url: "processograms/data",
    query: params,
  });

  return data;
};

type GetElementsQuestionsParams = {
  specie: string;
};

export const getPublicProcessogramQuestions = async (
  params: GetElementsQuestionsParams
) => {
  const { data } = await request<ProcessogramQuestionData[]>({
    method: "GET",
    service: "public",
    url: "processograms/questions",
    query: params,
  });

  return data;
};

type GetSpecieByPathnameParams = {
  pathname: string;
};

export const getPublicSpeciesByPathname = async ({
  pathname,
}: GetSpecieByPathnameParams) => {
  const { data } = await request<Specie>({
    method: "GET",
    service: "public",
    url: `/species/pathname/${pathname}`,
  });

  return data;
};
