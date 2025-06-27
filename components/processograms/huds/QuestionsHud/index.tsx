import useDebounce from "@/utils/hooks/useDebounce";
import { useCallback, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { HelpCircle } from "react-feather";
import { ThemeColors } from "theme/globalStyle";
import { FlexColumn, FlexRow } from "@/components/desing-components/Flex";
import { Text } from "@/components/Text";

export type QuestionData = {
  [key: string]: {
    questions: {
      question: string;
      answer: string;
    }[];
  };
};

type Props = {
  currentElement: string;
  data: QuestionData;
  notReady: boolean;
};

export const ProgressogramQuestionsHud = ({
  currentElement: realTimeElement,
  data,
  notReady,
}: Props) => {
  const currentElement = useDebounce(realTimeElement, 250);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState<
    number | null
  >(null);

  const questions = useMemo(() => {
    return data[currentElement]?.questions || [];
  }, [currentElement, data]);

  const hasQuestions = useMemo(() => {
    return questions.length > 0;
  }, [questions]);

  const toggleExpanded = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
    setExpandedQuestionIndex(null);
  }, []);

  const toggleQuestion = useCallback((index: number) => {
    setExpandedQuestionIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <Container $isExpanded={isExpanded}>
      <IconContainer onClick={toggleExpanded} $isExpanded={isExpanded}>
        <HelpCircle size={24} color={ThemeColors.white} />
      </IconContainer>

      {isExpanded && (
        <Content>
          <FlexRow width="100%" justify="space-between">
            <Text variant="h3">Questions</Text>
            <CloseButton onClick={toggleExpanded}>×</CloseButton>
          </FlexRow>

          {notReady && !hasQuestions ? (
            <Text>Not ready yet, generating AI content</Text>
          ) : !hasQuestions ? (
            <Text>No questions available for this element</Text>
          ) : (
            <QuestionsContainer>
              {questions.map((q, index) => (
                <QuestionItem key={index}>
                  <QuestionHeader
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleQuestion(index);
                    }}
                    $isActive={expandedQuestionIndex === index}
                  >
                    <Text variant="body2Bold">{q.question}</Text>
                    <ExpandIcon $isExpanded={expandedQuestionIndex === index}>
                      ▼
                    </ExpandIcon>
                  </QuestionHeader>

                  {expandedQuestionIndex === index && (
                    <AnswerContent>
                      <Text variant="body2">{q.answer}</Text>
                    </AnswerContent>
                  )}
                </QuestionItem>
              ))}
            </QuestionsContainer>
          )}
        </Content>
      )}
    </Container>
  );
};

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${ThemeColors.white};
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  &:hover {
    color: ${ThemeColors.blue};
  }
`;

const AnswerContent = styled.div`
  padding: 15px;
  border-top: 1px solid ${ThemeColors.deep_blue};
  background-color: ${ThemeColors.black};
`;

type ExpandIconProps = {
  $isExpanded: boolean;
};

const ExpandIcon = styled.span<ExpandIconProps>`
  font-size: 10px;
  transition: transform 0.3s ease;
  transform: ${({ $isExpanded }) =>
    $isExpanded ? "rotate(0deg)" : "rotate(-90deg)"};
  color: ${ThemeColors.white};
`;

type QuestionHeaderProps = {
  $isActive: boolean;
};

const QuestionHeader = styled.div<QuestionHeaderProps>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ $isActive }) =>
    $isActive ? ThemeColors.deep_blue : ThemeColors.deep_blue};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${ThemeColors.deep_blue};
  }
`;

const QuestionItem = styled.div`
  width: 100%;
  border: 1px solid ${ThemeColors.deep_blue};
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid ${ThemeColors.blue};
  }
`;

const QuestionsContainer = styled(FlexColumn)`
  margin-top: 15px;
  width: 100%;
  gap: 8px;
`;

const Content = styled.div`
  padding: 20px;
  clear: both;
`;

type IconContainerProps = {
  $isExpanded: boolean;
};

const IconContainer = styled.div<IconContainerProps>`
  width: 40px;
  height: 40px;
  border-radius: ${({ $isExpanded }) => ($isExpanded ? "4px" : "50%")};
  background-color: ${ThemeColors.deep_blue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  float: right;
  margin: ${({ $isExpanded }) => ($isExpanded ? "10px 10px 0 0" : "0")};

  &:hover {
    transform: scale(1.1);
    background-color: ${ThemeColors.deep_blue};
  }
`;

type ContainerProps = {
  $isExpanded: boolean;
};

const Container = styled.div<ContainerProps>`
  width: ${({ $isExpanded }) => ($isExpanded ? "350px" : "auto")};
  box-sizing: border-box;
  border-radius: 8px;
  transition: all 0.3s ease;
  ${({ $isExpanded }) =>
    $isExpanded &&
    css`
      border: 2px ${ThemeColors.deep_blue} solid;
      background-color: ${ThemeColors.black};
      backdrop-filter: blur(5px);
      overflow: auto;
    `}
`;
