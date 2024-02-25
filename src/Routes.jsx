import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const commonRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <Layout />,
    children: [...commonRoutes],
  },
]);

const Routes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routes;
