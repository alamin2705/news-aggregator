import axios from 'axios';

export async function fetchArticles(query, filters = {}) {
  try {
    const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
    const NYTIMES_API_KEY = process.env.REACT_APP_NYTIMES_API_KEY;

    const savedCategory = localStorage.getItem('selectedCategory');
    const savedSource = localStorage.getItem('selectedSource');
    const savedAuthor = localStorage.getItem('selectedAuthor');

    const category = filters.category || savedCategory || '';
    const source = filters.source || savedSource || '';
    const author = filters.author || savedAuthor || '';

    let newsApiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`;
    let guardianApiUrl = `https://content.guardianapis.com/search?q=${query}&api-key=${GUARDIAN_API_KEY}`;
    let nytApiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${NYTIMES_API_KEY}`;

    if (source) {
      if (source === 'guardian') {
        newsApiUrl = '';
        nytApiUrl = '';
      } else if (source === 'nyt') {
        newsApiUrl = '';
        guardianApiUrl = '';
      } else {
        if (category) {
          newsApiUrl = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${NEWS_API_KEY}&category=${category}&sources=${source}`;
        } else {
          newsApiUrl = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${NEWS_API_KEY}&sources=${source}`;
        }
        guardianApiUrl = '';
        nytApiUrl = '';
      }
    } else {
      if (category) {
        newsApiUrl = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${NEWS_API_KEY}&category=${category}`;
        guardianApiUrl += `&section=${category}`;
        nytApiUrl += `&fq=news_desk:("${category}")`;
      }
    }

    const [newsApiResponse, guardianApiResponse, nytApiResponse] = await Promise.all([
      newsApiUrl ? axios.get(newsApiUrl).catch(() => ({ data: { articles: [] } })) : Promise.resolve({ data: { articles: [] } }),
      guardianApiUrl ? axios.get(guardianApiUrl).catch(() => ({ data: { response: { results: [] } } })) : Promise.resolve({ data: { response: { results: [] } } }),
      nytApiUrl ? axios.get(nytApiUrl).catch(() => ({ data: { response: { docs: [] } } })) : Promise.resolve({ data: { response: { docs: [] } } })
    ]);

    const newsApiArticles = newsApiResponse.data.articles || [];

    const guardianArticles = guardianApiResponse.data.response.results.map(result => ({
      source: { name: 'The Guardian' },
      title: result.webTitle,
      content: result.fields?.bodyText || '',
      sectionName: result.sectionName || '',
      url: result.webUrl,
      publishedAt: result.webPublicationDate,
    })) || [];

    const nytArticles = nytApiResponse.data.response.docs.map(doc => ({
      source: { name: 'The New York Times' },
      title: doc.headline.main,
      content: doc.abstract || '',
      news_desk: doc.news_desk || '',
      url: `https://www.nytimes.com/${doc.web_url}`,
      publishedAt: doc.pub_date,
    })) || [];

    let combinedArticles = [
      ...newsApiArticles,
      ...guardianArticles,
      ...nytArticles,
    ];

    if (author) {
      combinedArticles = combinedArticles.filter(article =>
        article.author?.toLowerCase().includes(author.toLowerCase())
      );
    }

    const filteredArticles = combinedArticles.filter(article =>
      !(article.source?.name?.includes('[Removed]') ||
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
    const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
    const NYTIMES_API_KEY = process.env.REACT_APP_NYTIMES_API_KEY;
    const NEWSAPI_URL = `https://newsapi.org/v2/sources?apiKey=${API_KEY}`;
    const GUARDIAN_URL = `https://content.guardianapis.com/sections?api-key=${GUARDIAN_API_KEY}`;
    const NYT_URL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${NYTIMES_API_KEY}`;
    const NEWSAPI_TOP_HEADLINES_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&category=general&pageSize=1`;

    const [newsapiResponse, guardianResponse, nytResponse, newsapiHeadlinesResponse, guardianArticlesResponse, nytArticlesResponse] = await Promise.all([
      axios.get(NEWSAPI_URL).catch(() => ({ data: { sources: [] } })),
      axios.get(GUARDIAN_URL).catch(() => ({ data: { response: { results: [] } } })),
      axios.get(NYT_URL).catch(() => ({ data: { results: [] } })),
      axios.get(NEWSAPI_TOP_HEADLINES_URL).catch(() => ({ data: { articles: [] } })),
      axios.get(`https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&page-size=1`).catch(() => ({ data: { response: { results: [] } } })),
      axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYTIMES_API_KEY}&page=0&facet_fields=byline`).catch(() => ({ data: { response: { docs: [] } } }))
    ]);

    const newsapiSources = newsapiResponse.data.sources || [];
    const guardianSections = guardianResponse.data.response.results || [];
    const nytSections = nytResponse.data.results || [];

    const categorySet = new Set();
    const categories = [];

    newsapiSources.forEach(source => {
      const categoryName = source.category.charAt(0).toUpperCase() + source.category.slice(1);
      if (!categorySet.has(`newsapi_${source.category}`)) {
        categories.push({ name: categoryName, id: `newsapi_${source.category}` });
        categorySet.add(`newsapi_${source.category}`);
      }
    });

    guardianSections.forEach(section => {
      const categoryName = section.webTitle;
      if (!categorySet.has(`guardian_${section.id}`)) {
        categories.push({ name: categoryName, id: `guardian_${section.id}` });
        categorySet.add(`guardian_${section.id}`);
      }
    });

    nytSections.forEach(section => {
      const categoryName = section.display_name;
      if (!categorySet.has(`nyt_${section.section}`)) {
        categories.push({ name: categoryName, id: `nyt_${section.section}` });
        categorySet.add(`nyt_${section.section}`);
      }
    });

    const sourceSet = new Set();
    const uniqueSources = [];

    newsapiSources.forEach(source => {
      if (!sourceSet.has(source.id)) {
        uniqueSources.push({
          name: source.name,
          id: source.id,
        });
        sourceSet.add(source.id);
      }
    });

    if (!sourceSet.has('guardian')) {
      uniqueSources.push({ name: 'The Guardian', id: 'guardian' });
      sourceSet.add('guardian');
    }

    if (!sourceSet.has('nyt')) {
      uniqueSources.push({ name: 'The New York Times', id: 'nyt' });
      sourceSet.add('nyt');
    }

    const authorSet = new Set();
    const authors = [];

    newsapiHeadlinesResponse.data.articles.forEach(article => {
      if (article.author && !authorSet.has(article.author)) {
        authors.push({ name: article.author });
        authorSet.add(article.author);
      }
    });

    guardianArticlesResponse.data.response.results.forEach(article => {
      if (article.byline && !authorSet.has(article.byline)) {
        authors.push({ name: article.byline });
        authorSet.add(article.byline);
      }
    });

    nytArticlesResponse.data.response.docs.forEach(article => {
      if (article.byline && article.byline.original && !authorSet.has(article.byline.original)) {
        authors.push({ name: article.byline.original });
        authorSet.add(article.byline.original);
      }
    });

    const structuredData = {
      category: categories,
      source: uniqueSources,
      author: authors,
    };

    return structuredData;
  } catch (error) {
    console.error('Error fetching news sources:', error.response?.data || error.message);
    return { category: [], source: [], author: [] };
  }
}
