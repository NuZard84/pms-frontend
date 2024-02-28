import {
  Box,
  Button,
  Input,
  Flex,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import image from "./../images/light-blue.png";
const Help = () => {
  return (
    <>
      <Box>
        <Flex flexDir="row" justifyContent="space-around">
          <Box p={4} margin="10px" padding="10px" maxWidth="50%">
            <Flex flexDir={"column"}>
              <Heading as="h3" size="lg" m="10px">
                Query Submission Help
              </Heading>

              <Text fontSize="lg" m="10px">
                Welcome to our query submission interface! Here, you can enter
                your queries to serach for information or perform specific
                actions.
              </Text>

              <Input placeholder="Enter your query..." size="lg" m="10px" />

              <Button
                colorScheme="blue"
                alignSelf="right"
                width="fit-content"
                marginTop="5"
                m="10px"
              >
                Submit
              </Button>
            </Flex>
          </Box>
          <Box>
            <Image src={image} h="600px" mt="40px" />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Help;
