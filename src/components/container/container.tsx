import styles from "./container.module.css";
import { Navigation } from "../navigation/navigation.tsx";

export const Container: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={styles["background"]}>
      <Navigation />
      <div className={styles["container"]}>{props.children}</div>
    </div>
  );
};
