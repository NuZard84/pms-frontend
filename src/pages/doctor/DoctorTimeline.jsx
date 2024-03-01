import {
  Box,
  Text,
  Badge,
  Button,
  Collapse,
  Divider,
  Avatar,
  Flex,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATIENT_UPDATE_TIMELINE } from "../../redux/types";
import { Fragment, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { SERVER_API, VB_SERVER_API } from "../../config";
import { useParams } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
import { GiArtificialHive } from "react-icons/gi";

const ChatBotDrawer = ({
  onClose,
  isOpen,
  chatInput,
  setChatInput,
  handleAiSearch,
}) => {
  const [allChats, setAllChats] = useState([]);

  const memoizedChats = useMemo(() => {
    return (
      <>
        {allChats?.map((item, i) => (
          <Fragment key={i}>
            <Box>
              <Flex width={"100%"} mb={6}>
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
                    rounded={"lg"}
                  >
                    <Text m={0} fontSize={"15px"}>
                      {item.question}
                    </Text>
                  </Box>
                </Box>
              </Flex>
              <Flex width={"100%"} mb={6}>
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
                    <Avatar
                      size={"xs"}
                      bg={"blue.500"}
                      icon={<GiArtificialHive size={20} />}
                    />
                    <Text textAlign={"left"}>PMS AI</Text>
                  </Box>
                  <Box
                    borderWidth={"1px"}
                    borderColor={"gray.400"}
                    padding={2}
                    rounded={"lg"}
                    bg={"#2977ff"}
                    textColor={"whitesmoke"}
                  >
                    <Text m={0}>{item.answer}</Text>
                  </Box>
                </Box>
                <Spacer />
              </Flex>
            </Box>
          </Fragment>
        ))}
      </>
    );
  }, [allChats]);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{`PMS chat bot`}</DrawerHeader>
        <Divider colorScheme="facebook" />

        <DrawerBody m={0} px={4}>
          <Box
            minH={"100vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            overflowY={"auto"}
          >
            {memoizedChats}
          </Box>
        </DrawerBody>
        <Divider colorScheme="facebook" />
        <DrawerFooter>
          <Box
            display={"flex"}
            flexDirection={"row"}
            width={"100%"}
            gap={3}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Input
              size={"md"}
              placeholder="Enter your query"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <Box
              bg={"#2977ff"}
              color={"whitesmoke"}
              padding={"2"}
              rounded={"lg"}
              cursor={"pointer"}
              onClick={() =>
                handleAiSearch(chatInput, setAllChats, setChatInput)
              }
            >
              <VscSend size={25} />
            </Box>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const TimeLineDoctor = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(params.id);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [prescription, setPrescription] = useState("");
  const [result, setResult] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [chatInput, setChatInput] = useState("");

  const timeline123 = useSelector((state) => state.patient.Timeline);

  console.log("redux", timeline123);
  const [email, setEmail] = useState("");

  const [isVarified, setIsVarified] = useState(timeline123.map(() => false));

  const handleCollapseToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const getPatient = async () => {
      try {
        console.log("getPatient");
        const res = await axios.post(`${SERVER_API}/getpatient`, {
          id: params.id,
        });
        setEmail(res.data.patient.email);
        dispatch({
          type: PATIENT_UPDATE_TIMELINE,
          payload: res.data.patient.Timeline,
        });
        console.log(res.data.patient);
      } catch (error) {
        console.log(error);
      }
    };
    getPatient();
  }, []);

  const handleVarifyEdit = async (index, id) => {
    console.log("varify nd edit", index, id);
    const updatedTimeline = [...timeline123];
    const currentItem = updatedTimeline[index];

    try {
      if (!currentItem.prescription && !currentItem.result) {
        updatedTimeline[index] = {
          ...currentItem,
          prescription,
          result,
          status: true,
        };
      } else {
        updatedTimeline[index] = {
          ...currentItem,
          prescription: prescription || currentItem.prescription,
          result: result || currentItem.result,
          status: true,
        };
      }
      console.log("updated", updatedTimeline[index]);
      const res = await axios.post(`${SERVER_API}/consult/update`, {
        email,
        checkPointId: id,
        prescription: updatedTimeline[index].prescription,
        result: updatedTimeline[index].result,
        status: Boolean(updatedTimeline[index].status),
      });
      console.log("res", res.data.data.Timeline);

      dispatch({
        type: PATIENT_UPDATE_TIMELINE,
        payload: res.data.data.Timeline,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAiSearch = async (que, setAllChats, setChatInput) => {
    try {
      const res = await axios.post(`${SERVER_API}/chatgpt`, {
        userInput: que,
      });

      console.log("aisearch", res.data.response);
      const searchObj = {
        question: que,
        answer: res.data.response,
      };

      setAllChats((prev) => [...prev, searchObj]);
      setChatInput("");
    } catch (error) {
      console.log(error);
      setChatInput("");
    }
  };

  return (
    <>
      <Box
        p={14}
        position={"relative"}
        display={"flex"}
        flexDir={"column"}
        maxH={"100vh"}
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#2977ff",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Box position={"fixed"} bottom={"5%"} right={"5%"}>
          <Button
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            colorScheme="blue"
            gap={2}
            onClick={() => onOpen()}
          >
            <Box>
              <GiArtificialHive size={20} />
            </Box>
            Chat-bot
          </Button>
        </Box>
        <Box>
          <Text fontSize={"4xl"} color={"black"} fontWeight={"bold"}>
            Your Timelines
          </Text>
        </Box>
        <Box p={8} my={4}>
          {timeline123?.map((item, i) => {
            return (
              <Fragment key={item._id}>
                <Box
                  p={4}
                  my={4}
                  borderWidth={"1px"}
                  borderColor={"gray.300"}
                  boxShadow={"md"}
                  rounded={"md"}
                  display={"flex"}
                  flexDir={"column"}
                >
                  <Box
                    key={item._id}
                    display={"flex"}
                    flexDir={"row"}
                    justifyContent={"space-between"}
                    gap={1}
                  >
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      //   alignItems={"center"}
                      flex={1}
                      flexDirection={"column"}
                      ml={2}
                    >
                      <Text
                        fontSize={"lg"}
                        fontWeight={"bold"}
                        textColor={"gray.600"}
                        textAlign={"center"}
                      >
                        {item.date.split("T")[0]}
                      </Text>
                      <Box>
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          letterSpacing={0.5}
                          textColor={"gray.600"}
                        >
                          Category :
                        </Text>
                      </Box>
                      <Box ml={2} mb={2}>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                          {item.category}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          letterSpacing={0.5}
                          textColor={"gray.600"}
                        >
                          Symptoms :
                        </Text>
                      </Box>
                      <Box ml={2} mb={2}>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                          {item.symptoms}
                        </Text>
                      </Box>
                      <Box>
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          letterSpacing={0.5}
                          textColor={"gray.600"}
                        >
                          Medical history :
                        </Text>
                      </Box>
                      <Box ml={2} mb={2}>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                          {item.medicalHistory}
                        </Text>
                      </Box>

                      <Box>
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          letterSpacing={0.5}
                          textColor={"gray.600"}
                        >
                          Medications :
                        </Text>
                      </Box>
                      <Box ml={2} mb={2}>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                          {item.medications}
                        </Text>
                      </Box>
                      {item.status && (
                        <>
                          <Divider orientation="horizontal" my={3} />
                          {item.prescription && (
                            <>
                              <Box>
                                <Text
                                  fontSize={"xl"}
                                  fontWeight={"bold"}
                                  letterSpacing={0.5}
                                  textColor={"gray.600"}
                                >
                                  Prescription :
                                </Text>
                              </Box>
                              <Box ml={2} mb={2}>
                                <Text fontSize={"lg"} fontWeight={"semibold"}>
                                  {item.prescription}
                                </Text>
                              </Box>
                            </>
                          )}
                          {item.result && (
                            <>
                              <Box>
                                <Text
                                  fontSize={"xl"}
                                  fontWeight={"bold"}
                                  letterSpacing={0.5}
                                  textColor={"gray.600"}
                                >
                                  Results :
                                </Text>
                              </Box>
                              <Box ml={2} mb={2}>
                                <Text fontSize={"lg"} fontWeight={"semibold"}>
                                  {item.result}
                                </Text>
                              </Box>
                            </>
                          )}
                        </>
                      )}
                    </Box>
                    <Box
                      ml={8}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      alignItems={"flex-end"}
                    >
                      <Badge
                        variant={item.status ? "solid" : "subtle"}
                        colorScheme="green"
                      >
                        {item.status ? "Varified" : "Pending"}
                      </Badge>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    flexDir={"column"}
                  >
                    <Box
                      onClick={() => handleCollapseToggle(i)}
                      py={2}
                      px={4}
                      m={2}
                      bg={"#2977ff"}
                      rounded={"md"}
                      width={"fit-content"}
                      color={"whitesmoke"}
                      fontWeight={"bold"}
                      cursor={"pointer"}
                      _hover={{
                        bg: "blue.600",
                      }}
                    >
                      {isVarified[i]
                        ? "Edit your prescriptions"
                        : "Add Your prescriptions"}
                    </Box>
                    <Collapse in={openIndex === i} animateOpacity>
                      <Box
                        p={4}
                        color="black"
                        mt="2"
                        bg="whitesmoke"
                        rounded="md"
                        shadow="md"
                        display={"flex"}
                        flexDirection={"column"}
                      >
                        <Box display={"flex"} flexDirection={"column"}>
                          <FormControl id="prescription" my={5}>
                            <FormLabel
                              fontSize={"lg"}
                              fontWeight={"bold"}
                              textColor={"gray.600"}
                            >
                              Precscription
                            </FormLabel>
                            <Textarea
                              borderWidth={"2px"}
                              minH={"150px"}
                              placeholder="Enter precscription here"
                              value={prescription}
                              resize={"vertical"}
                              onChange={(e) => setPrescription(e.target.value)}
                            />
                          </FormControl>
                          <FormControl id="results" my={5}>
                            <FormLabel
                              fontSize={"lg"}
                              fontWeight={"bold"}
                              textColor={"gray.600"}
                            >
                              Results
                            </FormLabel>
                            <Textarea
                              borderWidth={"2px"}
                              minH={"150px"}
                              placeholder="Enter final results here"
                              value={result}
                              resize={"vertical"}
                              onChange={(e) => setResult(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleVarifyEdit(i, item._id)}
                          >
                            {item.status ? "Edit" : "Varify"}
                          </Button>
                        </Box>
                      </Box>
                    </Collapse>
                  </Box>
                </Box>
              </Fragment>
            );
          })}
        </Box>
      </Box>
      <ChatBotDrawer
        isOpen={isOpen}
        onClose={onClose}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleAiSearch={handleAiSearch}
      />
    </>
  );
};

export default TimeLineDoctor;
