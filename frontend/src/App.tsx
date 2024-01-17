import LeftSidebar from "./left_sidebar/LeftSidebar";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import SidebarHeader from "./left_sidebar/SidebarHeader";
import TodoDisplay from "./main_screen/TodoDisplay";
import useLabels from "./hooks/useLabels";
import useTodos from "./hooks/useTodos";
import CreateTodoButton from "./footer/CreateTodoButton";
import ColorSwitch from "./left_footer/ColorSwitch";

function App() {
  const {
    labels,
    error: labelError,
    isLoading: isLabelLoading,
    setLabels,
    setError: setLabelError,
  } = useLabels();
  const {
    todos,
    // error: todoError,
    // isLoading: isTodoLoading,
    setTodos,
    setError: setTodoError,
  } = useTodos();

  return (
    <div>
      <Grid
        templateAreas={{
          base: `"mainh" "main" "mainf"`,
          lg: `"topl mainh"
          "aside main"
           "asidef mainf"`,
        }}
        templateRows={{
          base: "100px 1fr 50px",
          lg: "100px 1fr 150px",
        }}
        templateColumns={{
          base: "1fr",
          lg: "300px 1fr",
        }}
        height={"100vh"}
        gap={2}
      >
        <Show above="lg">
          {/* Sidebar header */}
          <GridItem area="topl" paddingX={4} paddingY={5}>
            <SidebarHeader />
          </GridItem>
          {/* Sidebar */}
          <GridItem area="aside" paddingX={13}>
            <LeftSidebar
              labels={labels}
              error={labelError}
              isLoading={isLabelLoading}
              setLabels={setLabels}
              setError={setLabelError}
            />
          </GridItem>
          {/* Left footer */}
          <GridItem
            area="asidef"
            display={"flex"}
            alignItems={"center"}
            paddingX={10}
            paddingY={10}
          >
            <ColorSwitch />
          </GridItem>
        </Show>
        {/* Top middle header */}
        <GridItem area="mainh" />
        {/* Main screen */}
        <GridItem area="main" overflowY={"auto"}>
          <TodoDisplay
            labels={labels}
            todos={todos}
            setTodos={setTodos}
            setError={setTodoError}
          />
        </GridItem>
        {/* Main screen footer */}
        <GridItem
          area="mainf"
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          paddingX={5}
        >
          <CreateTodoButton
            labels={labels}
            todos={todos}
            setTodos={setTodos}
            setError={setTodoError}
          />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
