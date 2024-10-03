// packages block
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { FolderOpen } from "@mui/icons-material";

const NoDataFoundComponent: FC = (): JSX.Element => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Box color="#E3EEFA" fontSize={120} display="flex" alignItems="center">
      <FolderOpen fontSize="inherit" color="inherit" />
    </Box>

    <Box>
      <Typography component="h5" variant="h5">
        No data found
      </Typography>
    </Box>
  </Box>
)

export default NoDataFoundComponent;
