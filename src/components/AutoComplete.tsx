import { ResultsWithID } from "../App";
import { Box, List, ListItem } from "@mui/material";
import StoriesComponent from "./StoriesComponent";
import { v4 as uuidv4 } from "uuid";

const AutoComplete = ({
  savedItems,
  results,
  handleSelect,
}: {
  savedItems: ResultsWithID[];
  results: ResultsWithID[];
  handleSelect: (item: ResultsWithID) => void;
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
          {results
            .filter(
              (item: ResultsWithID) =>
                !savedItems.some((saved) => saved.objectID === item.objectID)
            )
            .map(
              (item: ResultsWithID) =>
                item.title && (
                  <ListItem
                    key={item.objectID || uuidv4()}
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
                )
            )}
        </List>
      )}
    </Box>
  );
};

export default AutoComplete;
