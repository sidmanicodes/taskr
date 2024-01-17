import { Label } from "../services/label-service";
import {
  Container,
  Spacer,
  Button,
  Box,
  SimpleGrid,
  Card,
  useColorMode,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { IoMdPricetags } from "react-icons/io";
import EditLabel from "./EditLabel";
import DeleteLabel from "./DeleteLabel";
import React from "react";
import CreateLabelButton from "./CreateLabelButton";
import LabelSkeleton from "../components/LabelSkeleton";

interface Props {
  labels: Label[];
  isLoading: boolean;
  onCreateLabel: (newLabel: Label) => void;
  onEditLabel: (newLabel: Label) => void;
  onDeleteLabel: (_id: string) => void;
}

const LabelList = ({
  labels,
  isLoading,
  onCreateLabel,
  onEditLabel,
  onDeleteLabel,
}: Props) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <CreateLabelButton onCreateLabel={onCreateLabel} />
      <Container>
        <Card
          variant={colorMode === "dark" ? "elevated" : "filled"}
          width={"100%"}
        >
          {isLoading &&
            labels.map((label) => (
              <LabelSkeleton key={label._id && label._id} />
            ))}
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
                      <EditLabel
                        onEditLabel={onEditLabel}
                        currentLabel={label}
                      />
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
        </Card>
      </Container>
    </>
  );
};

export default LabelList;
