import "./App.css";
import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import AutoComplete from "./components/AutoComplete";
import SavedStories from "./components/SavedStories";
export interface Result {
  title: string;
  author: string;
  num_comments: number;
  points: number;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [savedItems, setSavedItems] = useState<Result[]>(() => {
    const storedItems = sessionStorage.getItem("savedItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

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

  const handleSelect = (item: Result) => {
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
      <AutoComplete results={results} handleSelect={handleSelect} />
      <SavedStories savedItems={savedItems} handleDelete={handleDelete} />
    </>
  );
}

export default App;
