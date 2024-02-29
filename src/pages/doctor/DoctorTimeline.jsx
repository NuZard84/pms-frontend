import { Box, Text, Badge, Button, Collapse, Divider } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  PATIENT_UPDATE_TIMELINE,
  PATIENT_UPDATE_TIMELINE_ID,
} from "../../redux/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Textarea,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Fragment, useState, useEffect } from "react";
import { DOCTOR_UPDATE_TIMELINE } from "../../redux/types";
import axios from "axios";
import { SERVER_API } from "../../config";

const TimeLineDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onToggle } = useDisclosure();

  const [prescription, setPrescription] = useState("");
  const [result, setResult] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const email = useSelector((state) => state.patient.userDetail.email);
  const timeline123 = useSelector((state) => state.patient.Timeline);

  console.log("redux", timeline123);
  const timelineRedux = useSelector(
    (state) => state.patient.userDetail.Timeline
  );
  const [data, setData] = useState(timelineRedux);

  useEffect(() => {
    console.log("hello", data);
  }, [data]);

  const [isVarified, setIsVarified] = useState(timelineRedux.map(() => false));
  //   const [timeline, setTimeline] = useState([]);

  //   useEffect(() => {
  //     // setTimeline(timelineRedux);

  //     console.log("timelineRedux", timelineRedux);
  //   }, [timelineRedux]);

  //   console.log("timelineRedux outside", timelineRedux);

  const handleCollapseToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleVarifyEdit = async (index, id) => {
    const updatedTimeline = [...timelineRedux];
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
      console.log(res.data.data.Timeline);
      setData(res.data.data.Timeline);
      dispatch({
        type: PATIENT_UPDATE_TIMELINE,
        payload: res.data.data.Timeline,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        p={14}
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
    </>
  );
};

export default TimeLineDoctor;
