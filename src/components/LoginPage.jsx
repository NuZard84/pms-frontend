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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [variant, setVariant] = useState("login");
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleSecretKeyVisibility = () => {
    setShowSecretKey(!showSecretKey);
  };

  useEffect(() => {
    console.log(role);
  }, [role]);

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
          dro
        >
          PMS - System
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
              <Input type="text" placeholder="Enter your name" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              onClick={() => navigate("/dashboard")}
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
                  setRole((prevRole) =>
                    prevRole === "doctor" ? "patient" : "doctor"
                  );
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
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              onClick={() => navigate("/dashboard")}
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
