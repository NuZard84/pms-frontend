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
import TimelinePatient from "./pages/patient/PatientTimeline";
import TimeLineDoctor from "./pages/doctor/DoctorTimeline";
import PatientCard from "./components/patientCard";
import AdminPage from "./pages/admin/AdminPage";

const commonRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/patients",
    element: <PatientCard />,
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
  {
    path: "/doctor/timeline/:id",
    element: <TimeLineDoctor />,
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
    path: "/admin-dashboard",
    element: <AdminPage />,
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
