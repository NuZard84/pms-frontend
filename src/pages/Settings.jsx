import { Box, Input, Flex, Text, Button, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SERVER_API } from "../config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SET_USER_DETAILS } from "../redux/types";

const SettingsPage = () => {
  const email = useSelector((state) => state.user.userDetail.email); // replace with your email
  const user = useSelector((state) => state.user.userDetail);

  const [isKey, setIsKey] = useState(user.isKeyVerified);
  const dispatch = useDispatch();
  const toast = useToast();
  const [key, setKey] = useState("");

  const handleKeyApply = async () => {
    try {
      console.log("cheack", key, email);
      const response = await axios.post(`${SERVER_API}/verifykey/`, {
        secKey: key,
        email,
      });
      console.log(response);
      dispatch({
        type: SET_USER_DETAILS,
        payload: response.data.data,
      });

      toast({
        title: "you add API key successfully !",
        description: "Now you can use Ai  bot in your timelines",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsKey(true);
      console.log(response);
      // setKey("");
    } catch (err) {
      toast({
        title: "Something went wrong ",
        description: "Cheack your API key and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(err);
    }
  };

  return (
    <>
      <Box p="16">
        <Box>
          <Text fontSize="large" pl="35px" mb="5px" fontWeight="500">
            Enter secret key provided by your organization to access AI powered
            analysis
          </Text>
        </Box>

        <Flex display="flex" p="10px" ml="20px">
          <Input
            placeholder="Enter your secret key"
            maxWidth="50%"
            onChange={(e) => setKey(e.target.value)}
            value={key}
          />
          <Button
            ml="10px"
            bg="#2977ff"
            color="whitesmoke"
            onClick={() => handleKeyApply()}
          >
            Apply
          </Button>
        </Flex>
        <Box>
          {isKey && (
            <Text
              fontSize="medium"
              pl="35px"
              mb="5px"
              fontWeight="500"
              color="gray"
            >
              Secret key has been applied successfully. You can now access AI
              powered chatBot
            </Text>
          )}
          {!isKey && (
            <Text
              fontSize="medium"
              pl="35px"
              mb="5px"
              fontWeight="500"
              color="gray"
            >
              Please enter the secret key provided by your organization to
              access AI powered analysis
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SettingsPage;
