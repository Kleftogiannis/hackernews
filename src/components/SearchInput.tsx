import { Typography, Box } from "@mui/material";

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
      <Typography variant="h6">Search</Typography>
      <input
        style={{ width: "100%", height: "50px" }}
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
