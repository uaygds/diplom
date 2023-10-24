import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "../Wrapper/wraper.module.css";

interface ForChildren {
  children?: ReactNode;
}

const Wrapper = ({ children }: ForChildren) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.children}>{children}</div>
      <Footer />
    </div>
  );
};

export default Wrapper;
