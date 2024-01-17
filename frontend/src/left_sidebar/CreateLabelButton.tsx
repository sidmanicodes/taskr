import { Button, Container, Icon, useDisclosure, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Label } from "../services/label-service";
import CreateLabelCard from "./CreateLabelCard";
import { BiCategoryAlt } from "react-icons/bi";

interface Props {
  onCreateLabel: (newLabel: Label) => void;
}

const CreateLabelButton = ({ onCreateLabel }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container borderRadius="lg">
        <Button
          width={"100%"}
          onClick={onOpen}
          variant={"outline"}
          colorScheme="purple"
        >
          <PlusSquareIcon mr={1} />
          Create new label
        </Button>
      </Container>
      <Formik
        initialValues={{
          name: "",
          color: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Please enter a label name")
            .max(
              15,
              "Label name too long, please enter one shorter than 15 characters"
            ),
          color: Yup.string().required("Please choose a label color"),
        })}
        onSubmit={(data, actions): void => {
          onCreateLabel({ name: data.name, color: data.color });
          console.log(data);
          actions.setSubmitting(false);
          actions.resetForm();
          onClose();
        }}
      >
        {(formik) => (
          <CreateLabelCard formik={formik} isOpen={isOpen} onClose={onClose} />
        )}
      </Formik>
    </>
  );
};

export default CreateLabelButton;
