import useLabels from "../hooks/useLabels";
import LabelList from "./LabelList";
import { Text, VStack } from "@chakra-ui/react";
import CreateLabelButton from "./CreateLabelButton";
import labelService, { Label } from "../services/label-service";

interface Props {
  labels: Label[];
  error: string;
  setLabels: (labels: Label[]) => void;
  setError: (err: string) => void;
}

const LeftSidebar = ({ labels, error, setLabels, setError }: Props) => {
  // const [name, setName] = useState("");
  // const [color, setColor] = useState("");
  // const { labels, error, isLoading, setLabels, setError } = useLabels();

  const createLabel = (newLabel: Label) => {
    // Update UI
    const originalLabels = [...labels];
    setLabels([...labels, newLabel]);

    // Update server
    labelService
      .create(newLabel)
      .then(({ data: savedLabel }) => setLabels([...labels, savedLabel]))
      .catch((err) => {
        setError(err.message);
        setLabels(originalLabels);
        console.log("This is where things are going wrong");
      });
  };

  const editLabel = (newLabel: Label) => {
    // Update UI
    const originalLabels = [...labels];
    const updatedLabel = { ...newLabel, _id: newLabel._id || "0" };
    setLabels(
      labels.map((label) => (label._id === newLabel._id ? newLabel : label))
    );

    // Update server
    labelService
      .update(updatedLabel)
      .then(({ data: savedLabel }) =>
        setLabels(
          labels.map((label) =>
            label._id === savedLabel._id ? savedLabel : label
          )
        )
      )
      .catch((err) => {
        setError(err.message);
        setLabels(originalLabels);
      });
  };

  const deleteLabel = (_id: string) => {
    // Update UI
    const originalLabels = [...labels];
    setLabels(labels.filter((label) => label._id !== _id));

    // Update server
    labelService.delete(_id).catch((err) => {
      setError(err.message);
      setLabels(originalLabels);
    });
  };

  return (
    <VStack>
      <LabelList
        onCreateLabel={createLabel}
        onEditLabel={editLabel}
        onDeleteLabel={deleteLabel}
        labels={labels}
      />
      {/* <CreateLabelButton onCreateLabel={createLabel} /> */}
      <Text>{error}</Text>
    </VStack>
  );
};

export default LeftSidebar;
