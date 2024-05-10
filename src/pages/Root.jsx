import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <>
      <Header />
      {/* This is for authentication state handler */}
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
      {/* This is for add-to-cart notification */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },

          error: {
            duration: 1000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
