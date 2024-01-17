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
import React from "react";
import validColors from "../services/valid-colors";
import { FormikProps } from "formik";

interface Props {
  formik: FormikProps<{ name: string; color: string }>;
  isOpen: boolean;
  onClose: () => void;
}

const CreateLabelCard = ({ formik, isOpen, onClose }: Props) => {
  return (
    <VStack>
      <Modal isOpen={isOpen} onClose={formik.handleSubmit}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>
              <FormControl
                isInvalid={!!formik.errors?.name && formik.touched.name}
              >
                <FormLabel>Label name</FormLabel>
                <Input
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  placeholder="Enter a label name"
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl
                isInvalid={!!formik.errors?.color && formik.touched.color}
              >
                <FormLabel>Color</FormLabel>
                <Select
                  name="color"
                  onChange={formik.handleChange}
                  value={formik.values.color}
                  onBlur={formik.handleBlur}
                  placeholder="Select a color"
                >
                  {validColors.map((color) => (
                    <option key={color[0]} value={color[0]}>
                      {color[1]}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{formik.errors.color}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="purple" mr={3}>
                Create label
              </Button>
              <Button
                onClick={() => {
                  formik.resetForm();
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default CreateLabelCard;
