import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalCloseButton,
  ModalBody,
  Select,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { Label } from "../services/label-service";

interface Props {
  formik: FormikProps<{
    task: string;
    description: string;
    completed: boolean;
    dueDate: string;
    label: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
  labels: Label[];
}

const TodoForm = ({ formik, isOpen, onClose, labels }: Props) => {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <VStack>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>
              <FormControl
                isInvalid={!!formik.errors?.task && formik.touched.task}
              >
                <FormLabel>Task name</FormLabel>
                <Input
                  {...formik.getFieldProps("task")}
                  name="task"
                  placeholder="Enter a task name"
                />
                <FormErrorMessage>{formik.errors.task}</FormErrorMessage>
              </FormControl>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  {...formik.getFieldProps("description")}
                  name="description"
                  placeholder="Enter a description"
                />
                <FormErrorMessage>
                  {formik.errors?.description}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!formik.errors.label && formik.touched.label}
              >
                <FormLabel>Select a label</FormLabel>
                <Select
                  {...formik.getFieldProps("label")}
                  name="label"
                  placeholder="Select a label"
                >
                  {labels.map((label) => (
                    <option value={label._id} key={label._id}>
                      {label.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{formik?.errors?.label}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!formik.errors.dueDate && formik.touched.dueDate}
              >
                <FormLabel>Enter a due date</FormLabel>
                <Input
                  size={"sm"}
                  {...formik.getFieldProps("dueDate")}
                  name="dueDate"
                  placeholder="MM/DD/YYY"
                />
                <FormErrorMessage>{formik.errors.dueDate}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="purple" mr={3}>
                Done
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default TodoForm;
