import { Box, Input, Flex, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SERVER_API } from "../config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SET_USER_DETAILS } from "../redux/types";

const SettingsPage = () => {
  const [key, setKey] = useState("");
  const email = useSelector((state) => state.user.userDetail.email); // replace with your email
  const iskeyInRedux = useSelector((state) => state.user.userDetail.secKey);

  const [isKey, setIsKey] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsKey(false); // Reset isKey state on every render
  }, []);

  const handleKeyApply = async () => {
    try {
      const response = await axios.post(`${SERVER_API}/seckey/add`, {
        secKey: key,
        email,
      });
      dispatch({
        type: SET_USER_DETAILS,
        payload: response.data,
      });
      setIsKey(true);
      console.log(response);
      setKey("");
    } catch (err) {
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
            onClick={handleKeyApply}
          >
            Apply
          </Button>
        </Flex>
        <Box>
          {(isKey || iskeyInRedux) && (
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
