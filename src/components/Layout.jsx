import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar, { SidebarItems } from "./elements/Sidebar";
import Header from "./elements/Header";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BsQuestionSquare } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  return (
    <Flex>
      <Sidebar>
        <Link to="/dashboard">
          <SidebarItems
            icon={<MdOutlineDashboard size={20} />}
            text={"Dashboard"}
            alert={false}
            active={location.pathname === "/dashboard"}
          />
        </Link>
        <Link to="/patients">
          <SidebarItems
            icon={<FaRegUser size={20} />}
            text={"Patient"}
            alert={false}
            active={location.pathname === "/patients"}
          />
        </Link>
        <Link to="/settings">
          <SidebarItems
            icon={<IoSettingsOutline size={20} />}
            text={"Settings"}
            alert={false}
            active={location.pathname === "/settings"}
          />
        </Link>
        <Link to="/patient/consult">
          <SidebarItems
            icon={<BsQuestionSquare size={20} />}
            text={"Consult a Dr"}
            alert={false}
            active={location.pathname === "/patient/consult"}
          />
        </Link>
        <Link to="/help">
          <SidebarItems
            icon={<BsQuestionSquare size={20} />}
            text={"Help"}
            alert={false}
            active={location.pathname === "/help"}
          />
        </Link>
      </Sidebar>
      <Box display={"flex"} flexDirection={"column"} w="100%">
        <Header />
        <Box flex="1" p="4">
          {/* Main content goes here */}
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
