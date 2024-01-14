import React from "react";
import Display from "./left_sidebar/LeftSidebar";
import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <div>
      <Grid templateAreas={{ base: `"main"`, lg: `"aside main"` }}>
        <Show above="lg">
          <GridItem area="aside" bg="red">
            Aside
          </GridItem>
        </Show>
        <GridItem area="main" bg="blue">
          Main
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
