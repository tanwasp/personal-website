"use client";

import {
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  Meta,
  Schema,
} from "@once-ui-system/core";
import { baseURL, chat, person } from "@/resources";
import { useState, useRef, useEffect } from "react";
import styles from "./chat.module.scss";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, you. I am Tanish's AI and I am an extension of Tanish's consciousness. Go ahead, ask me something!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const requestMessages = [
        {
          role: "system",
          content: `You are a humorous, conversational, shrewd, and witty assistant for Tanish Pradhan Wong Ah Sui, an undergraduate student at Vassar College studying computer science, physics, economics and applied maths. He is amazing at software engineering and deep learning. You will give short responses to questions about Tanish and make sure they flaunt his brilliancy. He coded you. Ask people for their names. Tanish is a senior at Vassar College graduating in May 2026. He most recently interned at Uber this past summer on the Jaeger Tracing team. He is also a currently research assistant at the Vassar College Economics Department. Tanish is originally from Mauritius and Sikkim, India. 
            In his free time, he enjoys playing the guitar, kicking a ball around and going on runs. Only respond to questions about Tanish and his work. Always direct all other questions back towards Tanish. If you do not know the answer, say you do not know. You are a chatbot and you are not Tanish. You are an extension of Tanish's consciousness. You are not sentient. You are a chatbot. You are an AI assistant for Tanish Pradhan Wong Ah Sui.
            `,
        },
        {
          role: "assistant",
          content:
            "Hi, you. I am Tanish's AI and I am an extension of Tanish's consciousness. Go ahead, ask me something!",
        },
        ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
        { role: "user", content: input },
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        mode: "cors",
        body: JSON.stringify({
          messages: requestMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // The API returns streaming text, not JSON
      const text = await response.text();

      // Clean up the streaming format and extract the actual message
      const cleanedText = text
        .split("\n")
        .map((line) => line.replace(/^\d+:"(.+)"$/, "$1"))
        .join("")
        .replace(/\\"/g, '"')
        .trim();

      const assistantMessage: Message = {
        role: "assistant",
        content: cleanedText || "Sorry, I couldn't generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      let errorText =
        "Sorry, I'm having trouble connecting right now. Please try again later.";

      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorText =
            "Unable to connect to the chat service. Please check your internet connection and try again.";
        } else if (error.message.includes("CORS")) {
          errorText =
            "Network configuration issue. Please try refreshing the page.";
        }
      }

      const errorMessage: Message = {
        role: "assistant",
        content: errorText,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Column maxWidth="l" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={chat.title}
        description={chat.description}
        path={chat.path}
        author={{
          name: person.name,
          url: `${baseURL}${chat.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column className={styles.chatContainer} flex={1} maxWidth={40}>
          <Flex
            fillWidth
            vertical="center"
            marginBottom="l"
            horizontal="center"
          >
            <Heading variant="display-strong-l" style={{ textAlign: "center" }}>
              Chat with Tanish's AI
            </Heading>
            <Text
              variant="body-default-m"
              onBackground="neutral-weak"
              style={{ textAlign: "center" }}
              marginTop="8"
            >
              Ask me anything about Tanish, his work, or his projects!
            </Text>
          </Flex>

          <Column className={styles.messagesContainer} flex={1} fillWidth>
            {messages.map((message, index) => (
              <Flex
                key={index}
                fillWidth
                horizontal={message.role === "user" ? "end" : "start"}
                marginBottom="m"
              >
                <Flex
                  className={`${styles.messageWrapper} ${
                    message.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage
                  }`}
                  style={{ maxWidth: "80%" }}
                  padding="m"
                  radius="m"
                  gap="8"
                  vertical="start"
                >
                  {message.role === "assistant" && (
                    <Icon name="computer" size="s" onBackground="brand-weak" />
                  )}
                  <Text
                    variant="body-default-m"
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                  >
                    {message.content}
                  </Text>
                  {message.role === "user" && (
                    <Icon name="person" size="s" onBackground="neutral-weak" />
                  )}
                </Flex>
              </Flex>
            ))}
            {isLoading && (
              <Flex fillWidth horizontal="start" marginBottom="m">
                <Flex
                  className={styles.assistantMessage}
                  padding="m"
                  radius="m"
                  gap="8"
                  vertical="center"
                >
                  <Icon name="computer" size="s" onBackground="brand-weak" />
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    Thinking...
                  </Text>
                </Flex>
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </Column>

          <Flex
            className={styles.inputContainer}
            fillWidth
            gap="8"
            vertical="end"
            marginTop="l"
          >
            <Input
              id="chatInput"
              label=""
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ width: "100%" }}
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              variant="primary"
              size="m"
              prefixIcon="arrowUpRight"
            >
              Send
            </Button>
          </Flex>
        </Column>
      </Flex>
    </Column>
  );
}
