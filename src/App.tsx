import "./App.css";
import { useState } from "react";
import SearchInput from "./components/SearchInput";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [savedItems, setSavedItems] = useState<
    { title: string; author: string; num_comments: number; points: number }[]
  >([]);

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

  const handleSelect = (item: {
    title: string;
    author: string;
    num_comments: number;
    points: number;
  }) => {
    setSavedItems([...savedItems, item]);
    setSearchTerm("");
    setResults([]);
  };

  const handleDelete = (index: number) => {
    setSavedItems(savedItems.filter((_, i) => i !== index));
  };

  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fetchResults={fetchResults}
      />
      {results.length > 0 && (
        <ul>
          {results.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item.title} {item.author} {item.num_comments} {item.points}
            </li>
          ))}
        </ul>
      )}

      <div>
        <h3>Saved Stories</h3>
        {savedItems.map((item, index) => (
          <div key={index}>
            <span>
              {item.title} {item.author} {item.num_comments} {item.points}
            </span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
