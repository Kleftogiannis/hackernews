import { Box, Typography } from "@mui/material";
import { Result } from "../App";

const StoriesComponent = ({ title, author, num_comments, points }: Result) => {
  const style = {
    box: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  };

  return (
    <Box sx={style.box}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle1" sx={{ textAlign: "start" }}>
        {points} points | by {author} | {num_comments} comments
      </Typography>
    </Box>
  );
};
export default StoriesComponent;
