import {
  Box,
  Text,
  Divider,
  defineStyleConfig,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";

export const dividerTheme = defineStyleConfig({
  defaultProps: {
    size: "xl",
    variant: "thick",
    colorScheme: "brand",
  },
});
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { SERVER_API } from "../config";
import { useDispatch } from "react-redux";
import { SET_USER_DETAILS } from "../redux/types";

function UpdateModal({
  isOpen,
  onClose,
  name,
  setName,
  age,
  setAge,
  education,
  setEducation,
  specialist,
  setSpecialist,
  updateDoctorDetails,
}) {
  const initialRef = useRef(null);
  console.log("component rendered");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your reports</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <Input
              ref={initialRef}
              placeholder="Update symptoms"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              mt={4}
              placeholder="Update medical history"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <Input
              mt={4}
              placeholder="Update education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
            <Input
              mt={4}
              placeholder="Update medication"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateDoctorDetails}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const DoctorDetail = ({ doctor }) => {
  console.log("doctor", doctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(doctor.name);
  const [age, setAge] = useState(doctor.age);

  const [education, setEducation] = useState(doctor.education);
  const [specialist, setSpecialist] = useState(doctor.specialist);
  const [data, setData] = useState(doctor);

  const updateDoctorDetails = async () => {
    try {
      const res = await axios.post(`${SERVER_API}/details/update/doctor`, {
        email: doctor.email,
        name,
        age,
        education,
        category: specialist,
      });
      console.log(res);
      dispatch({ type: SET_USER_DETAILS, payload: res.data });
      onClose();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <UpdateModal
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        education={education}
        specialist={specialist}
        isOpen={isOpen}
        onClose={onClose}
        updateDoctorDetails={updateDoctorDetails}
        setEducation={setEducation}
        setSpecialist={setSpecialist}
      />
      <Box p="10" display="flex" flexDirection="column" gap="1.5rem">
        <Box>
          <Text fontSize="4xl" fontWeight="bold">
            Your Profile
          </Text>
        </Box>
        <Divider size="1.5rem" colorScheme="blue" />

        <Box
          fontSize="large"
          paddingX={16}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box padding={8}>
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Name<span>&nbsp;</span> : <span>&nbsp;</span>
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {data.name}
              </Text>
            </Box>
            <Divider />
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Email<span>&nbsp;</span> : <span>&nbsp;</span>
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {data.email}
              </Text>
            </Box>
            <Divider />
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Age<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {data.age}
              </Text>
            </Box>
            <Divider />
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Gender<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {data.gender}
              </Text>
            </Box>
            <Divider />
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Education<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {data.education}
              </Text>
            </Box>
            <Divider />
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Specilist<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {data.specialist}
              </Text>
            </Box>
          </Box>
          <Box ml={4}>
            <Button
              onClick={() => {
                onOpen();
              }}
              colorScheme="blue"
            >
              Edit your profile
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DoctorDetail;
