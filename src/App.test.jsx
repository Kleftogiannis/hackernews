import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./components/SearchInput";
import AutoComplete from "./components/AutoComplete";
import SavedStories from "./components/SavedStories";
import { vi } from "vitest";

describe("SearchInput Component", () => {
  test("renders input field", () => {
    render(<SearchInput searchTerm="" setSearchTerm={() => {}} fetchResults={() => {}} />);
    expect(screen.getByPlaceholderText("Search title...")).toBeInTheDocument();
  });

  test("calls fetchResults after typing 3 characters", () => {
    const fetchResultsMock = vi.fn();
    render(<SearchInput searchTerm="" setSearchTerm={() => {}} fetchResults={fetchResultsMock} />);
    fireEvent.change(screen.getByPlaceholderText("Search title..."), { target: { value: "tes" } });
    expect(fetchResultsMock).toHaveBeenCalled();
  });
});

describe("AutoComplete Component", () => {
  test("displays autocomplete results", () => {
    const results = [{ title: "Test Item 1" }, { title: "Test Item 2" }];
    render(<AutoComplete results={results} handleSelect={() => {}} />);
    results.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test("calls handleSelect when clicking an item", () => {
    const handleSelectMock = vi.fn();
    const results = [{ title: "Test Item" }];
    render(<AutoComplete results={results} handleSelect={handleSelectMock} />);
    fireEvent.click(screen.getByText("Test Item"));
    expect(handleSelectMock).toHaveBeenCalledWith(results[0]);
  });
});

describe("SavedStories Component", () => {
  test("displays saved items", () => {
    const savedItems = [{ title: "Saved Item 1" }, { title: "Saved Item 2" }];
    render(<SavedStories savedItems={savedItems} handleDelete={() => {}} />);
    savedItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test("removes item when delete button is clicked", () => {
    const handleDeleteMock = vi.fn();
    const savedItems = [{ title: "Saved Item" }];
    render(<SavedStories savedItems={savedItems} handleDelete={handleDeleteMock} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(handleDeleteMock).toHaveBeenCalledWith(0);
  });
});
