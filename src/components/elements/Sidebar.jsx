import {
  Box,
  Button,
  Text,
  Avatar,
  AvatarBadge,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser } from "../../redux/actions/userActions";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const toast = useToast();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userDetail);

  const navigate = useNavigate();
  const [extended, setExtended] = useState(true);

  const handleLogout = () => {
    toast({
      title: "logged out.",
      description: "You are logged out successfully.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    console.log("logout");
    dispatch(LogOutUser());
    navigate("/");
  };

  return (
    <Box as="aside">
      <Box
        as="nav"
        bg="#2977ff"
        shadow={"lg"}
        h={{ base: "100vh", md: "100vh", lg: "100vh" }}
        display={"flex"}
        flexDirection={"column"}
        px={extended ? "4" : "auto"}
      >
        <Box
          p="4"
          pb={"4"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Text
            display={extended ? "block" : "none"}
            m={0}
            fontSize={"28px"}
            fontWeight={"bolder"}
            color={"whitesmoke"}
            transition={"all"}
            transitionDuration={"300ms"}
            transitionDelay={"0.1"}
          >
            MedCare
          </Text>
          <Box
            cursor={"pointer"}
            onClick={() => setExtended((cur) => !cur)}
            p={3}
            ml={2}
            rounded={"lg"}
            bg={"gray.50"}
            _hover={{
              bg: "gray.100",
            }}
            transform={!extended ? "rotate(180deg)" : "rotate(0deg)"}
            transition={"all"}
            transitionDuration={"250ms"}
            transitionDelay={"0.1s"}
          >
            <MdOutlineArrowBackIosNew />
          </Box>
        </Box>
        <SidebarContext.Provider value={{ extended }}>
          <Box flex={"1"} as="ul" px={3}>
            {children}
          </Box>
        </SidebarContext.Provider>
        <Box
          display={"flex"}
          gap={3}
          rounded={"sm"}
          p={4}
          borderTop={"1px"}
          borderColor={"gray.400"}
          alignItems={"center"}
        >
          <Tooltip
            isDisabled={extended}
            label={"Logout"}
            fontSize={"md"}
            hasArrow
            placement="right"
            color={"black"}
            bg={"blue.300"}
            p={2}
            rounded={"lg"}
          >
            <Box
              cursor={"pointer"}
              onClick={() => handleLogout()}
              p={3}
              ml={2}
              rounded={"lg"}
              bg={"gray.50"}
              _active={{
                bg: "gray.100",
                color: "blue.300",
              }}
              _hover={{
                color: "blue.400",
              }}
            >
              <LuLogOut />
            </Box>
          </Tooltip>
          <Box
            transition={"all"}
            transitionDuration={"200ms"}
            transitionDelay={"0.1"}
            display={"flex"}
            alignItems={"center"}
            overflow={"hidden"}
            w={extended ? "100px" : "0px"}
            ml={extended ? "3" : ""}
          >
            <Text color={"whitesmoke"} fontSize={"18"} fontWeight={"bold"}>
              Logout
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function SidebarItems({ icon, text, active, alert }) {
  const { extended } = useContext(SidebarContext);

  return (
    <Box
      as="li"
      position={"relative"}
      display={"flex"}
      alignItems={"center"}
      py={3}
      px={3}
      my={1.5}
      fontSize={"md"}
      rounded={"md"}
      cursor={"pointer"}
      textColor={"whitesmoke"}
      bgGradient={active ? "linear(to-tr, blue.200, blue.100)" : "none"}
      color={active ? "blue.500" : "whitesmoke"}
      _hover={{
        bg: "blue.100",
        color: "blue",
        textColor: "blue.500",
      }}
    >
      <Box display={"flex"}>
        <Tooltip
          isDisabled={extended}
          label={text}
          fontSize={"md"}
          hasArrow
          placement="right"
          color={"black"}
          bg={"blue.300"}
          p={2}
          rounded={"lg"}
        >
          <Box
            p={2.5}
            rounded={"lg"}
            bg={"gray.50"}
            color={"black"}
            _hover={{
              color: "blue.500",
            }}
          >
            {icon}
          </Box>
        </Tooltip>
        <Box
          transition={"all"}
          transitionDuration={"200ms"}
          transitionDelay={"0.1"}
          overflow={"hidden"}
          w={extended ? "32px" : "0"}
          ml={extended ? "3" : ""}
        >
          {extended && (
            <Text
              position={"absolute"}
              rounded={"md"}
              py={1}
              ml={1}
              fontWeight={"semibold"}
              fontSize={"md"}
              opacity={"20"}
            >
              {text}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}
