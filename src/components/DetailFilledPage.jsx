import {
  Box,
  Heading,
  Button,
  Input,
  Stack,
  Radio,
  RadioGroup,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  Menu,
  FormControl,
  FormLabel,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SERVER_API, VB_SERVER_API } from "../config";
import { useToast } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { DOCTOR_SET_USER_DETAILS, SET_USER_DETAILS } from "../redux/types";
import { doctor_categories } from "../pages/patient/categoryData";
import { IoMdArrowDropdown } from "react-icons/io";

const DetaileFilledPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    state.user.userDetail;
  });

  9;
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhonNumber] = useState("");
  const [education, setEducation] = useState("");
  const [category, setCatagory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(gender);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const doctorDeatilpost = async () => {
    try {
      const res = await axios.post(`${SERVER_API}/details/doctor`, {
        category: selectedCategory,
        name,
        age,
        phoneNumber,
        email,
        gender,
        education,
      });
      console.log(res);
      dispatch({ type: SET_USER_DETAILS, payload: res.data });
      navigate("/dashboard");
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
            {/* <Input
              type="text"
              placeholder="You are specialist of ..."
              value={category}
              onChange={(e) => setCatagory(e.target.value)}
            /> */}
            <Menu closeOnSelect>
              <MenuButton
                as={Box}
                rounded={"lg"}
                width={"35%"}
                p={2}
                borderWidth={"2px"}
                borderColor={"gray.200"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                fontSize={"lg"}
                fontWeight={"semibold"}
                color={"gray.600"}
              >
                <Box
                  w={"100%"}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Text>
                    {selectedCategory ? selectedCategory : "Select a category"}
                  </Text>
                  <IoMdArrowDropdown />
                </Box>
              </MenuButton>
              <MenuList
                minWidth={"500px"}
                maxHeight="300px"
                overflowY="auto"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "6px",
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
                <MenuOptionGroup
                  defaultValue="asc"
                  title="Doctors category"
                  type="radio"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {doctor_categories.map((item, i) => {
                    return (
                      <MenuItemOption value={item.value} key={i}>
                        {item.label}
                      </MenuItemOption>
                    );
                  })}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
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
