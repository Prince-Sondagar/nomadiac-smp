// packages block
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material';
import { multiOptionType, SelectorInterface } from '../../interfaceTypes';

const Selector: FC<SelectorInterface> = ({ isDisabled, controllerName, controllerLabel, optionsArray }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={controllerName}
      control={control}
      render={({ field, fieldState: { invalid, error: { message } = {} } }) => {
        return (
          <FormControl variant="outlined" fullWidth error={Boolean(message)} margin="normal">
            <InputLabel id="selectedRoleLabel">{controllerLabel}</InputLabel>
            <Select
              name={controllerName}
              id="selectedRoleId"
              labelId="selectedRoleLabel"
              label={controllerLabel}
              onChange={field.onChange}
              disabled={isDisabled}
              value={field.value}
              displayEmpty
            >
              {optionsArray.map((option: multiOptionType, index) => (
                <MenuItem key={index} value={option?.value}>{option?.label}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{message && message}</FormHelperText>
          </FormControl>
        )
      }}
    />
  )
}

export default Selector;
