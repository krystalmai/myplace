import { useFormContext, Controller } from "react-hook-form";
import {
  IconButton,
  InputAdornment,
  TextField as FTextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// parent component need to declare [showPassword, setShowPassword] = useState(false) and pass to Password

function Password({ showPassword, setShowPassword, name, label }) {
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
          label={label}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

export default Password;
