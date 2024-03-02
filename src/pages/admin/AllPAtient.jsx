import { Box, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { SERVER_API } from "../../config";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const AllPatient = () => {
  const [allPatients, setAllPatients] = useState([]);
  useEffect(() => {
    const getPatients = async () => {
      try {
        const res = await axios.get(`${SERVER_API}/fetchall/patients`);

        setAllPatients(res.data.patients);
      } catch (error) {
        console.log(error);
      }
    };
    getPatients();
  }, []);

  const handleDelete = (email) => {
    const deletePatient = async () => {
      try {
        const res = await axios.post(`${SERVER_API}/admin/delete/patient`, {
          email,
        });
        console.log(res);
        setAllPatients(allPatients.filter((item) => item.email !== email));
      } catch (error) {
        console.log(error);
      }
    };
    const confirm = window.confirm(`Are you sure you want to delete ${email}`);
    if (confirm) {
      deletePatient();
    } else {
      return;
    }
  };

  return (
    <Box p={12}>
      <Box display={"flex"} flexDirection={"column"}>
        {allPatients.map((item, i) => {
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
    </Box>
  );
};

export default AllPatient;
