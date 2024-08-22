import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import Filters from '../components/Filters';
import { fetchArticles } from '../services/newsApi';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [queryData, setQueryData] = useState('');
  const [filters, setFilters] = useState({ category: '', source: '' });
  const [categoryData, setCategoryData] = useState([]);
  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
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
    };
    if(queryData){
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
      <Filters
        categories={categoryData}
        sources={sourceData}
        onFilterChange={handleFilterChange}
        onHandleSearch={handleSearch}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
