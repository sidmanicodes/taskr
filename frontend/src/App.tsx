import React from "react";
import LeftSidebar from "./left_sidebar/LeftSidebar";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import SidebarHeader from "./left_sidebar/SidebarHeader";

function App() {
  return (
    <div>
      <Grid
        templateAreas={{
          base: `"main" "main"`,
          lg: `"topl topm"
          "aside main"
           "aside main"`,
        }}
        templateRows={{
          lg: "100px 1fr 10px",
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="topl" bg="blue" paddingX={4} paddingY={5}>
            <SidebarHeader />
          </GridItem>
          <GridItem area="topm" bg="green" />
          <GridItem area="aside" bg="grey" paddingX={13}>
            <LeftSidebar />
          </GridItem>
        </Show>
        <GridItem bg="red" area="main">
          Main
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
