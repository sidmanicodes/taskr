import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Todo } from "../services/todo-service";

interface Props {
  deleteTodo: (_id: string) => void;
  curTodo: Todo;
}

const DeleteTodoButton = ({ deleteTodo, curTodo }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = () => {
    deleteTodo(curTodo._id || "0");
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
              Are you sure you want to delete {curTodo.task}?
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You won't be able to undo this action in beta mode
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={handleDelete}
                colorScheme="purple"
                variant={"outline"}
                mr={3}
              >
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

export default DeleteTodoButton;
