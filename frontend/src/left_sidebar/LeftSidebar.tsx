import React, { useState } from "react";
import useLabels from "../hooks/useLabels";
import LabelList from "./LabelList";
import { Container, VStack } from "@chakra-ui/react";
import CreateLabel from "./CreateLabel";

const Display = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const { labels, error, isLoading, setLabels, setError } = useLabels();

  return (
    <VStack>
      <LabelList labels={labels} />
      <CreateLabel setName={setName} setColor={setColor} />
    </VStack>
  );
};

export default Display;
