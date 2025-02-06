import "./App.css";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  console.log(searchTerm);
  const fetchResults = async (searchTerm: string) => {
    if (searchTerm.length < 3) {
      setResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${searchTerm}`
      );
      const data = await response.json();
      setResults(data.hits);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };
  console.log(results);

  return (
    <>
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
    </>
  );
}

export default App;
