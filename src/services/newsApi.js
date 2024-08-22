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
