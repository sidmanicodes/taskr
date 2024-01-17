import { Label } from "../services/label-service";
import {
  Text,
  Container,
  Flex,
  Spacer,
  Button,
  HStack,
  Box,
  VStack,
  StackDivider,
  Grid,
  GridItem,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import EditLabel from "./EditLabel";
import DeleteLabel from "./DeleteLabel";
import React from "react";

interface Props {
  labels: Label[];
  onEditLabel: (newLabel: Label) => void;
  onDeleteLabel: (_id: string) => void;
}

const LabelList = ({ labels, onEditLabel, onDeleteLabel }: Props) => {
  return (
    <>
      <Container borderRadius="lg" bg="#6d51c0" my={3} p={4}>
        <Text as="b" fontSize="large">
          <Icon as={BiCategoryAlt} mr={2} />
          Labels
        </Text>
      </Container>
      {/* <VStack spacing={2} align="center" justify="center" mx={3}>
        {labels.map(
          (label) =>
            label?._id && (
              <HStack
                key={label?._id}
                spacing={2}
                align="center"
                justify="center"
                w="100%"
              >
                <Button
                  variant="transparent"
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={IoMdPricetags} color={label.color} mr={4} />
                  <Spacer />
                  {label.name}
                </Button>
                <EditLabel onEditLabel={onEditLabel} currentLabel={label} />
                <DeleteLabel
                  onDeleteLabel={onDeleteLabel}
                  currentLabel={label}
                />
              </HStack>
            )
        )}
      </VStack> */}
      <SimpleGrid columns={3}>
        {labels.map(
          (label) =>
            label?._id && (
              <React.Fragment key={label._id}>
                <Box>
                  <Button
                    variant="transparent"
                    display="flex"
                    alignItems="center"
                  >
                    <Icon as={IoMdPricetags} color={label.color} mr={4} />
                    <Spacer />
                    {label.name}
                  </Button>
                </Box>
                <Box paddingX={10} ml={3}>
                  <EditLabel onEditLabel={onEditLabel} currentLabel={label} />
                </Box>
                <Box paddingX={5} ml={3}>
                  <DeleteLabel
                    onDeleteLabel={onDeleteLabel}
                    currentLabel={label}
                  />
                </Box>
              </React.Fragment>
            )
        )}
      </SimpleGrid>
    </>
  );
};

export default LabelList;
