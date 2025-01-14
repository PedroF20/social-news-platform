import React from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types/Article';

const FullArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const articles: Article[] = JSON.parse(
    localStorage.getItem('articles') || '[]',
  );
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return <p className="p-6 text-red-500">Article not found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-4">{article.description}</p>
      <div className="text-gray-800">{article.content}</div>
    </div>
  );
};

export default FullArticle;
