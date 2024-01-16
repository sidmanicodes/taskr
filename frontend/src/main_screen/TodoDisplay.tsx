import useTodos from "../hooks/useTodos";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import todoService, { Todo } from "../services/todo-service";
import CreateLabel from "../left_sidebar/CreateLabel";
import TodoItem from "./TodoItem";
import useLabels from "../hooks/useLabels";
import { IoMdPricetag } from "react-icons/io";
import { Label } from "../services/label-service";

interface Props {
  labels: Label[];
}

const TodoDisplay = ({ labels }: Props) => {
  const { todos, error, isLoading, setTodos, setError } = useTodos();

  const createTodo = (newTodo: Todo) => {
    // Update UI
    const originalTodos = [...todos];
    setTodos([...todos, newTodo]);

    // Update server
    todoService
      .create(newTodo)
      .then(({ data: savedLabel }) => setTodos([...todos, savedLabel]))
      .catch((err) => {
        setError(err.message);
        setTodos(originalTodos);
        console.log("This is where things are going wrong");
      });
  };

  const editTodo = (newTodo: Todo) => {
    // Update UI
    const originalTodos = [...todos];
    setTodos(todos.map((todo) => (todo._id === newTodo._id ? newTodo : todo)));

    // Update server
    todoService
      .update({ ...newTodo, _id: String(newTodo._id) })
      .then(({ data: savedTodo }) =>
        setTodos(
          todos.map((todo) => (todo._id === savedTodo._id ? savedTodo : todo))
        )
      )
      .catch((err) => {
        setError(err.message);
        setTodos(originalTodos);
      });
  };

  const deleteTodo = (_id: string) => {
    // Update UI
    const originalTodos = [...todos];
    setTodos(todos.filter((todo) => todo._id !== _id));

    // Update server
    todoService.delete(_id).catch((err) => {
      setError(err.message);
      setTodos(originalTodos);
    });
  };

  return (
    <VStack align={"left"}>
      {labels.map((label) => (
        <Card key={label._id} variant={"transparant"}>
          <CardHeader>
            <Heading size={"s"}>
              <Icon as={IoMdPricetag} mr={3} color={label.color} />
              {label.name}
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing={3}>
              {todos &&
                todos
                  .filter((todo) => todo.label?._id === label?._id)
                  .map((todo) => (
                    <Box key={todo._id}>
                      <TodoItem
                        todo={todo}
                        onEdit={editTodo}
                        onDelete={deleteTodo}
                      />
                    </Box>
                  ))}
            </Stack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

export default TodoDisplay;
