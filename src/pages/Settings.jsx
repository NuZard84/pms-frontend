import { Box, Input, Flex, Text, Button } from "@chakra-ui/react";

const SettingsPage = () => {
  return (
    <Box p="16">
      <Box>
        <Text fontSize="lg" pl="35px" mb="5px">
          Enter secret key provided by your organization to access AI powered
          analysis
        </Text>
      </Box>

      <Flex display="flex" p="10px" ml="20px">
        <Input placeholder="Enter your secret key" maxWidth="50%" />
        <Button ml="10px">Apply</Button>
      </Flex>
    </Box>
  );
};

export default SettingsPage;
