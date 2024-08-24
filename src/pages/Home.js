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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      const data = await fetchArticles(queryData, filters);
      setArticles(data);

      const categories = data.reduce((acc, article) => {
        let category;
        if (article.source.name === 'The Guardian') {
          category = article.sectionName;
        } else if (article.source.name === 'The New York Times') {
          category = article.news_desk;
        } else if (article.source.name !== 'The Guardian' && article.source.name !== 'The New York Times') {
          category = article.category || '';
        }

        if (category && !acc.includes(category)) {
          acc.push(category);
        }
        return acc;
      }, []);
      setCategoryData(categories);

      const sources = data.reduce((acc, article) => {
        if (article.source && article.source.name) {
          if (!acc.some(source => source.name === article.source.name)) {
            acc.push({ name: article.source.name });
          }
        }
        return acc;
      }, []);
      setSourceData(sources);

      setLoading(false);
    };

    if (queryData) {
      getArticles();
    }
  }, [queryData]);

  useEffect(() => {
    const applyFilters = () => {
      const { category, source, startDate, endDate } = filters;
      let filtered = [...articles];

      if (category) {
        filtered = filtered.filter(article => {
          if (article.source.name === 'The Guardian') {
            return article.sectionName === category;
          } else if (article.source.name === 'The New York Times') {
            return article.news_desk === category;
          } else {
            return article.category === category;
          }
        });
      }

      if (source) {
        filtered = filtered.filter(article => article.source.name === source);
      }

      if (startDate || endDate) {
        filtered = filtered.filter(article => {
          const articleDate = new Date(article.publishedAt);
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;

          if (start && end) {
            return articleDate >= start && articleDate <= end;
          } else if (start) {
            return articleDate >= start;
          } else if (end) {
            return articleDate <= end;
          } else {
            return true;
          }
        });
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
