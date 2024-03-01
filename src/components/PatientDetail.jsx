import { Box, Text, Divider, defineStyleConfig } from "@chakra-ui/react";

export const dividerTheme = defineStyleConfig({
  defaultProps: {
    size: "xl",
    variant: "thick",
    colorScheme: "brand",
  },
});

const DoctorDetail = ({ patient }) => {
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p="10"
        boxShadow="lg"
        bg="white"
        display="flex"
        flexDirection="column"
        gap="1.5rem"
      >
        <Box>
          <Text fontSize="4xl" fontWeight="bold">
            Your Profile
          </Text>
        </Box>
        <Divider size="1.5rem" colorScheme="blue" />

        <Box fontSize="large" m="">
          <Box display="flex" paddingY="2">
            <Text mb="2" width="fit-content" fontWeight="bold">
              Name<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
            </Text>
            &nbsp;
            <Text width="fit-content" color="gray.600">
              {patient.userDetail.name}
            </Text>
          </Box>
          <Box display="flex" paddingY="2">
            <Text mb="2" width="fit-content" fontWeight="bold">
              Email<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
            </Text>
            &nbsp;
            <Text width="fit-content" color="gray.600">
              {patient.userDetail.email}
            </Text>
          </Box>
          <Box display="flex" paddingY="2">
            <Text mb="2" width="fit-content" fontWeight="bold">
              Age<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
            </Text>
            &nbsp;
            <Text width="fit-content" color="gray.600">
              {patient.userDetail.age}
            </Text>
          </Box>
          <Box display="flex" paddingY="2">
            <Text mb="2" width="fit-content" fontWeight="bold">
              Gender<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
            </Text>
            &nbsp;
            <Text width="fit-content" color="gray.600">
              {patient.userDetail.gender}
            </Text>
          </Box>
          <Box display="flex" paddingY="2">
            <Text mb="2" width="fit-content" fontWeight="bold">
              Education<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
            </Text>
            &nbsp;
            <Text width="fit-content" color="gray.600">
              {patient.userDetail.education}
            </Text>
          </Box>

          {/* <Text mb="2">{`Age : ${doctor.userDetail.age}`}</Text>
          <Text mb="2">{`Gender : ${doctor.userDetail.gender}`}</Text>
          <Text mb="2">{` Email : ${doctor.userDetail.email}`}</Text>
          <Text mb="2">{` Education : ${doctor.userDetail.education}`}</Text>
          <Text mb="2">{`PhoneNumber : ${doctor.userDetail.phoneNumber}`}</Text> */}
        </Box>
      </Box>
    </>
  );
};

export default DoctorDetail;
