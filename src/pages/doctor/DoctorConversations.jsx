import { Box, Divider, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { socket } from "../../App";
const DoctorConversations = () => {
  const navigate = useNavigate();
  const [allPatients, setAllPatients] = useState([]);

  const user = useSelector((state) => state.user.userDetail);

  const [userId, setUserId] = useState(user._id);

  console.log("user id", userId);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const res = await axios.get(`${SERVER_API}/fetchall/patients`);

        setAllPatients(res.data.patients);
      } catch (error) {
        console.log(error);
      }
    };
    getPatients();
  }, []);

  const handleJoinChat = (patientId) => {
    socket.emit("join-conversation", { doctorId: userId, patientId });
  };

  const handleNavigate = (patientId) => {
    handleJoinChat(patientId);
    navigate(`/doctor/conversation/${patientId}`);
  };

  return (
    <Box mt={8} p={12}>
      <Divider />
      <Box p={8}>
        {allPatients?.map((item, i) => {
          return (
            <Box
              key={i}
              p={4}
              display={"flex"}
              borderWidth={"1px"}
              mb={3}
              rounded={"lg"}
              justifyContent={"space-between"}
              alignItems={"center"}
              boxShadow={"md"}
            >
              <Box>
                <Text fontSize={"lg"} fontWeight={"semibold"}>
                  {item.email}
                </Text>
                <Text fontSize={"sm"}>{item.name}</Text>
              </Box>
              <Box>
                <Button
                  onClick={() => handleNavigate(item._id)}
                  colorScheme={"blue"}
                >
                  Chat
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default DoctorConversations;
