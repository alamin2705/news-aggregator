import React from 'react';
import SearchBar from '../components/SearchBar';

const Filters = ({ categories, sources, onFilterChange, onHandleSearch }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">

      <select
        onChange={(e) => onFilterChange('category', e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onFilterChange('source', e.target.value)}
        className="p-2 border rounded-md"
      >
        <option value="">All Sources</option>
        {sources.map((source) => (
          <option key={source.id} value={source.id}>
            {source.name}
          </option>
        ))}
      </select>

      <SearchBar onSearch={onHandleSearch} />
    </div>
  );
};

export default Filters;
