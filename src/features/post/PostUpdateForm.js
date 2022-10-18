import React, { useCallback } from "react";
import { FormProvider, TextField, FUploadImage } from "../../components/form";
import { Card, Stack, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editPost } from "../post/postSlice";
import { useNavigate, useParams } from "react-router-dom";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

function PostUpdateForm() {
  let { postId } = useParams();

  let post = useSelector((state) => state.post.postsById[postId]);

  const defaultValues = {
    content: post.content,
    image: post.image,
  };
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
    dispatch(editPost({ postId, ...data })).then(() => reset());
    navigate("/");
  };

  return (
    <Card sx={{ p: 3, width: '80vw', maxWidth: '1200px', mx: 'auto' }}>
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

export default PostUpdateForm;
