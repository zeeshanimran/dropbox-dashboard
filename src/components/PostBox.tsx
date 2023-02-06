import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createPost } from "../APIServices/postAPIs";
import SnackBar from "./SnackBarComponent";
const PostBox: FC = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createPost, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("fetchPost");
        SnackBar.success("Posted successfully");
      }
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      mutate(formData);
    }
  };
  return (
    <Button
      variant="contained"
      color="primary"
      aria-label="upload picture"
      component="label"
    >
      <input onChange={handleFileChange} hidden accept="image/*" type="file" />
      Upload <AddPhotoAlternateIcon />
    </Button>
  );
};

export default PostBox;
