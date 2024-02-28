import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SERVER_API, VB_SERVER_API } from "../config";
import { useToast } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

const DetaileFilledPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhonNumber] = useState("");
  const [education, setEducation] = useState("");
  const [catagory, setCatagory] = useState("");

  console.log(gender);

  const doctorDeatilpost = async () => {
    try {
      const res = await axios.post(`${VB_SERVER_API}/details/doctor`, {
        catagory,
        name,
        age,
        phoneNumber,
        email,
        gender,
        education,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //const { email, name, gender, age, phoneNumber, apiKey, education } = req.body;
  return (
    <Box
      bgGradient="linear(to-r, #1da1f2, #0071c5, #1877F2, #1da1f2)"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      position={"relative"}
    >
      <Box
        position={"absolute"}
        left={0}
        height={"100vh"}
        width={"50vw"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box marginBottom={8} display={"flex"} flexDirection={"column"}>
          <Text
            fontSize="6xl"
            fontWeight="extrabold"
            color="white"
            textAlign="center"
            marginBottom={14}
          >
            PMS - System
          </Text>
          <Text
            fontSize="5xl"
            fontWeight="extrabold"
            color="white"
            textAlign="center"
          >
            Hello ! Dr John Hope you are doing great
          </Text>
        </Box>
      </Box>
      <Box
        position={"absolute"}
        height={"100vh"}
        width={"50vw"}
        right={0}
        padding="8"
        boxShadow="xl"
        rounded="md"
        bg="white"
        // width={{ base: "90%", md: "50%", lg: "40%" }}
        display="flex"
        flexDirection="column"
      >
        <Heading mb="4" textAlign="center">
          Fill following details
        </Heading>
        <Stack spacing="4">
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="gender" my={4}>
            <RadioGroup onChange={setGender} value={gender}>
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="others">Others</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Box display={"flex"} gap={5} justifyContent={"space-between"}>
            <FormControl id="phonenumber">
              <FormLabel>Phone number</FormLabel>
              <Input
                type="number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhonNumber(e.target.value)}
              />
            </FormControl>
            <FormControl id="age" width={"60%"}>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </FormControl>
          </Box>
          <FormControl id="education">
            <FormLabel>Education</FormLabel>
            <Textarea
              placeholder="Enter your education"
              value={education}
              resize={"vertical"}
              onChange={(e) => setEducation(e.target.value)}
            />
          </FormControl>
          <FormControl id="key">
            <FormLabel>Specialist of</FormLabel>
            <Input
              type="text"
              placeholder="You are specialist of ..."
              value={catagory}
              onChange={(e) => setCatagory(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={() => {
              doctorDeatilpost();
              // navigate("/dashboard");
            }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DetaileFilledPage;
