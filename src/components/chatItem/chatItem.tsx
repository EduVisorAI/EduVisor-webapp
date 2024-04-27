import styles from "./chatItem.module.css";
import { RenderedConversation } from "../../chat-gpt/renderer";

export const ChatItem: React.FC<
  React.PropsWithChildren<{ convo: RenderedConversation }>
> = (props) => {
  const format = (text: string, length: number) => {
    const shouldBeTruncated = text.length >= length;
    if (shouldBeTruncated) {
      return `${text.substring(0, length)}...`;
    } else {
      return text;
    }
  };

  return (
    <div className={styles["card"]}>
      <div className="flex gap-2">
        <img src="/message.png" className=" object-contain" />
        <h4 className={styles["title"]}>{format(props.convo.title, 25)}</h4>
      </div>
      {/* <p className={styles["description"]}>
        {format(props.convo.description, 40)}
      </p> */}
    </div>
  );
};
