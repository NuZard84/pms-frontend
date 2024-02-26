import { Box } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header">
      <Box bg="blue.500" p="4" color="white">
        <Box> Header Content </Box>
      </Box>
    </Box>
  );
};

export default Header;
