import React, { FormEvent } from "react";
import { Label } from "../services/label-service";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import validColors from "../services/valid-colors";

interface Props {
  onDeleteLabel: (_id: string) => void;
  currentLabel: Label;
}

const DeleteLabel = ({ onDeleteLabel, currentLabel }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = () => {
    onDeleteLabel(currentLabel._id || "0");
    onClose;
  };
  return (
    <>
      <IconButton
        onClick={onOpen}
        variant={"ghost"}
        aria-label={"Delete button"}
        icon={<DeleteIcon />}
      />

      <VStack>
        <Modal isOpen={isOpen} onClose={handleDelete}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Are you sure you want to delete {currentLabel.name}?
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You won't be able to undo this action in beta mode
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleDelete} colorScheme="red" mr={3}>
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </>
  );
};

export default DeleteLabel;
