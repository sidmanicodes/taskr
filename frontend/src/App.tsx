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
          base: `"main" "main"`,
          lg: `"topl topm"
          "aside main"
           "aside mainf"`,
        }}
        templateRows={{
          lg: "100px 1fr 50px",
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
        gap={2}
      >
        <Show above="lg">
          {/* Sidebar header */}
          <GridItem area="topl" bg="blue" paddingX={4} paddingY={5}>
            <SidebarHeader />
          </GridItem>
          {/* Top middle header */}
          <GridItem area="topm" bg="green" />
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
        {/* Main screen */}
        <GridItem bg="red" area="main">
          <TodoDisplay labels={labels} />
        </GridItem>
        {/* Main screen footer */}
        <GridItem bg="orange" area="mainf"></GridItem>
      </Grid>
    </div>
  );
}

export default App;
