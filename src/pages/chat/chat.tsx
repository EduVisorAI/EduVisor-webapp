/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from "react";
import { AIContext } from "../../contexts/ai-context.tsx";
import { useNavigate, useParams } from "react-router";
import styles from "./chat.module.css";
import { RenderedConversation } from "../../chat-gpt/renderer";
import { motion } from "framer-motion";
import { SpeechBubble } from "../../components/speechBubble/speechBubble.tsx";
import { ChatInput } from "../../components/chatInput/chatInput.tsx";
import { Card } from "../../components/card/card.tsx";
import { useAuth } from "../../contexts/authContext/index.tsx";

const promptTemplates = [
  "Explicame sobre el etanol",
  "Explicame sobre el dioxido de carbono"
];

export const ChatPage = () => {
  const auth = useAuth();
  const [, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conversation, setConversation] = useState<
    RenderedConversation | undefined
  >();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { chatId } = useParams() as any;
  const { sendPrompt, conversations } = useContext(AIContext);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (chatId && conversations.find((c) => c.id === chatId)) {
      setConversation(conversations.find((c) => c.id === chatId));
    } else {
      navigate("/");
    }
  }, [chatId, conversations, navigate]);

  // const onInputChange = (input: string) => {
  //   setError("");
  //   setInput(input);
  // };

  const onTemplateClicked = (template: string) => {
    setInput(template);
  };

  const onInputSubmit = async (prompt: string) => {
    setError("");
    if (prompt.trim().length > 0) {
      try {
        setLoading(true);
        await sendPrompt(chatId, prompt, auth?.user?.email as string);
      } catch (err) {
        setError("Vaya... se ha producido un error. Inténtalo de nuevo.");
      }
      setLoading(false);
      chatEndRef!.current!.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {conversation && conversation.speeches.length === 0 && (
        <div className={styles["secondary-section"]}>
          <h2 className={styles["secondary-heading"]}>Prueba con esto</h2>
          <motion.div
            className={styles["prompts-container"]}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {promptTemplates.map((prompt, id) => (
              <button key={id} onClick={() => onTemplateClicked(prompt)}>
                <Card direction="row">
                  <p className={styles["prompt-text"]}>{prompt}</p>
                </Card>
              </button>
            ))}
          </motion.div>
        </div>
      )}
      {conversation && conversation.speeches.length > 0 && (
        <div className={styles["chat-container"]}>
          {conversation.speeches.map((speech, id) => {
            const speaker = speech.speaker === "HUMAN" ? "user" : "ai";
            let animate = false;
            if (id === conversation.speeches.length - 1) {
              animate = true;
            }

            return (
              <SpeechBubble
                key={id}
                speaker={speaker}
                text={speech.content.response}
                cid={speech.content.cid}
                animate={animate}
              />
            );
          })}
          {loading && (
            <SpeechBubble
              speaker="ai"
              text=""
              loading={true}
              animate={true}
              delay={0.5}
            />
          )}
          {error && <div className={styles["error-container"]}>{error}</div>}
          <div ref={chatEndRef} />
        </div>
      )}
      <ChatInput inputSubmitHandler={onInputSubmit} submitting={loading} />
    </>
  );
};
