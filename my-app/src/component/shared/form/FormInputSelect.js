import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
  value,
  name,
  control,
  label,
  options,
  errors,
  defaultValue,
  className
}) => {
  return (
    <>
      <FormControl fullWidth className={className} error={!!errors?.[name]}>
        <InputLabel>{label}</InputLabel>
        <Controller
          name={name} 
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <Select
            value={value}
              label={label}
              id={name}
              {...field}
            >
              {options?.map((option,index) => (
                <MenuItem key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </MenuItem>
              
              ))}
            </Select>
          )}
        />
        {errors?.[name] && (
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default FormInputSelect;
