// import { Card, Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Fragment } from "react";

const headerName = [
  "name",
  "email",
  "gender",
  "age",
  "phoneNumber",
  "category",
];
const doctorDetail = {
  name: "Doctor 1",
  email: "doctor1@gmail.com",
  gender: "Male",
  phoneNumber: 1234567890,
  age: 35,
  education: "M.B.B.S",
};
const doctorDetail2 = {
  name: "Dr. Jane Doe", // Different placeholder name
  email: "placeholder@example.com", // Generic email address
  gender: "Female", // Different placeholder gender
  phoneNumber: "555-555-5555", // Generic phone number
  age: 42, // Different placeholder age
  education: "M.D.", // Different placeholder education
};

const doctorDetail3 = {
  name: "Dr. Jane Doe", // Different placeholder name
  email: "placeholder@example.com", // Generic email address
  gender: "Female", // Different placeholder gender
  phoneNumber: "555-555-5555", // Generic phone number
  age: 42, // Different placeholder age
  education: "M.D.", // Different placeholder education
};

const mergedDoctors = [
  { ...doctorDetail },
  { ...doctorDetail2 },
  { ...doctorDetail3 },
];

export default function PatientCard() {
  // return <h1>Hello</h1>;
  return (
    // <Box
    //   display={"flex"}
    //   flexDirection={"column"}
    //   justifyContent={"center"}
    //   alignItems={"center"}
    //   my={8}
    //   mx={8}
    // />
    <>
      {/* <div>All Doctors</div> */}
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              {headerName.map((el, i) => {
                return (
                  <Fragment key={i}>
                    <Th>{el}</Th>
                  </Fragment>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {/* <Tr> */}
            {/* <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td> */}
            {/* <DoctorDetail doctors={doctorDetail} /> */}
            {/* </Tr> */}
            {/* <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr> */}
            {mergedDoctors.map((el, i) => {
              return (
                <Tr
                  key={i}
                  color={i % 2 === 0 ? " #F5F5F5" : ""}
                  bg={i % 2 === 0 ? "#2977ff" : ""}
                >
                  <Td>{el.name}</Td>
                  <Td>{el.email}</Td>
                  <Td>{el.gender}</Td>
                  <Td>{el.age}</Td>
                  <Td>{el.phoneNumber}</Td>
                  <Td>{el.education}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
