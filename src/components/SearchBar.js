import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="p-2 border rounded-l-md w-full"
      />
      <button
        onClick={handleSearchClick}
        disabled={!query.trim()} // Disable button if query is empty or only whitespace
        className={`p-2 rounded-r-md border border-blue-600 ${
          query.trim()
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
