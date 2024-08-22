import React, { useState, useEffect } from 'react';
import NewsesTab from '../components/NewsesTab';
import SettingsTab from '../components/SettingsTab';
import { fetchArticles } from '../services/newsApi';

const Home = () => {
  const [activeTab, setActiveTab] = useState('newses');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [queryData, setQueryData] = useState('');
  const [filters, setFilters] = useState({ category: '', source: '' });
  const [categoryData, setCategoryData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true); // Start loading
      const data = await fetchArticles(queryData, filters);
      setArticles(data);

      const sources = data.reduce((acc, article) => {
        if (article.source && article.source.name && article.source.id) {
          if (!acc.some(source => source.id === article.source.id)) {
            acc.push({ name: article.source.name, id: article.source.id });
          }
        }
        return acc;
      }, []);

      setSourceData(sources);
      setLoading(false); // Stop loading
    };
    if (queryData) {
      getArticles();
    }
  }, [queryData]);

  useEffect(() => {
    const applyFilters = () => {
      const { category, source } = filters;
      let filtered = [...articles];
      if (category) {
        filtered = filtered.filter(article => article.category === category);
      }
      if (source) {
        filtered = filtered.filter(article => article.source.id === source);
      }
      setFilteredArticles(filtered);
    };

    applyFilters();
  }, [filters, articles]);

  const handleSearch = (q) => {
    setQueryData(q);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="mb-0 flex justify-center">
        <button
          onClick={() => setActiveTab('newses')}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-300 ${activeTab === 'newses' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          News
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`ml-4 px-6 py-2 text-lg font-semibold transition-colors duration-300 ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Settings
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'newses' && (
              <NewsesTab
                articles={articles}
                filteredArticles={filteredArticles}
                categoryData={categoryData}
                sourceData={sourceData}
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
              />
            )}

            {activeTab === 'settings' && <SettingsTab />}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
