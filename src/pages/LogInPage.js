import React, { useState } from "react";

import {
  Checkbox,
  FormProvider,
  TextField,
  Password,
} from "../components/form";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Container, Stack } from "@mui/system";
import { Alert, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LogInPage() {
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Don't have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Alert>

          <TextField name="email" label="Email address" />
          <Password
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            name="password"
            label="Password"
            
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Checkbox name="remember" label="Remeber me" />
          <Link component={RouterLink} variant="subtitle2" to="/">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Log in
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default LogInPage;
