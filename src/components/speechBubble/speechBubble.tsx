import React from "react";
import styles from "./speechBubble.module.css";
import Loader from "/loading.gif";
import { motion } from "framer-motion";

export const SpeechBubble: React.FC<{
  speaker: string;
  text: string;
  cid?: string;
  loading?: boolean;
  animate: boolean;
  delay?: number;
}> = (props) => {
  let speechBubbleClass: string;
  let containerClass: string;

  if (props.speaker === "ai") {
    speechBubbleClass = "ai";
    containerClass = "ai-container";
  } else {
    speechBubbleClass = "user";
    containerClass = "user-container";
  }

  const UserBubble = () => {
    const content = props.loading ? (
      <img src={Loader} width={40} alt="Loading" />
    ) : (
      <p>{props.text}</p>
    );

    return (
      <div className="flex gap-2 items-center">
        <img src="/profile.png" className="block" />
        <div className={styles[speechBubbleClass]}>{content}</div>
      </div>
    );
  };

  const AIBubble = () => {
    const content = props.loading ? (
      <img src={Loader} width={40} alt="Loading" />
    ) : (
      <>
        <p>{props.text}</p>
        {props.cid && (
          <iframe
            className="mt-2"
            style={{ width: "250px", height: "250px" }}
            src={`https://embed.molview.org/v1/?mode=balls&cid=${props.cid}`}
          ></iframe>
        )}
      </>
    );

    return (
      <div className={styles[speechBubbleClass]}>
        <div className="flex gap-2 mb-2">
          <p className="text-[#5661F6] text-sm font-bold">EduVisorAI</p>
          <img src="/arrow-up-left-contained.png" className="object-contain" />
        </div>
        {content}
      </div>
    );
  };

  if (props.animate) {
    return (
      <motion.div
        className={styles[containerClass]}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.5, delay: props.delay ? props.delay : 0 }}
      >
        {props.speaker === "user" ? <UserBubble /> : <AIBubble />}
      </motion.div>
    );
  } else {
    return (
      <div className={styles[containerClass]}>
        {props.speaker === "user" ? <UserBubble /> : <AIBubble />}
      </div>
    );
  }
};
