import { Label } from "../services/label-service";
import {
  Text,
  Container,
  Flex,
  Spacer,
  Button,
  HStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import EditLabel from "./EditLabel";

interface Props {
  labels: Label[];
  onEditLabel: (name: string, color: string, _id: string) => void;
}

const LabelList = ({ labels, onEditLabel }: Props) => {
  return (
    <Container>
      <Container borderRadius={"lg"} bg="#6d51c0" my={3}>
        <Text as="b" fontSize={"large"}>
          <Icon as={BiCategoryAlt} mr={2} />
          Labels
        </Text>
      </Container>
      <Flex direction={"column"} align={"center"}>
        {labels.map((label) => (
          <HStack key={label._id} align={"center"} justify={"center"}>
            <Button variant={"transparent"} display="flex" alignItems="center">
              <Icon as={IoMdPricetags} color={label.color} mr={4} />
              <Spacer />
              {label.name}
            </Button>
            {/* <Spacer /> */}
            <EditLabel onEditLabel={onEditLabel} currentLabel={label} />
            {/* <Spacer /> */}
            <DeleteIcon />
          </HStack>
        ))}
      </Flex>
    </Container>
  );
};

export default LabelList;
