import { Button, useDisclosure } from "@chakra-ui/react";
import todoService, { Todo } from "../services/todo-service";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { Label } from "../services/label-service";
import TodoForm from "../components/TodoForm";

interface Props {
  labels: Label[];
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setError: (err: string) => void;
}

const CreateTodoButton = ({ todos, labels, setTodos, setError }: Props) => {
  const createTodo = (newTodo: Todo) => {
    // Update UI
    const originalTodos = [...todos];
    setTodos([...todos, newTodo]);

    // Update server
    todoService
      .create(newTodo)
      .then(({ data: savedTodo }) => setTodos([...todos, savedTodo]))
      .catch((err) => {
        setError(err.message);
        setTodos(originalTodos);
        console.log("Error creating todo");
      });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dateStringRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  const labelIds = labels.map((label) => label?._id);

  return (
    <>
      <Button onClick={onOpen} variant={"ghost"}>
        <PlusSquareIcon mr={1} />
        Create new todo
      </Button>
      <Formik
        initialValues={{
          task: "",
          description: "",
          completed: false,
          dueDate: "",
          label: "",
        }}
        validationSchema={Yup.object({
          task: Yup.string()
            .required("Please enter a task name")
            .max(
              20,
              "Task name too long, please enter one shorter than 15 characters"
            ),
          description: Yup.string().max(
            100,
            "Please enter a description shorter than 100 characters"
          ),
          dueDate: Yup.string()
            .required("Please enter a due date")
            .matches(dateStringRegex, "Date much be in the form mm/dd/yyy"),
          label: Yup.string()
            .oneOf(labelIds, "Please enter an existing label")
            .required("Please enter a label"),
        })}
        onSubmit={(data, actions): void => {
          createTodo({
            task: data.task,
            description: data?.description,
            dueDate: new Date(data?.dueDate),
            completed: false,
            label: labels.find((label) => label._id === data?.label),
          });
          console.log(data);
          actions.setSubmitting(false);
          actions.resetForm();
          onClose();
        }}
      >
        {(formik) => (
          <TodoForm
            formik={formik}
            isOpen={isOpen}
            onClose={onClose}
            labels={labels}
          />
        )}
      </Formik>
    </>
  );
};

export default CreateTodoButton;
