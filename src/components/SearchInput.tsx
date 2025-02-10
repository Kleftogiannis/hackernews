import { Typography, Box, TextField } from "@mui/material";

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  fetchResults,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  fetchResults: (fetchValue: string) => void;
}) => {
  const style = {
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: "600px",
    },
  };

  return (
    <Box sx={style.box}>
      <Typography variant="h6" style={{ color: "black", fontWeight: "bold" }}>
        Search
      </Typography>
      <TextField
        style={{ width: "100%" }}
        type="text"
        placeholder="Search title..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          fetchResults(e.target.value);
        }}
      />
    </Box>
  );
};
export default SearchInput;
