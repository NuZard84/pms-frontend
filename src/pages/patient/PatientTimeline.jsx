import { Box, Text, Badge, Button, Divider, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  PATIENT_UPDATE_TIMELINE,
  PATIENT_UPDATE_TIMELINE_ID,
} from "../../redux/types";
import axios from "axios";
import { SERVER_API } from "../../config";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

function UpdateModal({
  isOpen,
  onClose,
  updatedConsultencyReportPost,
  symptoms,
  setSymptoms,
  medicalHistory,
  setMedicalHistory,
  medications,
  setMedication,
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  console.log("component rendered");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your reports</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <Textarea
              ref={initialRef}
              placeholder="Update symptoms"
              value={symptoms}
              onChange={(e) => {
                setSymptoms(e.target.value);
              }}
            />
            <Textarea
              mt={4}
              placeholder="Update medical history"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
            <Textarea
              mt={4}
              placeholder="Update medication"
              value={medications}
              onChange={(e) => setMedication(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={updatedConsultencyReportPost}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const TimelinePatient = () => {
  console.log("timeline rendered");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userTimeline = useSelector((state) => state.user.userDetail.Timeline);
  const patientTimeline = useSelector((state) => state.patient.Timeline);

  console.log(
    "user time:",
    userTimeline,
    "patient time:",
    patientTimeline,
    Boolean(patientTimeline)
  );

  const email = useSelector((state) => state.user.userDetail.email);
  const user = useSelector((state) => state.user.userDetail);

  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedication] = useState("");
  const [id, setId] = useState("");
  const [timeLine, setTimeLine] = useState([]);

  console.log("timeline", userTimeline);
  console.log("user", user);

  const handleUpdateReport = (
    itemId,
    medications,
    medicalHistory,
    symptoms
  ) => {
    console.log("rendered insider handleUpdateReport");
    setId(itemId);
    setMedicalHistory(medicalHistory);
    setMedication(medications);
    setSymptoms(symptoms);
    onOpen();
  };

  useEffect(() => {
    const getPatient = async () => {
      try {
        console.log("getPatient");
        const res = await axios.post(`${SERVER_API}/getpatient`, {
          id: user._id,
        });
        setTimeLine(res.data.patient.Timeline);
        // dispatch({
        //   type: PATIENT_UPDATE_TIMELINE,
        //   payload: res.data.patient.Timeline,
        // });
        console.log(res.data.patient);
      } catch (error) {
        console.log(error);
      }
    };
    getPatient();
  }, []);

  const updatedConsultencyReportPost = async () => {
    try {
      console.warn("enter to update report api");
      const res = await axios.post(`${SERVER_API}/consult/update`, {
        email,
        checkPointId: id,
        symptoms,
        medicalHistory,
        medications,
      });
      onClose();
      toast({
        title: "Your report updated successfully.",
        description: "Doctor will varify it soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(res.data.data.Timeline);
      setTimeLine(res.data.data.Timeline);
      // dispatch({
      //   type: PATIENT_UPDATE_TIMELINE,
      //   payload: res.data.data.Timeline,
      // });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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
          {timeLine?.map((item, i) => {
            return (
              <Box
                key={item._id}
                p={4}
                my={4}
                rounded={"md"}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
                gap={1}
                borderWidth={"1px"}
                borderColor={"gray.300"}
                boxShadow={"md"}
              >
                <Box
                  display={"flex"}
                  justifyContent={"center"}
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
                    colorScheme={item.status ? "green" : "red"}
                  >
                    {item.status ? "varified" : "pending"}
                  </Badge>
                  <Box
                    as="button"
                    disabled={item.status}
                    _disabled={{
                      cursor: "not-allowed",
                      bg: "gray.50",
                    }}
                    p={2}
                    bg={"gray.100"}
                    rounded={"md"}
                    cursor={"pointer"}
                    _hover={{
                      bg: "gray.200",
                    }}
                    onClick={() => {
                      handleUpdateReport(
                        item._id,
                        item.medications,
                        item.medicalHistory,
                        item.symptoms
                      );
                    }}
                  >
                    <FiEdit size={25} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <UpdateModal
        isOpen={isOpen}
        onClose={onClose}
        updatedConsultencyReportPost={updatedConsultencyReportPost}
        symptoms={symptoms}
        setSymptoms={setSymptoms}
        medicalHistory={medicalHistory}
        setMedicalHistory={setMedicalHistory}
        medications={medications}
        setMedication={setMedication}
      />
    </>
  );
};

export default TimelinePatient;
