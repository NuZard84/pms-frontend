import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector } from "react-redux";

const Header = () => {
  const menuData = [
    {
      label: "My profile",
      link: "/dashboard",
    },
    {
      label: "Settings",
      link: "/settings",
    },
    {
      label: "Help",
      link: "/help",
    },
  ];
  return (
    <Box as="header">
      <Box
        bg="white"
        px="12"
        pt={"10"}
        color="#818fa2"
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Box width={"35%"}>
          <InputGroup
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <InputLeftElement pointerEvents="none" m={0} mt={1}>
              <CiSearch size={30} />
            </InputLeftElement>
            <Input
              display={"flex"}
              justifyContent={"ceneter"}
              alignItems={"center"}
              size={"lg"}
              type="tel"
              placeholder="Search"
              bg={"gray.100"}
              borderRadius={10}
              opacity={0.75}
            />
          </InputGroup>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={5}
        >
          <Box
            cursor={"pointer"}
            _hover={{
              opacity: 0.75,
            }}
          >
            <AvatarGroup>
              <Avatar
                size={"sm"}
                bg={"white"}
                icon={<IoNotificationsOutline color="black" size={28} />}
              >
                <AvatarBadge bg="blue.500" boxSize="1em" placement="top-end" />
              </Avatar>
            </AvatarGroup>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={3}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Avatar bg="#2977ff" color="whitesmoke" size="md" name={"hello"} />
            <Menu>
              <MenuButton>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  gap={3}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text color={"black"} fontWeight={"semibold"} fontSize={"md"}>
                    {/* {user.isDoctor ? `Dr ${user.name}` : `${user.name}`} */}
                    hello
                  </Text>
                  <Box>
                    <TiArrowSortedDown color="black" />
                  </Box>
                </Box>
              </MenuButton>
              <MenuList color={"black"} mt={"4"} py={"2"}>
                {menuData.map((item, i) => (
                  <Fragment key={i}>
                    <MenuItem
                      as={"a"}
                      href={item.link}
                      fontWeight={"semibold"}
                      opacity={0.75}
                    >
                      {item.label}
                    </MenuItem>
                    {i !== menuData.length - 1 && <MenuDivider />}
                  </Fragment>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
