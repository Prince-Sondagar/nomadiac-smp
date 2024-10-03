// packages block
import { FC } from "react";
import { Box, colors } from "@mui/material";
// interfaces/types and main layout styles block
import { ActionLayoutType } from "../../interfaceTypes";

const ActionLayout: FC<ActionLayoutType> = ({ children, hasBorder }): JSX.Element => {
  return (
    <Box borderBottom={hasBorder ? `1px solid ${colors.grey[300]}` : 'none'} marginBottom={hasBorder ? 1 : 0}>
      <Box p={hasBorder ? "0px 0 20px" : "0px 0 0"}>
        {children}
      </Box>
    </Box>
  );
};

export default ActionLayout;
