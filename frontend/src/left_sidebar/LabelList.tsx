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
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import EditLabel from "./EditLabel";
import DeleteLabel from "./DeleteLabel";

interface Props {
  labels: Label[];
  onEditLabel: (name: string, color: string, _id: string) => void;
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
      <VStack>
        {labels.map((label) => (
          <HStack key={label._id}>
            <Button
              variant={"transparent"}
              display="flex"
              alignItems="center"
              flex={1}
            >
              <Icon as={IoMdPricetags} color={label.color} mr={4} />
              <Spacer />
              {label.name}
            </Button>
            <EditLabel onEditLabel={onEditLabel} currentLabel={label} />
            <DeleteLabel onDeleteLabel={onDeleteLabel} currentLabel={label} />
          </HStack>
        ))}
      </VStack>
    </>
  );
};

export default LabelList;
