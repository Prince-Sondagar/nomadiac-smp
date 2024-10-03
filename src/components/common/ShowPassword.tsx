// packages block
import { FC } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
// constants and interfaces block
import { PASSWORD } from "../../constants";
import { ShowPasswordProps } from "../../interfaceTypes";

const ShowPassword: FC<ShowPasswordProps> = ({ isPassword, passwordType, handleShowPassword }) => (
  <InputAdornment position="end">
    {isPassword &&
      <IconButton onClick={handleShowPassword} color="secondary">
        {passwordType === PASSWORD ? <Visibility color="inherit" /> : <VisibilityOff color="inherit" />}
      </IconButton>
    }
  </InputAdornment>
);

export default ShowPassword;