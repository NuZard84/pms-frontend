import { Box, Text, Button, useDisclosure } from "@chakra-ui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { SERVER_API } from "../../config";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AllDoctors = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [AllDoctors, setAllDoctors] = useState([]);
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const res = await axios.get(`${SERVER_API}/fetchall/doctors`);

        setAllDoctors(res.data.doctors);
      } catch (error) {
        console.log(error);
      }
    };
    getDoctor();
  }, []);

  const handleDelete = (email) => {
    const deletedoctor = async () => {
      try {
        const res = await axios.post(`${SERVER_API}/admin/delete/doctor`, {
          email,
        });
        console.log(res);
        setAllDoctors(AllDoctors.filter((item) => item.email !== email));
      } catch (error) {
        console.log(error);
      }
    };
    const confirm = window.confirm(`Are you sure you want to delete ${email}`);
    if (confirm) {
      deletedoctor();
    } else {
      return;
    }
  };

  const handleModalOpen = () => {
    onOpen();
  };

  const handleAddDoctor = (email, password, secKey) => {
    const addDoctor = async () => {
      try {
        const res = await axios.post(`${SERVER_API}/admin/add/doctor`, {
          email,
          password,
          secKey,
        });
        console.log(res);
        setAllDoctors([...AllDoctors, res.data]);
        onClose();
      } catch (error) {
        console.log(error);
      }
    };
    const confirm = window.confirm(`Are you sure you want to add ${email}`);
    if (confirm) {
      addDoctor();
    } else {
      return;
    }
  };

  return (
    <>
      <AddDoctorModak
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        handleAddDoctor={handleAddDoctor}
      />
      <Box p={12}>
        <Box display={"flex"} flexDirection={"column"}>
          {AllDoctors.map((item, i) => {
            return (
              <Fragment key={i}>
                <Box
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
                  </Box>
                  <Box
                    p={2}
                    _hover={{
                      bg: "red.100",
                      color: "red",
                      rounded: "lg",
                    }}
                    onClick={() => handleDelete(item.email)}
                  >
                    <MdDelete size={25} />
                  </Box>
                </Box>
              </Fragment>
            );
          })}
        </Box>
        <Box mt={8}>
          <Button colorScheme="blue" onClick={() => handleModalOpen()}>
            Add doctor
          </Button>
        </Box>
      </Box>
    </>
  );
};

const AddDoctorModak = ({ isOpen, onOpen, onClose, handleAddDoctor }) => {
  const initialRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secKey, setSecKey] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create doctor account</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter doctor email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter doctor password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    variant="ghost"
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={handleTogglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Seceret Key</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter secret key"
                  value={secKey}
                  onChange={(e) => setSecKey(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    variant="ghost"
                    icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={handleTogglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleAddDoctor(email, password, secKey)}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AllDoctors;
