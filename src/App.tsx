import "./App.css";
import { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import AutoComplete from "./components/AutoComplete";
import SavedStories from "./components/SavedStories";
import useDebounce from "./utils/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "./redux/searchSlice";
import { addSavedItem, removeSavedItem } from "./redux/savedSlice";
import { AppDispatch, RootState } from "./redux/store";

export interface Result {
  title: string;
  author: string;
  num_comments: number;
  points: number;
}
export interface ResultsWithID extends Result {
  objectID: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  // const [results, setResults] = useState<ResultsWithID[]>([]);
  // const [savedItems, setSavedItems] = useState<ResultsWithID[]>(() => {
  //   const storedItems = sessionStorage.getItem("savedItems");
  //   return storedItems ? JSON.parse(storedItems) : [];
  // });
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector((state: RootState) => state.search.results);
  const savedItems = useSelector((state: RootState) => state.saved.items);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      dispatch(fetchResults(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  // useEffect(() => {
  //   sessionStorage.setItem("savedItems", JSON.stringify(savedItems));
  // }, [savedItems]);

  // const handleSelect = (item: ResultsWithID) => {
  //   setSavedItems([...savedItems, item]);
  //   setSearchTerm("");
  //   setResults([]);
  // };

  // const handleDelete = (index: string) => {
  //   setSavedItems(
  //     savedItems.filter((item: ResultsWithID) => item.objectID !== index)
  //   );
  // };

  const handleSelect = (item: ResultsWithID) => {
    if (
      !savedItems.some(
        (saved: ResultsWithID) => saved.objectID === item.objectID
      )
    ) {
      dispatch(addSavedItem({ ...item, objectID: item.objectID }));
    }
    setSearchTerm("");
  };

  const handleDelete = (id: string) => {
    dispatch(removeSavedItem(id));
  };

  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        fetchResults={fetchResults}
      />
      <AutoComplete
        results={results}
        savedItems={savedItems}
        handleSelect={handleSelect}
      />
      <SavedStories savedItems={savedItems} handleDelete={handleDelete} />
    </>
  );
}

export default App;
