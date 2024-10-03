//packages block
import { FC } from "react";
import { useSnackbar, VariantType, WithSnackbarProps } from "notistack";
import { IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
//interface block
import { CloseSnackbarProps } from "../../interfaceTypes";

let useSnackbarRef: WithSnackbarProps;

export const SnackbarUtilsConfiguration: FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const CloseButton: FC<CloseSnackbarProps> = ({ id }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      color="inherit"
      size="small"
      onClick={() => closeSnackbar(id)}
    >
      <Close fontSize="small" />
    </IconButton>
  );
};

export const Alert = {
  success(message: string) {
    this.toast(message, "success");
  },
  warning(message: string) {
    this.toast(message, "warning");
  },
  info(message: string) {
    this.toast(message, "info");
  },
  error(message: string) {
    this.toast(message, "error");
  },
  toast(message: string, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(message, { variant });
  },
};
