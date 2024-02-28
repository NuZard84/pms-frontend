import { Tab, TabList, TabPanel, Tabs, TabPanels } from "@chakra-ui/react";

export default function TabBar() {
  return (
    <Tabs>
      <TabList>
        <Tab>All Patients</Tab>
        <Tab>Patient Profile</Tab>
        <Tab>Edit Patient</Tab>
        <Tab>Add Patient</Tab>
      </TabList>
    </Tabs>
  );
}
