//-------------------BEFORE USING REDUX------------------

// import { render, screen, fireEvent } from "@testing-library/react";
// import SearchInput from "./components/SearchInput";
// import AutoComplete from "./components/AutoComplete";
// import SavedStories from "./components/SavedStories";
// import { vi } from "vitest";

// describe("SearchInput Component", () => {
//   test("renders input field", () => {
//     render(<SearchInput searchTerm="" setSearchTerm={() => {}} fetchResults={() => {}} />);
//     expect(screen.getByPlaceholderText("Search title...")).toBeInTheDocument();
//   });

//   test("calls fetchResults after typing 3 characters", () => {
//     const fetchResultsMock = vi.fn();
//     render(<SearchInput searchTerm="" setSearchTerm={() => {}} fetchResults={fetchResultsMock} />);
//     fireEvent.change(screen.getByPlaceholderText("Search title..."), { target: { value: "tes" } });
//     expect(fetchResultsMock).toHaveBeenCalled();
//   });
// });

// describe("AutoComplete Component", () => {
//   test("displays autocomplete results", () => {
//     const results = [{ title: "Test Item 1" }, { title: "Test Item 2" }];
//     render(<AutoComplete results={results} handleSelect={() => {}} />);
//     results.forEach((item) => {
//       expect(screen.getByText(item.title)).toBeInTheDocument();
//     });
//   });

//   test("calls handleSelect when clicking an item", () => {
//     const handleSelectMock = vi.fn();
//     const results = [{ title: "Test Item" }];
//     render(<AutoComplete results={results} handleSelect={handleSelectMock} />);
//     fireEvent.click(screen.getByText("Test Item"));
//     expect(handleSelectMock).toHaveBeenCalledWith(results[0]);
//   });
// });

// describe("SavedStories Component", () => {
//   test("displays saved items", () => {
//     const savedItems = [{ title: "Saved Item 1" }, { title: "Saved Item 2" }];
//     render(<SavedStories savedItems={savedItems} handleDelete={() => {}} />);
//     savedItems.forEach((item) => {
//       expect(screen.getByText(item.title)).toBeInTheDocument();
//     });
//   });

//   test("removes item when delete button is clicked", () => {
//     const handleDeleteMock = vi.fn();
//     const savedItems = [{ title: "Saved Item" }];
//     render(<SavedStories savedItems={savedItems} handleDelete={handleDeleteMock} />);
//     fireEvent.click(screen.getByText("Delete"));
//     expect(handleDeleteMock).toHaveBeenCalledWith(0);
//   });
// });

//-------------------AFTER USING REDUX------------------

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import savedReducer, { addSavedItem, removeSavedItem} from "./redux/savedSlice";
import searchReducer, { fetchResults } from "./redux/searchSlice"; 
import { vi } from "vitest";


const mockStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      search: searchReducer,
      saved: savedReducer,
    },
    preloadedState: {
      search: { results: [], status: "idle" }, 
      saved: { items: [] }, 
      ...preloadedState,
    },
  });

let testStore; 

describe("SearchComponent", () => {
  beforeEach(() => {
    testStore = mockStore({
      search: { results: [], status: "idle" },
      saved: { items: [] },
    });
  });

  test("renders search input", () => {
    render(
      <Provider store={testStore}>
        <App />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Search title...")).toBeInTheDocument();
  });

//   test("dispatches fetchResults when user types", async () => {
//     render(
//       <Provider store={testStore}>
//         <App />
//       </Provider>
//     );

//     const input = screen.getByPlaceholderText("Search title...");
//     fireEvent.change(input, { target: { value: "react" } });

//     await new Promise((resolve) => setTimeout(resolve, 500));

//     vi.spyOn(testStore, "dispatch");

//     expect(testStore.dispatch).toHaveBeenCalledWith(expect.objectContaining({
//       type: fetchResults().type, 
//       payload: 'react',
//     }));
// });
  test("does not allow duplicate saved items", () => {
    testStore = mockStore({
      search: { results: [{ title: "React", objectID: "1" }], status: "succeeded" },
      saved: { items: [{ title: "React", objectID: "1" }] },
    });

    vi.spyOn(testStore, "dispatch"); 

    render(
      <Provider store={testStore}>
        <App />
      </Provider>
    );

    const resultItem = screen.getByText("React");
    fireEvent.click(resultItem);

    expect(testStore.dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ objectID: "1" }));
  });

  test("removes item when delete button is clicked", () => {
    testStore = mockStore({
      saved: { items: [{ title: "React", objectID: "1" }] },
    });

    vi.spyOn(testStore, "dispatch"); 

    render(
      <Provider store={testStore}>
        <App />
      </Provider>
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(testStore.dispatch).toHaveBeenCalledWith(removeSavedItem("1"));
  });
});
