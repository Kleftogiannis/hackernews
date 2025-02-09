import { Typography, Box, List, ListItem, Button } from "@mui/material";
import { Result } from "../App";
import StoriesComponent from "./StoriesComponent";

const SavedStories = ({
  savedItems,
  handleDelete,
}: {
  savedItems: Result[];
  handleDelete: (index: number) => void;
}) => {
  const style = {
    box: {
      margin: "50px 0",
      width: "600px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      textAlign: "center",
    },
    list: {
      margin: "0 auto",
      maxWidth: "600px",
      maxHeight: "600px",
      overflow: "auto",
    },
    listItem: { width: "600px", height: "100px", border: "1px solid" },
  };
  return (
    <Box sx={style.box}>
      <Typography variant="h6">Saved Stories</Typography>
      {savedItems.length > 0 && (
        <List style={style.list}>
          {savedItems.map((item: Result, index) => (
            <ListItem key={index} style={style.listItem}>
              <StoriesComponent
                title={item.title}
                author={item.author}
                num_comments={item.num_comments}
                points={item.points}
              />
              <Button onClick={() => handleDelete(index)} color={"error"}>
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
export default SavedStories;
