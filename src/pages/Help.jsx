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
import { useState } from "react";
import axios from "axios";
import { SERVER_API } from "../config";
import { useSelector } from "react-redux";
const Help = () => {
  const [query, setQuery] = useState("");

  const email = useSelector((state) => state.user.userDetail.email); // replace with your email

  const handleSubmissionQuery = async () => {
    const res = await axios.post(`${SERVER_API}/query/add`, {
      query,
      email,
    });
    setQuery("");
    console.log(res);
  };
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

              <Input
                placeholder="Enter your query..."
                size="lg"
                m="10px"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <Button
                bg="#2977ff"
                color="whitesmoke"
                alignSelf="right"
                width="fit-content"
                marginTop="5"
                m="10px"
                onClick={handleSubmissionQuery}
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
