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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import EditLabel from "./EditLabel";
import DeleteLabel from "./DeleteLabel";

interface Props {
  labels: Label[];
  onEditLabel: (newLabel: Label) => void;
  onDeleteLabel: (_id: string) => void;
}

const LabelList = ({ labels, onEditLabel, onDeleteLabel }: Props) => {
  return (
    <>
      <Container borderRadius={"lg"} bg="#6d51c0" my={3}>
        <Text as="b" fontSize={"large"}>
          <Icon as={BiCategoryAlt} mr={2} />
          Labels
        </Text>
      </Container>
      <Container mx={3}>
        <VStack
          divider={<StackDivider />}
          spacing={2}
          align={"center"}
          justify={"center"}
          flex={1}
        >
          {labels.map(
            (label) =>
              label?._id && (
                <HStack
                  divider={<StackDivider />}
                  spacing={2}
                  key={label?._id}
                  align={"center"}
                  justify={"center"}
                  flex={5}
                >
                  <Button
                    variant={"transparent"}
                    display="flex"
                    alignItems="center"
                    flex={5}
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
        </VStack>
      </Container>
    </>
  );
};

export default LabelList;
