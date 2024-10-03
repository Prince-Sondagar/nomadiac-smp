// packages block
import { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, TextField } from "@mui/material";
// styles, constants, utils and interfaces block
import { CustomControlProps, PasswordType } from "../../interfaceTypes";
import ShowPassword from "./ShowPassword";
import { PASSWORD, TEXT } from "../../constants";

const CommonController: FC<CustomControlProps> = ({ controllerName, controllerLabel, fieldType, variant, isPassword, isDisabled, isMultiLine }): JSX.Element => {
  const { control } = useFormContext();
  const [passwordType, setPasswordType] = useState<PasswordType>(PASSWORD);

  const handleClickShowPassword = () => {
    if (passwordType === PASSWORD) {
      setPasswordType(TEXT);
    } else {
      setPasswordType(PASSWORD);
    }
  };

  return (
    <Box>
      <Controller
        rules={{
          required: true,
        }}
        name={controllerName}
        control={control}
        render={({ field, fieldState: { error: { message } = {} } }) => (
          <TextField
            type={fieldType === "password" ? passwordType : fieldType}
            variant={variant}
            sx={{ m: "8px 0" }}
            error={!!message}
            placeholder={controllerLabel}
            fullWidth
            {...field}
            disabled={isDisabled}
            maxRows={isMultiLine ? 4 : undefined}
            multiline={isMultiLine}
            helperText={message && message}
            InputProps={isPassword ? {
              endAdornment: <ShowPassword
                isPassword={isPassword}
                passwordType={passwordType}
                handleShowPassword={handleClickShowPassword}
              />,
            } : undefined}
          />
        )}
      />
    </Box>
  );
};

export default CommonController;
