import { Box, Divider, Button, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../config";
import { useNavigate } from "react-router-dom";
import { socket } from "../../App";
import { useSelector } from "react-redux";

const PatientConversations = () => {
  const navigate = useNavigate();
  const [AllDoctors, setAllDoctors] = useState([]);
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const user = useSelector((state) => state.user.userDetail);

  const [userId, setUserId] = useState(user._id);

  console.log("user id", userId);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await axios.get(`${SERVER_API}/fetchall/doctors`);
        console.log(res);
        setAllDoctors(res.data.doctors);
      } catch (error) {
        console.log(error);
      }
    };
    getDoctor();
  }, []);

  const handleJoinChat = (doctorId) => {
    socket.emit("join-conversation", { doctorId, patientId: userId });
  };

  const handleNavigate = (doctorId) => {
    handleJoinChat(doctorId);
    navigate(`/patient/conversation/${doctorId}`);
  };

  return (
    <Box mt={8} p={12}>
      <Divider />
      <Box p={8}>
        {AllDoctors?.map((item, i) => {
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
                  onClick={() => {
                    // handleJoinChat(item._id);
                    handleNavigate(item._id);
                  }}
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

export default PatientConversations;
