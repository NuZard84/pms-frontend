import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import DoctorDetail from "../components/DoctorDetail";
import PatientDetails from "../components/PatientDetail";

const DashboardD = () => {
  const user = useSelector((state) => state.user.userDetail);

  return (
    <Box>
      <PatientDetails patient={user} />
    </Box>
  );
};

export default DashboardD;
