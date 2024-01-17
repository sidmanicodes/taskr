import React from "react";
import { Todo } from "../services/todo-service";
import {
  Badge,
  Box,
  Checkbox,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

interface Props {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (_id: string) => void;
}

const TodoItem = ({ todo, onEdit, onDelete }: Props) => {
  const completedTaskToast = useToast();
  const dueDate = new Date(todo.dueDate);
  return (
    <Stack direction={"column"}>
      <HStack spacing={4}>
        <Checkbox
          colorScheme="purple"
          onChange={() => {
            onEdit({ ...todo, completed: !todo.completed });
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
        <Text mb={2.5} pt={2} fontSize={"sm"} as={"i"}>
          {todo.description}
        </Text>
      </HStack>
      <HStack spacing={4}>
        <Badge ml={8} colorScheme="blue">
          <CalendarIcon mr={2} />
          {todo.dueDate &&
            `${dueDate.getMonth()}/${dueDate.getDate()}/${dueDate.getFullYear()}`}
        </Badge>
        {todo.completed && <Badge colorScheme="green">Completed</Badge>}
      </HStack>
    </Stack>
  );
};

export default TodoItem;
