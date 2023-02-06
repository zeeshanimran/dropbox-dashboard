import FolderOffIcon from "@mui/icons-material/FolderOff";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
const NodataFoundUI: FC = () => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
    >
      <FolderOffIcon color="info" fontSize={"large"} />
      <Typography color={"gray"} fontSize={"40px"} fontWeight={700}>
        There are no Data currently.
      </Typography>
    </Box>
  );
};

export default NodataFoundUI;
