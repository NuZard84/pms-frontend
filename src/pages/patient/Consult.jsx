import React, { useState } from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import { doctor_categories } from "./categoryData";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import { SERVER_API } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { PATIENT_UPDATE_TIMELINE } from "../../redux/types";
import { useNavigate } from "react-router-dom";

const Consult = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [medications, setMedication] = useState("");
  const navigate = useNavigate();

  const email = useSelector((state) => state.user.userDetail.email);
  console.log(email);
  const timelineRedux = useSelector((state) => state.user.userDetail.Timeline);

  console.log(timelineRedux);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const consultencyReportpost = async () => {
    try {
      const res = await axios.post(`${SERVER_API}/consult/patient`, {
        email,
        category: selectedCategory,
        symptoms,
        medicalHistory,
        medications,
      });
      dispatch({
        type: PATIENT_UPDATE_TIMELINE,
        payload: res.data.data.Timeline,
      });
      toast({
        title: "Consultancy report sent successfully.",
        description: "Check your timeline to edit your report",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(res);
      navigate("/patient/timeline");
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
          Consult a doctor
        </Text>
      </Box>
      <Box p={2} my={4}>
        <Text fontSize={"xl"} color={"gray.600"} fontWeight={"semibold"} mb={4}>
          Filter doctors by their specialization below
        </Text>
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
      </Box>
      <Divider orientation="horizontal" />
      {selectedCategory ? (
        <Box
          as="form"
          borderWidth={"1px"}
          padding={8}
          rounded={"lg"}
          my={8}
          mb={"100px"}
          display={"flex"}
          flexDir={"column"}
          shadow={"md"}
        >
          <Text
            fontSize={"4xl"}
            color={"black"}
            fontWeight={"bold"}
            textAlign={"Center"}
            textColor={"gray.600"}
          >
            Form for consultancy
          </Text>
          <FormControl id="symptoms" my={5}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"bold"}
              textColor={"gray.600"}
            >
              Symptoms
            </FormLabel>
            <Textarea
              borderWidth={"2px"}
              minH={"150px"}
              placeholder="Enter about your symptoms"
              value={symptoms}
              resize={"vertical"}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </FormControl>
          <FormControl id="medicalHistory" my={5}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"bold"}
              textColor={"gray.600"}
            >
              Medical History
            </FormLabel>
            <Textarea
              borderWidth={"2px"}
              minH={"150px"}
              placeholder="Enter your medical history"
              value={medicalHistory}
              resize={"vertical"}
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
          </FormControl>
          <FormControl id="medication" my={5}>
            <FormLabel
              fontSize={"lg"}
              fontWeight={"bold"}
              textColor={"gray.600"}
            >
              Medication
            </FormLabel>
            <Textarea
              borderWidth={"2px"}
              minH={"150px"}
              placeholder="Enter your currently running medication "
              value={medications}
              resize={"vertical"}
              onChange={(e) => setMedication(e.target.value)}
            />
          </FormControl>
          <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
            <Button
              bg="#2977ff"
              color="whitesmoke"
              onClick={() => consultencyReportpost()}
            >
              Submit
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          p={8}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100vh"}
        >
          <Box mb={44}>
            <Text
              fontSize={"4xl"}
              fontWeight={"bold"}
              width={"90%"}
              textAlign={"center"}
              textColor={"gray.700"}
            >
              You have to pick specialist to send consultancy report
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Consult;
