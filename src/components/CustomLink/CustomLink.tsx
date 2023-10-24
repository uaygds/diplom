import { Link } from "react-router-dom";
import styles from "./customLink.module.css";

const CustomLink = ({
  children,
  to,
  ...props
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <div className={styles.Link}>
      <Link to={to} {...props} className={styles.Link}>
        {children}
      </Link>
    </div>
  );
};

export default CustomLink;
