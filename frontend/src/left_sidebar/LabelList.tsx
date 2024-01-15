import React from "react";
import { Label } from "../services/label-service";
import {
  List,
  ListItem,
  ListIcon,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { MdOutlineLabel } from "react-icons/md";

interface Props {
  labels: Label[];
}

const LabelList = ({ labels }: Props) => {
  return (
    <Container>
      <List spacing={3}>
        <Text as="b">
          <Icon as={MdOutlineLabel} />
          Labels
        </Text>
        {labels.map((label) => (
          <ListItem key={label._id}>
            <ListIcon as={TriangleDownIcon} color={label.color} />
            {label.name}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default LabelList;
