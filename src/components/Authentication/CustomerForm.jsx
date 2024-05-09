import styles from "./CustomerForm.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button.jsx";
import { useContext, useState } from "react";
import AccountContext from "../../store/AccountContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";

const CustomerForm = () => {
  const ctx = useContext(AccountContext);
  const [isLogin, setIsLogin] = useState(true);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nameInputHandler = (event) => {
    setUserInput((prev) => ({ ...prev, name: event.target.value }));
  };

  const emailInputHandler = (event) => {
    setUserInput((prev) => ({ ...prev, email: event.target.value }));
  };

  const passwordInputHandler = (event) => {
    setUserInput((prev) => ({ ...prev, password: event.target.value }));
  };

  const OathLoginHandler = (provider) => {
    switch (provider) {
      case "google":
        ctx.processDataInput(null, "loginWithGoogle");
        break;
      case "facebook":
        ctx.processDataInput(null, "loginWithFaceBook");
        break;
      case "github":
        ctx.processDataInput(null, "loginWithGithub");
        break;
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
    if (!isLogin) ctx.processDataInput(userInput, "signup");
    else ctx.processDataInput(userInput, "loginWithEmail");

    setUserInput({ name: "", email: "", password: "" });
  };

  const toggleSignInHandler = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className={styles["page-container"]}>
      <form className={styles["form-login"]} onSubmit={formHandler}>
        <h1 className={styles["form-heading"]}>
          Customer {isLogin ? "Login" : "Sign up"}
        </h1>

        {!isLogin ? (
          <div className={styles["form-group"]}>
            <Input
              type="text"
              className={styles["form-input"]}
              placeholder="Name"
              onChange={nameInputHandler}
              value={userInput.name}
            />
          </div>
        ) : (
          ""
        )}
        <div className={styles["form-group"]}>
          <Input
            type="text"
            className={styles["form-input"]}
            placeholder="Email"
            onChange={emailInputHandler}
            value={userInput.email}
          />
        </div>

        <div className={styles["form-group"]}>
          <Input
            type="password"
            className={styles["form-input"]}
            placeholder="Password"
            onChange={passwordInputHandler}
            value={userInput.password}
          />
        </div>

        <div className={styles["form__signup"]}>
          <p onClick={toggleSignInHandler}>
            {isLogin ? (
              <span>
                New Customer? Please <b>Sign Up</b>
              </span>
            ) : (
              <span>
                Already have an account? <b>Sign In</b>
              </span>
            )}{" "}
          </p>
        </div>

        <div className={styles["form-actions"]}>
          <Button className={styles["button-login"]}>
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              bounce
              style={{ marginRight: "1rem" }}
            />
            {isLogin ? "Login" : "Sign up"}
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              bounce
              style={{ marginLeft: "1rem" }}
            />
          </Button>

          <Button
            className={`${styles["button-login"]} ${styles["google-login-btn"]}`}
            type="button"
            onClick={() => {
              OathLoginHandler("google");
            }}
          >
            <FontAwesomeIcon
              icon={faGoogle}
              bounce
              style={{ marginRight: "1rem" }}
            />
            {isLogin ? "Login" : "Sign up"} with Google
            <FontAwesomeIcon
              icon={faGoogle}
              bounce
              style={{ marginLeft: "1rem" }}
            />
          </Button>

          <Button
            className={`${styles["button-login"]} ${styles["github-login-btn"]}`}
            type="button"
            onClick={() => {
              OathLoginHandler("github");
            }}
          >
            <FontAwesomeIcon
              icon={faGithub}
              bounce
              style={{ marginRight: "1rem" }}
            />
            {isLogin ? "Login" : "Sign up"} with GitHub
            <FontAwesomeIcon
              icon={faGithub}
              bounce
              style={{ marginLeft: "1rem" }}
            />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
