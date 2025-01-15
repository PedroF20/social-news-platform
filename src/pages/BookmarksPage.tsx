import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types/Article';

const BookmarksPage: React.FC = () => {
  const navigate = useNavigate();

  // Fetch bookmarked articles from localStorage
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>(
    JSON.parse(localStorage.getItem('articles') || '[]').filter(
      (article: Article) => article.bookmarked,
    ),
  );

  const openArticle = (id: number) => {
    navigate(`/article/${id}`);
  };

  const removeBookmark = (id: number) => {
    // Update articles in localStorage
    const allArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    const updatedArticles = allArticles.map((article: Article) =>
      article.id === id ? { ...article, bookmarked: false } : article,
    );
    localStorage.setItem('articles', JSON.stringify(updatedArticles));

    // Update the state of bookmarked articles
    setBookmarkedArticles(
      updatedArticles.filter((article: Article) => article.bookmarked),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <header className="bg-blue-600 text-white py-4 px-6 rounded-t-lg">
          <h1 className="text-2xl font-bold">My Bookmarks</h1>
          <p className="text-sm opacity-90">
            Easily access your favorite articles
          </p>
        </header>

        <div className="p-6">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center text-gray-600">
              <p className="text-lg">No bookmarks yet.</p>
              <p className="text-sm">
                Start bookmarking your favorite articles to see them here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookmarkedArticles.map((article) => (
                <div
                  key={article.id}
                  role="article"
                  className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition cursor-pointer"
                  onClick={() => openArticle(article.id)} // Open the full article
                >
                  <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {article.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the article click
                        removeBookmark(article.id);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove Bookmark
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
