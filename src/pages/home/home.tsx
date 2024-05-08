import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import React from "react";
import { AIContext } from "../../contexts/ai-context";
import { Button } from "../../components/button/button";
import ShortUniqueId from "short-unique-id";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const aiContext = useContext(AIContext);

  const newChatHandler = () => {
    const uuid = new ShortUniqueId({ length: 6 }).randomUUID();
    aiContext.newConvo(uuid);
    navigate(`/chat/${uuid}`);
  };

  return (
    <div className={styles["container"]}>
      <motion.div
        className={styles["hero-section"]}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 60, opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className={styles["hero-text"]}>
          <h1 className={styles["primary-heading"]}>
            EduVisor tu asistente educativo
          </h1>
          <p className={styles["subtitle"]}>
            ¡Tu asistente educativo siempre está aquí para ayudarte a hacer tu
            vida más fácil!
          </p>
        </div>
        <div className={styles["hero-btn-container"]}>
          <Button
            level="primary"
            fullWidth={false}
            clickHandler={newChatHandler}
          >
            Comenzar
          </Button>
          <div className="mx-1"></div>
          <Button
            level="secondary"
            fullWidth={false}
            clickHandler={() => navigate("/about")}
          >
            Como funciona
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
