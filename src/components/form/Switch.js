import { useFormContext, Controller } from "react-hook-form";
import { Switch as FSwitch, FormControlLabel } from "@mui/material";

function Switch({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <FSwitch {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}

export default Switch;