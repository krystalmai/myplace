import { useFormContext, Controller } from "react-hook-form";
import { TextField as FTextField } from "@mui/material";

function TextField({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FTextField
          variant="outlined"
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default TextField;
