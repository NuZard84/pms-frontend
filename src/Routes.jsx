import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import { RouterProvider } from "react-router-dom";
import PatientPage from "./pages/Patient";
import SettingsPage from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";

const commonRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/patients",
    element: <PatientPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/help",
    element: <Help />,
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
