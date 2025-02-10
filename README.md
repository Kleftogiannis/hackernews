# Search Autocomplete App

## Overview

This is a React application built with Vite that provides a search input with autocomplete functionality. As the user types, it queries an API and displays suggestions in a dropdown list. The user can select a suggestion to save it in a list below, where they can also remove saved items.

## Features

- **Search Input**: Users can enter text to search for items.
- **Autocomplete List**: Displays API results when the user types at least 3 characters.
- **Saved Items List**: Users can select an item from the autocomplete list to save it.
- **Delete Option**: Users can remove saved items.
- **Session Storage**: Saved items persist across sessions.

## Tech Stack

- React (with Vite)
- TypeScript
- Session Storage

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

## Project Structure

```
/src
  ├── components
  │   ├── SearchInput.tsx
  │   ├── AutoComplete.tsx
  │   ├── SavedStories.tsx
  │   ├── StoriesComponent.tsx
  ├── App.tsx
  ├── main.tsx
  ├── index.css
```

## How It Works

1. The user types in the search input.
2. After 3 characters, an API request is triggered.
3. The API results are displayed in an autocomplete dropdown.
4. The user clicks on a suggestion to save it in the list.
5. The user can remove saved items using the delete button.
6. The saved items persist in session storage.

## Testing

Unit tests are written using Vite's test framework (`vitest`). To run the tests:

```sh
npm run test
```

## Future Improvements

- Add debounce for API calls to reduce network requests.
- Implement caching for better performance.
- Enhance UI with animations or tailwind.
