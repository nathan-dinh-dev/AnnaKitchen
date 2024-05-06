import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <Header />
      <ToastContainer
        theme="colored"
        autoClose={800}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
