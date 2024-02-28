import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const data1 = useSelector((state) => state.doctor);
  const data2 = useSelector((state) => state.patient);
  console.log("data1", data1, "data2", data2);

  return <Box>hello</Box>;
};

export default Dashboard;
