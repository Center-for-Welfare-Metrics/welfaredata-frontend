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

// Types
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
};

export const AiChat = ({ hierarchy }: AiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<OpenAiMessage[]>([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);

  // Use the chat hook
  const {
    sendMessage,
    streamedResponse,
    isPending,
    isError,
    error,
    isComplete,
  } = usePublicChat();

  // Sample pre-defined questions
  const questionPills: QuestionPill[] = [
    { id: "q1", text: "How does this process work?" },
    { id: "q2", text: "What are the next steps?" },
    { id: "q3", text: "Can I get more details?" },
    { id: "q4", text: "Show me relevant resources" },
  ];

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamedResponse]);

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
                color={message.sender === "ai" ? "white" : "black"}
              >
                {<Markdown>{message.text}</Markdown>}
                {message.sender === "ai" && !message.text && isPending && (
                  <StreamingText>
                    {streamedResponse ? (
                      <Markdown>{streamedResponse}</Markdown>
                    ) : (
                      "Typing..."
                    )}
                  </StreamingText>
                )}
              </Text>
              <Text
                variant="caption"
                opacity={0.7}
                color={message.sender === "ai" ? "white" : "black"}
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
              {questionPills.map((pill) => (
                <QuestionPill
                  key={pill.id}
                  onClick={() => handlePillClick(pill.text)}
                >
                  <Text
                    variant="body2"
                    color="white"
                    textElipsis
                    maxWidth="100%"
                  >
                    {pill.text}
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
            onKeyPress={(e) =>
              e.key === "Enter" && !isPending && handleSendMessage(inputValue)
            }
            disabled={isPending}
          />
          <SendButton
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isPending}
          >
            <Text
              variant="body1Bold"
              color={inputValue.trim() && !isPending ? "black" : "gray"}
            >
              Send
            </Text>
          </SendButton>
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
    props.$sender === "user" ? "#E2F7CB" : "#3E4042"};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PillsContainer = styled.div`
  padding: 0.8rem 1rem;
`;

const QuestionPill = styled.button`
  background-color: #4a4a4a;
  border: none;
  border-radius: 16px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background-color: #5a5a5a;
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

const SendButton = styled.button`
  flex-shrink: 0;
  padding: 0.75rem 1.25rem;
  border-radius: 20px;
  background-color: #e2f7cb;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const StreamingText = styled.span`
  display: inline-block;
  animation: blink 1.2s infinite;

  @keyframes blink {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: #e74c3c;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin: 0.5rem 0;
  width: 100%;
`;
