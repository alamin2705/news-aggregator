import React, { useState, useEffect } from 'react';
import { fetchNewsOptions } from '../services/newsApi';

const SettingsTab = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');

  useEffect(() => {
    const getNewsOptions = async () => {
      setLoading(true);
      try {
        const data = await fetchNewsOptions();
        setCategories(data.category);
        setSources(data.source);
        setAuthors(data.author);
      } catch (error) {
        console.error('Error fetching news options:', error);
      } finally {
        setLoading(false);
      }
    };
    getNewsOptions();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSourceChange = (e) => {
    setSelectedSource(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log({
      selectedCategory,
      selectedSource,
      selectedAuthor
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-4 max-w-lg">
      <form className="bg-white shadow-lg rounded-lg p-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Select Category</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Select Source</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
            value={selectedSource}
            onChange={handleSourceChange}
          >
            <option value="">Select Source</option>
            {sources.map(source => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Select Author</label>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300"
            value={selectedAuthor}
            onChange={handleAuthorChange}
          >
            <option value="">Select Author</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SettingsTab;
