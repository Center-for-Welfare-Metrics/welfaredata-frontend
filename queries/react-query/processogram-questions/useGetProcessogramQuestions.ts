import { request } from "../request";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys";
import { ProcessogramQuestionData } from "types/processogram-questions";

type GetElementQuestionsByElementParams = {
  processogram_id: string;
};

const getProcessogramQuestionsByProcessogramId = async (
  params: GetElementQuestionsByElementParams
) => {
  const { data } = await request<ProcessogramQuestionData>({
    method: "GET",
    service: "admin-processogram-questions",
    url: `/processograms/${params.processogram_id}`,
  });

  return data;
};

export const useGetProcessogramQuestionsByProcessogramId = (
  params: GetElementQuestionsByElementParams
) => {
  return useQuery({
    queryKey: [QueryKeys.PROCESSOGRAM_QUESTIONS.ByID, params.processogram_id],
    queryFn: () => getProcessogramQuestionsByProcessogramId(params),
    enabled: !!params.processogram_id,
    refetchOnWindowFocus: false,
  });
};

type GetElementsQuestions = {
  specie_id: string;
};

const getProcessogramQuestions = async (params: GetElementsQuestions) => {
  const { data } = await request<ProcessogramQuestionData[]>({
    method: "GET",
    service: "admin-processogram-questions",
    url: "/",
    query: params,
  });

  return data;
};

export const useGetProcessogramQuestions = (params: GetElementsQuestions) => {
  return useQuery({
    queryKey: [QueryKeys.PROCESSOGRAM_QUESTIONS.List, params],
    queryFn: () => getProcessogramQuestions(params),
    enabled: !!params.specie_id,
    refetchOnWindowFocus: false,
  });
};
