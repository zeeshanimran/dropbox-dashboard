import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deletePost, getPictures } from "../APIServices/postAPIs";
import { IPostDetails } from "../interfacesTypes";
import NodataFoundUI from "./NoDataFound";
import SnackBar from "./SnackBarComponent";

const getAllPictures = async () => {
  const { data } = await getPictures();
  return data.data;
};
const ViewPostBox: FC = () => {
  const { data: getPostData, isLoading } = useQuery<IPostDetails[]>(
    ["fetchPost"],
    () => getAllPictures()
  );
  const queryClient = useQueryClient();

  const { mutate, isLoading: deletePostLoader } = useMutation(deletePost, {
    onSuccess: (response) => {
      if (response) {
        queryClient.invalidateQueries("fetchPost");
        SnackBar.success("Deleted successfully");
      }
    },
  });
  return (
    <Box width={"100%"}>
      <Typography fontSize={"20px"} fontWeight={"700"} marginBottom={2}>
        Photos
      </Typography>
      {!isLoading && getPostData?.length === 0 ? <NodataFoundUI /> : null}
      <Grid container wrap="nowrap">
        {(isLoading || deletePostLoader
          ? Array.from(new Array(3))
          : getPostData!
        )?.map((item: IPostDetails, index) => (
          <Box key={index} sx={{ width: 410, marginRight: 0.5, my: 5 }}>
            {item ? (
              <img
                style={{ width: 310, height: 199 }}
                alt={item.name}
                src={`http://localhost:4200${item?.path}`}
              />
            ) : (
              <Skeleton variant="rectangular" width={310} height={199} />
            )}
            {item ? (
              <Box sx={{ pr: 2 }}>
                <Typography gutterBottom variant="body2">
                  Name: {item.name}
                </Typography>
                <Typography
                  display="block"
                  variant="caption"
                  color="text.secondary"
                >
                  Created at: {moment(item.createdAt).format("L")}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Updated at: {moment(item.createdAt).fromNow()}
                </Typography>
                <Box>
                  <Button
                    onClick={() => {
                      mutate(item._id);
                    }}
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewPostBox;
