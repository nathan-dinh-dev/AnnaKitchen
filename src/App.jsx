import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import { AccountContextProvider } from "./store/AccountContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AccountContextProvider>
        <UserProgressContextProvider>
          <CartContextProvider>
            <RootLayout />
          </CartContextProvider>
        </UserProgressContextProvider>
      </AccountContextProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
