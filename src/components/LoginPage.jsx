import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Switch,
  IconButton,
  InputGroup,
  InputRightElement,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { AuthLoginPost, AuthRegisterPost } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [variant, setVariant] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhonNumber] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const redux = useSelector((state) => state);

  console.log("redux", redux);

  useEffect(() => {
    console.log("email", email, "pass", password);
    console.log(isDoctor);
  }, [isDoctor]);

  const handleLogin = () => {
    const authLoginPostData = {
      email,
      password,
      isDoctor,
    };
    dispatch(AuthLoginPost(authLoginPostData, toast, navigate));
  };

  const handleRegister = () => {
    const authRegisterData = {
      name,
      email,
      password,
      age,
      phoneNumber,
      gender,
    };
    dispatch(AuthRegisterPost(authRegisterData, toast, navigate));
  };

  return (
    <Box
      bgGradient="linear(to-r, #1da1f2, #0071c5, #1877F2, #1da1f2)"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box marginBottom={8}>
        <Text
          fontSize="6xl"
          fontWeight="extrabold"
          color="white"
          textAlign="center"
          fontFamily=""
          letterSpacing=".5px"
        >
          MedCare
        </Text>
      </Box>
      {variant === "register" ? (
        <Box
          padding="8"
          boxShadow="xl"
          rounded="md"
          bg="white"
          width={{ base: "90%", md: "50%", lg: "40%" }}
          display="flex"
          flexDirection="column"
        >
          <Heading mb="4" textAlign="center">
            Register
          </Heading>
          <Stack spacing="4">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
            <Button
              mt={4}
              colorScheme="blue"
              size="lg"
              width="full"
              onClick={() => handleRegister()}
            >
              Register
            </Button>
          </Stack>
          <Box marginTop={8}>
            <Text textAlign="center">
              Already have an account?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => {
                  setEmail("");
                  setName("");
                  setPassword("");
                  setVariant("login");
                }}
              >
                Login
              </Button>
            </Text>
          </Box>
        </Box>
      ) : (
        <Box
          padding="8"
          boxShadow="lg"
          rounded="md"
          bg="white"
          width={{ base: "90%", md: "50%", lg: "40%" }}
          display="flex"
          flexDirection="column"
        >
          <Box alignSelf="flex-end">
            <FormControl display="flex" flexDirection="row">
              <FormLabel htmlFor="email-alerts" mb="0">
                As a doctor
              </FormLabel>
              <Switch
                id="role-selection"
                onChange={() => {
                  setIsDoctor((prev) => (prev === true ? false : true));
                }}
              />
            </FormControl>
          </Box>
          <Heading mb="4" textAlign="center">
            Login
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
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          </Stack>
          <Box marginTop={8}>
            <Text textAlign="center">
              Want to register?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => {
                  setEmail("");
                  setPassword("");
                  setVariant("register");
                }}
              >
                Register
              </Button>
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
