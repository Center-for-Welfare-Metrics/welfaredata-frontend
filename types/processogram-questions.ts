export type ProcessogramQuestionData = {
  _id: string;
  production_system_name: string;
  specie_id: string;
  svg_element_id: string;
  data: {
    [key: string]: {
      id: string;
      level: string;
      name: string;
      questions: {
        question: string;
        answer: string;
      }[];
    };
  };
};
