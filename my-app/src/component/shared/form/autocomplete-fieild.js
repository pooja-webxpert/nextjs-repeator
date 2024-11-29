import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";

export default function AutocompleteTextField({
  name,
  InputProps,
  control,
  label,
  className,
  placeholder,
  errors,
  handleSearch,
  options,
}) {
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue={null} // Start with no selection
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            className={className}
            getOptionLabel={(option) => (option?.name ? option.name : "")}
            isOptionEqualToValue={(option, value) => option.id === value?.id} // Ensures correct value matching
            value={field.value || null} // Syncs selected value with Controller
            onChange={(event, newValue) => field.onChange(newValue)} // Update field value on selection
            renderInput={(params) => (
              <TextField
              onClick={handleSearch}
                {...params}
                label={label}
                placeholder={placeholder}
                InputProps={{
                  ...params.InputProps,
                  ...InputProps,
                }}
              />
            )}
          />
        )}
      />
    </FormControl>
  );
}
