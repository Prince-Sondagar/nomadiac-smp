// packages block
import React, { FC, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
// components block
import Header from "./Header";
import CopyRight from "./CopyRight";
// interfaces/types and main layout styles block
import { AppBarSpacer, HeroMain } from "../../theme/styleComponents";
import { ChildrenType } from "../../interfaceTypes";

const MainLayout: FC<ChildrenType> = ({ children, setToggle }) => {
  const [openCustomDrawer] = useState<string>("true");

  return (
    <HeroMain>
      <CssBaseline />
      <Header setToggle={setToggle} openCustomDrawer={openCustomDrawer} />
      <Box component="main" flexGrow={1} height='100vh' overflow='auto'>
        <AppBarSpacer />
        <Box p={3}>
          <Box minHeight="calc(100vh - 230px)">
            {children}
          </Box>
          <Box pt={4}>
            <CopyRight />
          </Box>
        </Box>
      </Box>
    </HeroMain>
  );
};

export default MainLayout;
