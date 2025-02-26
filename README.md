# Search Autocomplete App

## Overview

This is a search autocomplete application built with React,TypeScript Vite, and Redux. The app fetches search results from an API as the user types and displays them in an autocomplete list. Users can save selected results and manage them within the UI.

## Features

Debounced Search: Fetch results only after the user has stopped typing for better performance.

Autocomplete Suggestions: Shows dynamic search results after entering at least 3 characters.

Save & Remove Items: Users can select and save items, which are managed in Redux state.

Duplicate Prevention: Ensures that saved items are not duplicated.

State Management: Uses Redux for global state management.

## Tech Stack

- React (with Vite)
- TypeScript
- Redux

## Project Structure

📦 src
┣ 📂 components
┃ ┣ 📜 SearchInput.tsx
┃ ┣ 📜 AutocompleteList.tsx
┃ ┣ 📜 SavedItemsList.tsx
┃ ┗ 📜 SearchComponent.tsx
┣ 📂 redux
┃ ┣ 📜 store.ts
┃ ┣ 📜 searchSlice.ts
┃ ┗ 📜 savedSlice.ts
┣ 📜 main.tsx
┣ 📜 App.tsx

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Kleftogiannis/hackernews.git
   cd hacker-news
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## How It Works

1. The user types in the search input.
2. After 3 characters, an API request is triggered.
3. The API results are displayed in an autocomplete dropdown.
4. The user clicks on a suggestion to save it in the list.
5. The user can remove saved items using the delete button.
6. The saved items persist in redux store.

## Redux State management

- searchSlice.ts handles search results and API fetching.

- savedSlice.ts manages saved items and prevents duplicates.

- store.ts configures the Redux store.

## Testing

Unit tests are written using Vite's test framework (`vitest`). To run the tests:

```sh
npm run test
```

## Future Improvements

- Enhance UI with animations or tailwind.
