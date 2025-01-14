import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types/Article';

const ArticlesPage: React.FC = () => {
  const navigate = useNavigate();

  // Fetches the articles
  const articles: Article[] = JSON.parse(
    localStorage.getItem('articles') || '[]',
  ).filter((article: Article) => article.published);

  // Filter logic
  const categories = ['Engineering', 'Design', 'Marketing'] as const;
  type Category = (typeof categories)[number];

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [visibleCount, setVisibleCount] = useState(5);

  const filteredArticles =
    selectedCategory === null
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  const loadMoreArticles = () => {
    setVisibleCount((prev) => Math.min(prev + 5, filteredArticles.length));
  };

  // Opens full article
  const readMore = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="px-4 py-4">
      {/* First Article */}
      {visibleArticles.length > 0 && (
        <div className="mb-6">
          <div className="p-4 border rounded shadow bg-white flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {visibleArticles[0].title}
              </h2>
              <p className="text-gray-600 mb-4">{visibleArticles[0].content}</p>
              <button
                onClick={() => readMore(visibleArticles[0].id)}
                className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-full bg-transparent hover:bg-blue-500 hover:text-white"
              >
                Read More
              </button>
            </div>
            <img
              src={visibleArticles[0].image}
              alt={visibleArticles[0].title}
              className="w-full md:w-1/6 h-auto object-scale-down rounded"
            />
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold">Category:</h3>
        <div className="flex gap-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category === selectedCategory ? null : category,
                )
              }
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleArticles.slice(1).map((article: Article) => (
          <div
            key={article.id}
            className="p-4 border rounded shadow bg-white flex items-center gap-6"
          >
            <div>
              <h3 className="text-lg font-bold">{article.title}</h3>
              <p className="text-gray-600">{article.content}</p>
              <button
                onClick={() => readMore(article.id)}
                className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-full bg-transparent hover:bg-blue-500 hover:text-white"
              >
                Read More
              </button>
            </div>
            <img
              src={article.image}
              alt={article.title}
              className="w-40 h-40 object-scale-down rounded"
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredArticles.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreArticles}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
