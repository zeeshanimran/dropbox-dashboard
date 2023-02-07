import axios from "..";

export const createPost = async (data: any) => {
  return await axios.post("/files", data, {
    headers: {
      accept: "application/json",
    },
  });
};

export const getPictures = async () => {
  return await axios.get(`/files`);
};

export const deletePost = async (postId: string) => {
  return await axios.delete(`/files/${postId}`);
};
