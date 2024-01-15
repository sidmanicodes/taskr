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
    onSubmit: (data, actions): void => {
      setName(data.name);
      setColor(data.color);
      console.log(data);
      alert(JSON.stringify(data, null, 2));
      actions.resetForm();
      actions.setSubmitting(false);
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Create new label</Button>

      <VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={formik.handleSubmit}>
              <ModalHeader>
                <FormControl>
                  <FormLabel>Label name</FormLabel>
                  <Input
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Enter a label name"
                  />
                </FormControl>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Color</FormLabel>
                  <Select
                    name="color"
                    onChange={formik.handleChange}
                    value={formik.values.color}
                    placeholder="Select a color"
                  >
                    {validColors.map((color) => (
                      <option key={color[1]} value={color[1]}>
                        {color[1]}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" colorScheme="purple" mr={3}>
                  Create label
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </VStack>
    </>
  );
};

export default CreateLabel;
