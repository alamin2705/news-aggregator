import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="mb-6 flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="p-3 border border-gray-300 rounded-l-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <button
        onClick={handleSearchClick}
        disabled={!query.trim()}
        className={`p-3 rounded-r-full text-lg font-semibold transition-colors duration-300 ${
          query.trim()
            ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
