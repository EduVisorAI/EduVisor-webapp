import { useContext, useEffect, useRef, useState } from "react";
import { AIContext } from "../../contexts/ai-context.tsx";
import { useNavigate, useParams } from "react-router";
import styles from "./chat.module.css";
import { RenderedConversation } from "../../chat-gpt/renderer";
import { motion } from "framer-motion";
import { SpeechBubble } from "../../components/speechBubble/speechBubble.tsx";
import { ChatInput } from "../../components/chatInput/chatInput.tsx";
import { Card } from "../../components/card/card.tsx";
import { Button } from "../../components/button/button.tsx";

const promptTemplates = [
  "Explicame sobre el etanol",
  "Explicame sobre el dioxido de carbono"
];

export const ChatPage = () => {
  const [input, setInput] = useState("");
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

  useEffect(() => {
    if (conversations[chatId]) {
      setConversation(conversations[chatId]);
      console.log("conversation.speeches", conversations[chatId].speeches);
    } else {
      navigate("/");
    }
  }, [conversations, chatId]);

  const onInputChange = (input: string) => {
    setError("");
    setInput(input);
  };

  const onTemplateClicked = (template: string) => {
    setInput(template);
  };

  const onInputSubmit = async (prompt: string) => {
    setError("");
    if (prompt.trim().length > 0) {
      try {
        setLoading(true);
        await sendPrompt(chatId, prompt);
        setInput("");
      } catch (err) {
        setError("Oops...an error has occurred. Please try again.");
      }
      setLoading(false);
      chatEndRef!.current!.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ExtraFeatures = () => {
    return (
      <>
        <div className="flex gap-4">
          <Button level="secondary" fullWidth={false}>
            <div className="flex gap-1 items-center">
              <img src="/show.png" className="object-contain" />
              <p className="text-sm">Mostrar en display</p>
            </div>
          </Button>
          <Button level="secondary" fullWidth={false}>
            <div className="flex gap-1 items-center">
              <img src="/refresh.png" className="object-contain" />
              <p className="text-sm">Regenerar</p>
            </div>
          </Button>
        </div>
      </>
    );
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
              <>
                <SpeechBubble
                  key={id}
                  speaker={speaker}
                  text={speech.content.response}
                  cid={speech.content.cid}
                  animate={animate}
                />
                {speaker === "ai" && <ExtraFeatures />}
              </>
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
      <ChatInput
        input={input}
        inputChangeHandler={onInputChange}
        inputSubmitHandler={onInputSubmit}
        submitting={loading}
      />
    </>
  );
};
