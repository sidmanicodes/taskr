import { EditIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import { Formik } from "formik";
import { Todo } from "../services/todo-service";
// import dateStringRegex from "../services/date-string-regex";
import * as Yup from "yup";
import { Label } from "../services/label-service";
import TodoForm from "../components/TodoForm";

interface Props {
  curTodo: Todo;
  editTodo: (todo: Todo) => void;
  labels: Label[];
}

const EditTodoButton = ({ curTodo, editTodo, labels }: Props) => {
  const labelIds = labels.map((label) => label?._id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dateStringRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  return (
    <>
      <Button onClick={onOpen} variant={"ghost"}>
        <EditIcon mr={1} />
      </Button>
      <Formik
        initialValues={{
          task: curTodo.task,
          description: curTodo?.description || "",
          completed: curTodo.completed,
          dueDate: curTodo.dueDate
            ? new Date(curTodo?.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "",
          label: curTodo.label?._id || "",
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
            .matches(dateStringRegex, "Date much be in the form mm/dd/yyyy"),
          label: Yup.string()
            .oneOf(labelIds, "Please enter an existing label")
            .required("Please enter a label"),
        })}
        onSubmit={(data, actions): void => {
          editTodo({
            task: data.task,
            description: data?.description,
            dueDate: new Date(data?.dueDate),
            completed: false,
            label: labels.find((label) => label._id === data?.label),
            _id: curTodo?._id || "0",
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

export default EditTodoButton;
