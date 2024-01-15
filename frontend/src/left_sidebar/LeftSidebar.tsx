import useLabels from "../hooks/useLabels";
import LabelList from "./LabelList";
import { Text, VStack } from "@chakra-ui/react";
import CreateLabel from "./CreateLabel";
import labelService from "../services/label-service";

const Display = () => {
  // const [name, setName] = useState("");
  // const [color, setColor] = useState("");
  const { labels, error, isLoading, setLabels, setError } = useLabels();

  const createLabel = (name: string, color: string) => {
    // Update UI
    const originalLabels = [...labels];
    const newLabel = { name: name, color: color, _id: "0" };
    setLabels([...labels, newLabel]);

    // Update server
    labelService
      .create(newLabel)
      .then(({ data: savedLabel }) => setLabels([...labels, savedLabel]))
      .catch((err) => {
        setError(err.message);
        setLabels(originalLabels);
      });
  };

  const editLabel = (name: string, color: string, _id: string) => {
    // Update UI
    const originalLabels = [...labels];
    const newLabel = { name: name, color: color, _id: _id };
    setLabels(
      labels.map((label) => (label._id === newLabel._id ? newLabel : label))
    );

    // Update server
    labelService
      .update(newLabel)
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

  return (
    <VStack>
      <LabelList onEditLabel={editLabel} labels={labels} />
      <CreateLabel onCreateLabel={createLabel} />
      <Text>{error}</Text>
    </VStack>
  );
};

export default Display;
