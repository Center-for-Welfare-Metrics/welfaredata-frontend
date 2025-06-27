import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Text } from "components/Text";
import { FlexColumn, FlexRow } from "components/desing-components/Flex";
import {
  usePublicChat,
  OpenAiMessage,
} from "queries/react-query/public/usePublicChat";
import { ProcessogramHierarchy } from "types/processogram";
import Markdown from "markdown-to-jsx";
import { ThemeColors } from "theme/globalStyle";
import { Button } from "@/components/Button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface QuestionPill {
  id: string;
  text: string;
}

type AiChatProps = {
  hierarchy: ProcessogramHierarchy[];
  questions: string[];
};

export const AiChat = ({ hierarchy, questions }: AiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<OpenAiMessage[]>([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use the chat hook
  const {
    sendMessage,
    streamedResponse,
    isPending,
    isError,
    error,
    isComplete,
  } = usePublicChat();

  // Effect to update the AI response message when streaming is complete
  useEffect(() => {
    if (isComplete && streamedResponse) {
      // Update the last AI message with the complete response
      setMessages((prevMessages) => {
        const lastMessageIndex = prevMessages.findIndex(
          (msg) => msg.sender === "ai" && msg.text === ""
        );

        if (lastMessageIndex === -1) return prevMessages;

        const updatedMessages = [...prevMessages];
        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          text: streamedResponse,
        };

        return updatedMessages;
      });

      // Update chat history for context
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: streamedResponse },
      ]);
    }
  }, [isComplete, streamedResponse]);

  // Handle sending a new message
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    // Add user message to UI
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue("");

    // Add empty AI message that will be filled with streaming content
    const placeholderAiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "",
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, placeholderAiMessage]);

    // Update chat history
    const updatedHistory: OpenAiMessage[] = [
      ...chatHistory,
      { role: "user", content: text },
    ];
    setChatHistory(updatedHistory);

    // Send message to API
    try {
      sendMessage({ messages: updatedHistory, hierarchy });
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Update the placeholder message with error text
      setMessages((prevMessages) => {
        const lastMessageIndex = prevMessages.length - 1;
        const updatedMessages = [...prevMessages];
        updatedMessages[lastMessageIndex] = {
          ...updatedMessages[lastMessageIndex],
          text: "Sorry, I encountered an error. Please try again.",
        };
        return updatedMessages;
      });
    }
  };

  // Handle question pill click
  const handlePillClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <ChatContainer justify="space-between">
      <MessageArea>
        {messages.map((message) => (
          <MessageWrapper key={message.id} $sender={message.sender}>
            <MessageBubble $sender={message.sender}>
              <Text
                variant="body1"
                color={message.sender === "ai" ? "grey_50" : "grey_900"}
              >
                {message.sender === "ai" ? (
                  <Markdown>
                    {isPending && !message.text
                      ? streamedResponse || "Typing..."
                      : message.text}
                  </Markdown>
                ) : (
                  <Markdown>{message.text}</Markdown>
                )}
              </Text>
              <Text
                variant="caption"
                opacity={0.7}
                color={message.sender === "ai" ? "grey_50" : "grey_900"}
                style={{
                  lineHeight: "1",
                }}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </MessageBubble>
          </MessageWrapper>
        ))}

        {isError && (
          <ErrorMessage>
            <Text variant="body2" color="white">
              Error: {error?.message || "Failed to get response"}
            </Text>
          </ErrorMessage>
        )}
        <div ref={messagesEndRef} />
      </MessageArea>

      <FlexColumn gap={0}>
        {messages.length === 1 && (
          <PillsContainer>
            <FlexRow gap={0.5} flexWrap="wrap">
              {questions.map((question, index) => (
                <QuestionPill
                  key={index}
                  onClick={() => handlePillClick(question)}
                >
                  <Text
                    variant="body2"
                    color="grey_900"
                    textElipsis
                    maxWidth="100%"
                  >
                    {question}
                  </Text>
                </QuestionPill>
              ))}
            </FlexRow>
          </PillsContainer>
        )}

        <InputArea>
          <ChatInput
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !isPending && handleSendMessage(inputValue)
            }
            disabled={isPending}
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isPending}
            buttonStyle="success"
          >
            <Text
              variant="body1Bold"
              color={inputValue.trim() && !isPending ? "grey_700" : "gray"}
            >
              Send
            </Text>
          </Button>
        </InputArea>
      </FlexColumn>
    </ChatContainer>
  );
};

// Styled Components
const ChatContainer = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const MessageArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2a2a2a;
  }

  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }
`;

const MessageWrapper = styled.div<{ $sender: "user" | "ai" }>`
  display: flex;
  justify-content: ${(props) =>
    props.$sender === "user" ? "flex-end" : "flex-start"};
  width: 100%;
`;

const MessageBubble = styled.div<{ $sender: "user" | "ai" }>`
  max-width: 75%;
  padding: 0.8rem 1rem;
  border-radius: ${(props) =>
    props.$sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  background-color: ${(props) =>
    props.$sender === "user" ? ThemeColors.grey_100 : ThemeColors.grey_800};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PillsContainer = styled.div`
  padding: 0.8rem 1rem;
`;

const QuestionPill = styled.button`
  background-color: ${ThemeColors.grey_100};
  border: none;
  border-radius: 16px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background-color: ${ThemeColors.grey_200};
  }
`;

const InputArea = styled(FlexRow)`
  padding: 1rem;
  width: 100%;
  border-top: 1px solid #333;
  box-sizing: border-box;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 20px;
  border: 1px solid #444;
  background-color: #333;
  color: white;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #666;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ErrorMessage = styled.div`
  background-color: #e74c3c;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin: 0.5rem 0;
  width: 100%;
`;
