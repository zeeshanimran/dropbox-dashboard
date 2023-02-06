import { Box } from "@mui/material";
import { FC } from "react";
import PostBox from "../components/PostBox";
import ViewPostBox from "../components/ViewPostBox";

const Home: FC = () => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDirection={"column"}
      mt={2}
    >
      <PostBox />
      <ViewPostBox />
    </Box>
  );
};

export default Home;
