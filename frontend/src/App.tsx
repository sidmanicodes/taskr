import React from "react";
import LeftSidebar from "./left_sidebar/LeftSidebar";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import SidebarHeader from "./left_sidebar/SidebarHeader";
import TodoDisplay from "./main_screen/TodoDisplay";
import useLabels from "./hooks/useLabels";

function App() {
  const { labels, error, isLoading, setLabels, setError } = useLabels();

  return (
    <div>
      <Grid
        templateAreas={{
          base: `"mainh" "main" "mainf"`,
          lg: `"topl mainh"
          "aside main"
           "aside mainf"`,
        }}
        templateRows={{
          base: "100px 1fr 50px",
          lg: "100px 1fr 50px",
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
        height={"100vh"}
        gap={2}
      >
        <Show above="lg">
          {/* Sidebar header */}
          <GridItem area="topl" bg="blue" paddingX={4} paddingY={5}>
            <SidebarHeader />
          </GridItem>
          {/* Sidebar */}
          <GridItem area="aside" bg="grey" paddingX={13}>
            <LeftSidebar
              labels={labels}
              error={error}
              setLabels={setLabels}
              setError={setError}
            />
          </GridItem>
        </Show>
        {/* Top middle header */}
        <GridItem area="mainh" bg="green" />
        {/* Main screen */}
        <GridItem bg="red" area="main" overflowY={"auto"}>
          <TodoDisplay labels={labels} />
        </GridItem>
        {/* Main screen footer */}
        <GridItem bg="orange" area="mainf"></GridItem>
      </Grid>
    </div>
  );
}

export default App;
