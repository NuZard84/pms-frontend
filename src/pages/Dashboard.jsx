import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const data = useSelector((state) => state.doctor);
  console.log(data);

  return <Box>hello</Box>;
};

export default Dashboard;
