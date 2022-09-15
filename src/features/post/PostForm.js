import React, { useCallback } from "react";
import { FormProvider, TextField, FUploadImage } from "../../components/form";
import { Card, Stack, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createPost } from "../post/postSlice";
import { useNavigate } from "react-router-dom";


const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: "",
};

function PostForm() {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);

  const navigate = useNavigate();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );


  const onSubmit = (data) => {
    dispatch(createPost(data)).then(() => reset());
    navigate("/");
  } 

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            name="content"
            multiline
            rows={4}
            placeholder="What are you thinking..."
            sx={{
              "& fieldset": {
                borderWidth: "2px !important",
                borderColor: "primary",
              },
            }}
          />
            <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
