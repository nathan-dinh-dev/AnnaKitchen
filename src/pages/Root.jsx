import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        theme="colored"
        autoClose={1200}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
        style={{ top: "3.5rem" }}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
