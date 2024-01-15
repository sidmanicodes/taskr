import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Label } from "../services/label-service";
import { useFormik } from "formik";
import * as Yup from "yup";
import validColors from "../services/valid-colors";

interface Props {
  onEditLabel: (name: string, color: string, _id: string) => void;
  currentLabel: Label;
}

const EditLabel = ({ onEditLabel, currentLabel }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: currentLabel.name,
      color: currentLabel.color,
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
      onEditLabel(data.name, data.color, currentLabel?._id || "0");
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
      <IconButton
        onClick={onOpen}
        variant={"ghost"}
        aria-label={"Edit label"}
        icon={<EditIcon />}
      />
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
                    placeholder={currentLabel.name}
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
                  Edit label
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

export default EditLabel;
