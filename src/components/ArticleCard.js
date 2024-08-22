import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="object-cover h-48 w-full"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 flex-grow">{article.description}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-4 self-start"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
