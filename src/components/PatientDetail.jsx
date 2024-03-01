import {
  Box,
  Text,
  Divider,
  defineStyleConfig,
  Button,
} from "@chakra-ui/react";

export const dividerTheme = defineStyleConfig({
  defaultProps: {
    size: "xl",
    variant: "thick",
    colorScheme: "brand",
  },
});

const PatientDetails = ({ patient }) => {
  return (
    <>
      <Box p="10" display="flex" flexDirection="column" gap="1.5rem">
        <Box>
          <Text fontSize="4xl" fontWeight="bold">
            Your Profile
          </Text>
        </Box>
        <Divider size="1.5rem" colorScheme="blue" />

        <Box
          fontSize="large"
          paddingX={16}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box padding={8}>
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Name<span>&nbsp;</span> : <span>&nbsp;</span>
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {patient.name}
              </Text>
            </Box>
            <Divider />
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Email<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {patient.email}
              </Text>
            </Box>
            <Divider />
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Age<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {patient.age}
              </Text>
            </Box>
            <Divider />
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Gender<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {patient.gender}
              </Text>
            </Box>
          </Box>
          <Box ml={4}>
            <Button colorScheme="blue">Edit your profile</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PatientDetails;
