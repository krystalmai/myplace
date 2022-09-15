import { useFormContext, Controller } from "react-hook-form";
import { Checkbox as FCheckBox, FormControlLabel } from "@mui/material";

function Checkbox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <FCheckBox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}

export default Checkbox;