import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Article } from '../types/Article';

const FullArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  const articles: Article[] = JSON.parse(
    localStorage.getItem('articles') || '[]',
  );
  const article = articles.find((a) => a.id === Number(id));

  // Check if the user has the "admin" role
  const isAdmin = user?.['https://auth.mycompany.com/roles']?.includes('admin');

  const handleEditArticle = () => {
    if (article) {
      navigate(`/edit-article/${article.id}`); // Redirect to the edit article page
    }
  };

  if (!article) {
    return <p className="p-6 text-red-500">Article not found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{article.description}</p>
      <div className="text-gray-800">{article.content}</div>

      {isAuthenticated && isAdmin && (
        <div className="mt-6">
          <button
            onClick={handleEditArticle}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Article
          </button>
        </div>
      )}
    </div>
  );
};

export default FullArticle;
