import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import DoctorDetail from "../components/DoctorDetail";

const Dashboard = () => {
  const data1 = useSelector((state) => state.doctor);
  const data2 = useSelector((state) => state.patient);
  console.log("data1", data1, "data2", data2);

  return (
    <Box>
      <DoctorDetail doctor={data1 } />
    </Box>
  );
};

export default Dashboard;
