import styles from "./Input.module.css";

const Input = ({ label, id, ...props }) => {
  return (
    <p className={styles.control}>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
    </p>
  );
};

export default Input;
