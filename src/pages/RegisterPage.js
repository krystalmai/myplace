import React, { useState } from "react";
import {
  FormProvider,
  TextField,
  Password,
} from "../components/form";

import { Container, Stack } from "@mui/system";
import { Alert, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LoadingButton } from "@mui/lab";


const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};


function RegisterPage() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  
  const navigate = useNavigate()

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    
    defaultValues,
  });
  
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      await auth.register({ name, email, password }, () => {
        navigate("/", {replace: true})
      })
    } catch (error) {
      reset();
      setError("responseError", error)
    }
  }

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
        {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Already have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Sign in
            </Link>
          </Alert>
          <TextField name="name" label="Fullname" />
          <TextField name="email" label="Email address" />
          <Password
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            name="password"
            label="Password"
          />
          <Password
            showPassword={showPasswordConfirmation}
            setShowPassword={setShowPasswordConfirmation}
            name="passwordConfirmation"
            label="Confirm password"
          />
          <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  )
}

export default RegisterPage;
