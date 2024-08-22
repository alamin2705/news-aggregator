import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';

const NewsesTab = ({ articles, filteredArticles, categoryData, sourceData, onSearch, onFilterChange }) => {
  return (
    <div className="container mx-auto px-4 mt-4">
      <SearchBar onSearch={onSearch} />
      <Filters categories={categoryData} sources={sourceData} onFilterChange={onFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.url} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsesTab;
