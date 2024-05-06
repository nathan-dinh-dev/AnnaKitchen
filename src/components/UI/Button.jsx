import styles from "./Button.module.css";

const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly
    ? `${styles["text-button"]}`
    : `${styles["button"]}`;
  cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
