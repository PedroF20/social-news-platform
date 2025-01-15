import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types/Article';
import BookmarkButton from '../components/BookmarkButton';

const ArticlesPage: React.FC = () => {
  const navigate = useNavigate();

  // Fetch articles from localStorage
  const [articles, setArticles] = useState<Article[]>(
    JSON.parse(localStorage.getItem('articles') || '[]').filter(
      (article: Article) => article.published,
    ),
  );

  // Category and filtering
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

  // Bookmark toggle
  const toggleBookmark = (id: number) => {
    const updatedArticles = articles.map((article) =>
      article.id === id
        ? { ...article, bookmarked: !article.bookmarked }
        : article,
    );
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  // Open full article
  const readMore = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="px-4 py-8">
      {/* First Article */}
      {visibleArticles.length > 0 && (
        <div className="mb-6">
          <div className="p-4 border rounded shadow bg-white flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {visibleArticles[0].title}
              </h2>
              <p className="text-gray-600 mb-4">
                {visibleArticles[0].description}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => readMore(visibleArticles[0].id)}
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full bg-transparent hover:bg-blue-500 hover:text-white"
                >
                  Read More
                </button>
                <BookmarkButton
                  isBookmarked={visibleArticles[0].bookmarked!}
                  toggleBookmark={() => toggleBookmark(visibleArticles[0].id)}
                  size={10}
                />
              </div>
            </div>
            {/* Align image to the right */}
            <div className="w-full md:w-auto md:ml-auto">
              <img
                src={visibleArticles[0].image}
                alt={visibleArticles[0].title}
                className="w-40 md:w-48 h-auto object-cover rounded"
              />
            </div>
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
        {visibleArticles.slice(1).map((article) => (
          <div
            key={article.id}
            className="p-4 border rounded shadow bg-white flex items-center gap-6"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold">{article.title}</h3>
              <p className="text-gray-600">{article.description}</p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => readMore(article.id)}
                  className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full bg-transparent hover:bg-blue-500 hover:text-white"
                >
                  Read More
                </button>
                <BookmarkButton
                  isBookmarked={article.bookmarked!}
                  toggleBookmark={() => toggleBookmark(article.id)}
                  size={10}
                />
              </div>
            </div>
            {/* Align image to the right */}
            <div className="w-full md:w-auto md:ml-auto">
              <img
                src={article.image}
                alt={article.title}
                className="w-40 h-40 object-cover rounded"
              />
            </div>
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
