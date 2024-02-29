import { Box, Text, Badge, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PATIENT_UPDATE_TIMELINE_ID } from "../../redux/types";
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
import { useState } from "react";

const TimelinePatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const timeline = useSelector((state) => state.patient.userDetail.Timeline);

  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedication] = useState("");
  const [id, setId] = useState("");

  const handleUpdateReport = (
    itemId,
    medications,
    medicalHistory,
    symptoms
  ) => {
    setId(itemId); // Set the ID of the item being edited
    setMedicalHistory(medicalHistory); // Update medical history state
    setMedication(medications); // Update medications state
    setSymptoms(symptoms); // Update symptoms state
    onOpen(); // Open the modal
  };
  //   console.log(id, medications, medicalHistory, symptoms);

  const updatedConsultencyReportPost = async () => {
    try {
      const res = await axios.post(`${SERVER_API}/consult/update`, {
        email,
        checkPointId: id,
        symptoms,
        medicalHistory,
        medications,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(timeline);

  function UpdateModal() {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your reports</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Textarea
                placeholder="Update symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
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
                onChange={(e) => setMedications(e.target.value)}
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
          {timeline.map((item, i) => {
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
                </Box>
                <Box
                  ml={8}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  alignItems={"flex-end"}
                >
                  <Badge variant={"subtle"} colorScheme="green">
                    pending
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
      <UpdateModal />
    </>
  );
};

export default TimelinePatient;
