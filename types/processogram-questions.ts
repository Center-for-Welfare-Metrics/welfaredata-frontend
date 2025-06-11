export type ProcessogramQuestionData = {
  _id: string;
  production_system_name: string;
  specie_id: string;
  processogram_id: string;
  data: {
    [key: string]: {
      id: string;
      level: string;
      name: string;
      questions: string[];
    };
  };
};
