import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Icon,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import todoService, { Todo } from "../services/todo-service";
import TodoItem from "./TodoItem";
import { IoMdPricetag } from "react-icons/io";
import { Label } from "../services/label-service";

interface Props {
  labels: Label[];
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setError: (err: string) => void;
}

const TodoDisplay = ({ labels, todos, setTodos, setError }: Props) => {
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
      {labels.map(
        (label) =>
          label && (
            <Card key={label._id} variant={"elevated"}>
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
                      .filter((todo) => todo.label?._id === label._id)
                      .map(
                        (todo) =>
                          todo?._id && (
                            <TodoItem
                              key={todo?._id}
                              todo={todo}
                              onEdit={editTodo}
                              onDelete={deleteTodo}
                            />
                          )
                      )}
                </Stack>
              </CardBody>
            </Card>
          )
      )}
    </VStack>
  );
};

export default TodoDisplay;
