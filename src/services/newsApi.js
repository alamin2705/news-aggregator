import axios from 'axios';

export async function fetchArticles(query, filters) {
  try {
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=77e880a3a4e14feb93c4fc00eed2f407`;

    if (filters.category) {
      url += `&category=${filters.category}`;
    }
    if (filters.source) {
      url += `&sources=${filters.source}`;
    }

    const response = await axios.get(url);
    const articles = response.data.articles;

    const filteredArticles = articles.filter(article =>
      !(article.source.name?.includes('[Removed]') ||
        article.title?.includes('[Removed]') ||
        article.content?.includes('[Removed]'))
    );

    return filteredArticles;
  } catch (error) {
    console.error('Error fetching articles:', error.response?.data || error.message);
    return [];
  }
}

export async function fetchNewsOptions() {
  try {
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;

    const response = await axios.get(url);
    const sources = response.data.sources;

    const categorySet = new Set();
    const categories = [];

    sources.forEach(source => {
      const categoryName = source.category.charAt(0).toUpperCase() + source.category.slice(1);
      if (!categorySet.has(source.category)) {
        categories.push({ name: categoryName, id: source.category });
        categorySet.add(source.category);
      }
    });

    const sourceSet = new Set();
    const uniqueSources = [];

    sources.forEach(source => {
      if (!sourceSet.has(source.id)) {
        uniqueSources.push({
          name: source.name,
          id: source.id,
        });
        sourceSet.add(source.id);
      }
    });

    const structuredData = {
      category: categories,
      source: uniqueSources,
      author: [],
    };

    return structuredData;
  } catch (error) {
    console.error('Error fetching news sources:', error.response?.data || error.message);
    return { category: [], source: [], author: [] };
  }
}



