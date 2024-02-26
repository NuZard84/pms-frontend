import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

// layout components

const Layout = () => {
  return (
    <Box>
      <Box>Layout</Box>
      <Outlet />
    </Box>
  );
};

export default Layout;
