import { Result } from "../App";
import { Box, List, ListItem } from "@mui/material";
import StoriesComponent from "./StoriesComponent";

const AutoComplete = ({
  results,
  handleSelect,
}: {
  results: Result[];
  handleSelect: (item: Result) => void;
}) => {
  const style = {
    list: {
      margin: "0 auto",
      maxWidth: "600px",
      maxHeight: "600px",
      overflow: "auto",
    },
    listItem: { width: "600px", height: "100px", border: "1px solid" },
  };

  return (
    <Box>
      {results.length > 0 && (
        <List style={style.list}>
          {results.map((item: Result, index) => (
            <ListItem
              key={index}
              onClick={() => handleSelect(item)}
              style={style.listItem}
            >
              <StoriesComponent
                title={item.title}
                author={item.author}
                num_comments={item.num_comments}
                points={item.points}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AutoComplete;
