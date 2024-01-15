import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdAddTask } from "react-icons/md";

const SidebarHeader = () => {
  return (
    <Container>
      <Text fontSize={"3xl"} padding={3}>
        <Icon as={MdAddTask} color="green" />
        TaskR
      </Text>
    </Container>
  );
};

export default SidebarHeader;
