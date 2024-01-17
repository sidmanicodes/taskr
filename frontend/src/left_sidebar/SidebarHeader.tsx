import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdAddTask } from "react-icons/md";

const SidebarHeader = () => {
  return (
    <Container>
      <Text fontSize={"3xl"} padding={3}>
        <Icon as={MdAddTask} color="#9F7AEA" />
        TaskR
      </Text>
    </Container>
  );
};

export default SidebarHeader;
