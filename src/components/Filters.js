import React from 'react';

const Filters = ({ categories, sources, onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative w-full sm:w-1/2">
        <select
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-500 px-4 py-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 12l-4-4h8l-4 4z"/>
          </svg>
        </div>
      </div>

      <div className="relative w-full sm:w-1/2">
        <select
          onChange={(e) => onFilterChange('source', e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-500 px-4 py-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
        >
          <option value="">All Sources</option>
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 12l-4-4h8l-4 4z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Filters;
