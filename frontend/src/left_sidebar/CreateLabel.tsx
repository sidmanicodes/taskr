import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  setName: (name: string) => void;
  setColor: (color: string) => void;
}

const CreateLabel = ({ setName, setColor }: Props) => {
  const validColors = [
    ["#FFA07A", "Light Salmon"],
    ["#87CEEB", "Sky Blue"],
    ["#DA70D6", "Orchid"],
    ["#00CED1", "Dark Turquoise"],
    ["#FFD700", "Gold"],
    ["#20B2AA", "Light Sea Green"],
    ["#FF6347", "Tomato"],
    ["#8A2BE2", "Blue Violet"],
    ["#A0522D", "Sienna"],
    ["#4682B4", "Steel Blue"],
  ];
  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Please enter a label name")
        .max(
          15,
          "Label name too long, please enter one shorter than 15 characters"
        ),
      color: Yup.string().required("Please choose a label color"),
    }),
    onSubmit: (data, actions): void => {
      setName(data.name);
      setColor(data.color);
      console.log(data);
      actions.resetForm();
      actions.setSubmitting(false);
      handleClose();
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Create new label</Button>

      <VStack>
        <Modal isOpen={isOpen} onClose={handleClose}>
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
                <Button onClick={handleClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </VStack>
    </>
  );
};

export default CreateLabel;
