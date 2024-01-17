import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

const ColorSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        mb={3}
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        colorScheme="purple"
      />
      {colorMode === "dark" ? (
        <Text>Switch to light mode</Text>
      ) : (
        <Text>Switch to dark mode</Text>
      )}
    </HStack>
  );
};

export default ColorSwitch;
