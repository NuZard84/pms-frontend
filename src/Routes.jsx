import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import { RouterProvider } from "react-router-dom";
import PatientPage from "./pages/Patient";
import SettingsPage from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Help from "./pages/Help";
import DetaileFilledPage from "./components/DetailFilledPage";
import Consult from "./pages/patient/Consult";
import TimelinePatient from "./pages/patient/Timeline";

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
  {
    path: "/patient/consult",
    element: <Consult />,
  },
  {
    path: "/patient/timeline",
    element: <TimelinePatient />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/doctor/filldetails",
    element: <DetaileFilledPage />,
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
