import {
  //   Avatar,
  Box,
  Divider,
  Text,
  Input,
  Flex,
  Spacer,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { Fragment, useMemo, useState } from "react";
import { chatData } from "./data";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { socket } from "../../App";
import { SERVER_API } from "../../config";
import axios from "axios";

const DoctorConversationPage = () => {
  const params = useParams();

  console.log("params", params);
  const [allChats, setAllChats] = useState(chatData);
  const [patient, setPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const user = useSelector((state) => state.user.userDetail);

  const [userId, setUserId] = useState(user._id);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.post(`${SERVER_API}/getpatient`, {
          id: params.docid,
        });
        console.log("doctor by id", res.data);
        setPatient(res.data.patient);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatient();
    // Join the conversation room
    socket.emit("join-conversation", {
      patientId: params.docid,
      doctorId: userId,
    });

    // Receive conversation history
    socket.on("conversation-history", (history) => {
      setMessages(history);
    });

    // Receive new messages
    socket.on("receive-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Receive typing indication
    socket.on("typing-indication", (isTypingNow) => {
      setIsTyping(isTypingNow);
    });

    // Clean up the socket event listeners
    return () => {
      socket.off("conversation-history");
      socket.off("receive-message");
      socket.off("typing-indication");
    };
  }, [params.docid, userId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("new-message", {
        patientId: params.docid,
        doctorId: userId,
        content: newMessage,
        senderId: userId,
        senderModel: "Patient",
      });
      setNewMessage("");
    }
  };

  const handleMessageRead = (messageId) => {
    socket.emit("message-read", {
      patientId: params.docid,
      doctorId: userId,
      messageId,
    });
  };

  const handleTyping = () => {
    socket.emit("typing", {
      patientId: params.docid,
      doctorId: userId,
      isTyping: true,
    });
    const timeoutId = setTimeout(() => {
      socket.emit("typing", {
        patientId: params.docid,
        doctorId: userId,
        isTyping: false,
      });
    }, 2000);
    return () => clearTimeout(timeoutId);
  };

  const memoizedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <Fragment key={index}>
        <Flex width={"100%"} mb={6}>
          {message.senderModel === "Patient" ? (
            <>
              <Box
                display={"flex"}
                placeSelf={"flex-end"}
                flexDirection={"column"}
                maxWidth={"84%"}
              >
                <Box
                  mb={2}
                  display={"flex"}
                  flexDir={"row"}
                  alignItems={"center"}
                  gap={1}
                >
                  <Avatar size={"xs"} bg={"blue.500"} />
                  <Text textAlign={"left"}>Patient</Text>
                </Box>
                <Box
                  borderWidth={"1px"}
                  borderColor={"gray.400"}
                  padding={2}
                  rounded={"lg"}
                  bg={"#2977ff"}
                  ml={4}
                  mt={1}
                  textColor={"whitesmoke"}
                >
                  <Text m={0}>{message.content}</Text>
                </Box>
              </Box>
              <Spacer />
            </>
          ) : (
            <>
              <Spacer />
              <Box
                display={"flex"}
                placeSelf={"flex-end"}
                flexDirection={"column"}
                maxWidth={"84%"}
              >
                <Box
                  mb={2}
                  display={"flex"}
                  flexDir={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  gap={1}
                >
                  <Avatar size={"xs"} bg={"blue.500"} />
                  <Text textAlign={"right"}>You</Text>
                </Box>
                <Box
                  borderWidth={"1px"}
                  borderColor={"gray.400"}
                  padding={2}
                  mr={4}
                  mt={1}
                  rounded={"lg"}
                >
                  <Text m={0} fontSize={"15px"}>
                    {message.content}
                  </Text>
                </Box>
              </Box>
            </>
          )}
        </Flex>
      </Fragment>
    ));
  }, [messages]);

  return (
    <Box mt={4} p={8} overflowY={"auto"}>
      <Divider />
      <Box p={6} overflowY={"auto"}>
        <Box
          h={"80vh"}
          borderWidth={"2px"}
          rounded={"md"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={3}
            ml={5}
            my={2}
            p={2}
            alignItems={"center"}
          >
            <Avatar size={"sm"} />
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              {patient?.name}
            </Text>
          </Box>
          <Box
            flex={1}
            flexDirection={"column"}
            width={"100%"}
            overflow={"auto"}
          >
            <Divider />
            <Box minHeight={"67vh"} overflowY={"auto"}>
              <Box
                flex={1}
                flexDirection={"column"}
                p={2}
                display={"flex"}
                justifyContent={"flex-end"}
              >
                {memoizedMessages}
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            p={4}
          >
            {isTyping && <Text mr={2}>The other user is typing...</Text>}
            <Input
              placeholder="Type a message"
              rounded={"full"}
              flex={1}
              p={2}
              ml={2}
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
            />
            <Box
              ml={4}
              onClick={sendMessage}
              size={"sm"}
              colorScheme="blue"
              as={Button}
              p={2}
              _hover={{
                bg: "blue.100",
                color: "blue",
                rounded: "lg",
              }}
            >
              Send
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorConversationPage;