const SearchInput = ({
  searchTerm,
  setSearchTerm,
  fetchResults,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  fetchResults: (fetchValue: string) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div>Search</div>
      <input
        type="text"
        placeholder="Search title..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          fetchResults(e.target.value);
        }}
      />
    </div>
  );
};
export default SearchInput;
