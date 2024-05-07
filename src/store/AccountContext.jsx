import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AccountContext = createContext({
  user: null,
  processDataInput: (userData, activity) => {},
});

export const AccountContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const navigate = useNavigate();

  const processDataInput = async (userData, activity) => {
    switch (activity) {
      case "signup":
        try {
          const userSignupCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
          );
          const user = userSignupCredential.user;
          user.displayName = userData.name;

          const sendVerificationEmail = await sendEmailVerification(
            auth.currentUser
          );
          console.log(sendVerificationEmail);
          console.log("Email verification sent!");
          toast.success("Email Verification Sent!");
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        }
        break;

      case "loginWithEmail":
        try {
          const userLoginCredential = await signInWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
          );
          const user = userLoginCredential.user;

          if (user.emailVerified) {
            toast.success("Login successfully!");
            setCurrentUser(user);
          } else {
            throw new Error("Email is not verified!");
          }
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            console.log("Email verification resent!");
            toast.info("Email Verification Resent!");
          });
        }
        break;

      case "loginWithGoogle":
        try {
          const result = await signInWithPopup(auth, new GoogleAuthProvider());
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setCurrentUser(user);
          toast.success("Login successfully!");

          console.log("Google User: ", user);
        } catch (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        }
        break;

      case "loginWithGithub":
        try {
          const result = await signInWithPopup(auth, new GithubAuthProvider());
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setCurrentUser(user);
          toast.success("Login successfully!");

          console.log("Github User: ", user);
        } catch (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
        }
        break;

      case "loginWithFacebook":
        try {
          const result = await signInWithPopup(
            auth,
            new FacebookAuthProvider()
          );
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setCurrentUser(user);
          toast.success("Login successfully!");

          console.log("Facebook User: ", user);
        } catch (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
        }
        break;

      case "logout":
        try {
          auth.signOut();
          toast.success("Logout Successfully!");
          setCurrentUser(null);
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        }
        break;
    }
  };

  useEffect(() => {
    navigate("/");
    // setTimeout(() => {
    //   auth.signOut();
    //   setCurrentUser(null);
    // }, 3000);
  }, [currentUser]);

  const accountContext = {
    user: currentUser,
    processDataInput,
  };

  return (
    <AccountContext.Provider value={accountContext}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
