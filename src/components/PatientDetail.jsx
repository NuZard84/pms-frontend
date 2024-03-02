import {
  Box,
  Text,
  Divider,
  defineStyleConfig,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import axios from "axios";
import { SERVER_API } from "../config";
import { useDispatch } from "react-redux";
import { SET_USER_DETAILS } from "../redux/types";

export const dividerTheme = defineStyleConfig({
  defaultProps: {
    size: "xl",
    variant: "thick",
    colorScheme: "brand",
  },
});

function UpdateModal({
  isOpen,
  onClose,
  name,
  setName,
  age,
  setAge,
  phoneNumber,
  setPhoneNumber,
  updatePatientDetails,
}) {
  const initialRef = useRef(null);
  console.log("component rendered");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your profile</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <FormLabel>
              <Text>Name :</Text>
            </FormLabel>
            <Input
              ref={initialRef}
              mb={4}
              placeholder="Update your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <FormLabel>
              <Text>Age :</Text>
            </FormLabel>
            <Input
              placeholder="Update your age"
              mb={4}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <FormLabel>
              <Text>Phone number :</Text>
            </FormLabel>
            <Input
              placeholder="Update your phone number"
              mb={4}
              value={phoneNumber}
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updatePatientDetails}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const PatientDetails = ({ patient }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState(patient.age);
  const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);

  const [data, setData] = useState(patient);

  const updatePatientDetails = async () => {
    try {
      const res = await axios.post(`${SERVER_API}/details/update/patient`, {
        email: patient.email,
        name,
        age,
        phoneNumber,
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
        isOpen={isOpen}
        onClose={onClose}
        setAge={setAge}
        setName={setName}
        setPhoneNumber={setPhoneNumber}
        age={age}
        name={name}
        phoneNumber={phoneNumber}
        updatePatientDetails={updatePatientDetails}
      />
      <Box p="10" display="flex" flexDirection="column" gap="1.5rem">
        <Box>
          <Text fontSize="4xl" fontWeight="bold">
            My Profile
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
                Email<span>&nbsp;</span> : <span>&nbsp;</span>{" "}
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
            <Box display="flex" paddingY="2">
              <Text mb="2" width="fit-content" fontWeight="bold">
                Phone <span>&nbsp;</span> : <span>&nbsp;</span>
              </Text>
              &nbsp;
              <Text width="fit-content" color="gray.600" fontWeight={"550"}>
                {data.phoneNumber}
              </Text>
            </Box>
          </Box>
          <Box ml={4}>
            <Button
              onClick={() => onOpen()}
              bg="#2977ff"
              textColor="whitesmoke"
            >
              Edit your profile
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PatientDetails;
