import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { ProcessogramHierarchy } from "types/processogram";

export type OpenAiMessage = {
  role: "user" | "assistant";
  content: string;
};

interface ChatStreamResponse {
  content: string;
}

const fetchChatStream = async (
  params: {
    messages: OpenAiMessage[];
    hierarchy: ProcessogramHierarchy[];
  },
  onChunk: (chunk: string) => void
): Promise<string> => {
  const { messages, hierarchy } = params;

  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/public/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, hierarchy }),
    }
  );

  if (!response.ok || !response.body) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullResponse = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n\n");

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.replace("data: ", "");

        if (data === "[DONE]") {
          return fullResponse;
        }

        try {
          const parsed: ChatStreamResponse = JSON.parse(data);
          if (parsed.content) {
            fullResponse += parsed.content;
            onChunk(parsed.content);
          }
        } catch (e) {
          console.error("Error parsing chunk:", e);
        }
      }
    }
  }

  return fullResponse;
};

export const usePublicChat = () => {
  const [streamedResponse, setStreamedResponse] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const resetStream = useCallback(() => {
    setStreamedResponse("");
    setIsComplete(false);
  }, []);

  const mutation = useMutation({
    mutationFn: async (params: {
      messages: OpenAiMessage[];
      hierarchy: ProcessogramHierarchy[];
    }) => {
      resetStream();

      return fetchChatStream(params, (chunk) => {
        setStreamedResponse((prev) => prev + chunk);
      }).then((fullResponse) => {
        setIsComplete(true);
        return fullResponse;
      });
    },
  });

  return {
    sendMessage: mutation.mutate,
    sendMessageAsync: mutation.mutateAsync,
    streamedResponse,
    isComplete,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: () => {
      mutation.reset();
      resetStream();
    },
  };
};
