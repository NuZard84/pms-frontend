import { Box } from "@chakra-ui/react";
import PatientCard from "../components/patientCard";
import TabBar from "../components/elements/Tab";
import DoctorDetail from "../components/DoctorDetail";

const PatientPage = () => {
  return (
    <Box>
      <TabBar />
      <PatientCard />
      {/* <DoctorDetail/> */}
    </Box>
  );
};

export default PatientPage;
