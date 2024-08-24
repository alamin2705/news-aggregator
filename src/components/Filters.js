import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Filters = ({ categories, sources, onFilterChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (date, type) => {
    if (type === 'start') {
      setStartDate(date);
      onFilterChange('startDate', date ? date.toISOString().split('T')[0] : '');
    } else {
      setEndDate(date);
      onFilterChange('endDate', date ? date.toISOString().split('T')[0] : '');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative w-full sm:w-1/4">
        <select
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-500 px-4 py-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 12l-4-4h8l-4 4z"/>
          </svg>
        </div>
      </div>

      <div className="relative w-full sm:w-1/4">
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

      <div className="relative w-full sm:w-1/4">
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateChange(date, 'start')}
          className="block appearance-none w-full bg-white border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
          placeholderText="Start Date"
          dateFormat="yyyy-MM-dd"
          style={{ width: '100% !important' }}
        />
      </div>

      <div className="relative w-full sm:w-1/4">
        <DatePicker
          selected={endDate}
          onChange={(date) => handleDateChange(date, 'end')}
          className="block appearance-none w-full bg-white border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
          placeholderText="End Date"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
};

export default Filters;
