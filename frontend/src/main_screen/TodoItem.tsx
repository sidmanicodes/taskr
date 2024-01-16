import React from "react";
import { Todo } from "../services/todo-service";
import {
  Box,
  Checkbox,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";

interface Props {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (_id: string) => void;
}

const TodoItem = ({ todo, onEdit, onDelete }: Props) => {
  const completedTaskToast = useToast();
  return (
    <Box>
      <HStack spacing={4}>
        <Checkbox
          colorScheme="purple"
          onChange={() => {
            setTimeout(() => {
              onDelete(todo._id || "0");
              completedTaskToast({
                title: "Nice!",
                description: `"${todo.task}" has marked as complete`,
                status: "success",
                isClosable: true,
              });
            }, 800);
          }}
        />
        <Heading mt={1.5} size={"xs"}>
          {todo.task}
        </Heading>
        <Text mb={2} pt={2} fontSize={"sm"} as={"i"}>
          {todo.description}
        </Text>
      </HStack>
    </Box>
  );
};

export default TodoItem;