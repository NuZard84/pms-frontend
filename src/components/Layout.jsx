import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex>
      <Box
        w="250px"
        bg="gray.200"
        p="4"
        borderRight="1px"
        borderColor="gray.300"
        h={{ base: "100vh", md: "100vh", lg: "100vh" }}
      >
        <Box> Sidebar Content </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Box w="100%" bg="blue.500" p="4" color="white">
          <Box> Header Content </Box>
        </Box>

        <Box flex="1" p="4">
          {/* Main content goes here */}
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
