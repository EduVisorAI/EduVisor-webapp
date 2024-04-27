import { Button } from "../button/button";
import styles from "./chatInput.module.css";
import { motion } from "framer-motion";

export const ChatInput: React.FC<{
  input: string;
  inputChangeHandler: (input: string) => void;
  inputSubmitHandler: (prompt: string) => void;
  submitting: boolean;
}> = (props) => {
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    height: number
  ) => {
    props.inputChangeHandler(event.target.value);
    const target = event.target;
    target.style.height = `${height}px`;
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <motion.form
      className={styles["container"]}
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={(e) => {
        e.preventDefault();
        props.inputSubmitHandler(props.input);
      }}
    >
      <textarea
        placeholder="¿Que estás pensando?..."
        value={props.input}
        rows={1}
        onChange={(event) => onChangeHandler(event, 52)}
        style={{ height: "52px", resize: "none" }}
        className={
          props.submitting ? styles["disabled-input"] : styles["input"]
        }
        disabled={props.submitting}
      />
      <div className="absolute right-2 disabled:opacity-10  md:right-4">
        <Button
          level="primary"
          fullWidth={false}
          rounded={true}
          submitting={props.submitting}
        >
          <img src="/send.png" className="w-5 h-5" />
        </Button>
      </div>
    </motion.form>
  );
};
