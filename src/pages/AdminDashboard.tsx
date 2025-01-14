import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import { Article } from '../types/Article';

const AdminDashboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(
    JSON.parse(localStorage.getItem('articles') || '[]'),
  );

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const navigate = useNavigate();

  const addArticle = (
    title: string,
    content: string,
    description: string,
    published: boolean,
  ) => {
    const newArticle: Article = {
      id: articles.length + 1,
      title,
      content,
      description,
      published: published,
      category: 'Engineering', // Default category
    };
    const updatedArticles = [...articles, newArticle];
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    window.alert('Article successfully created!');
  };

  const publishArticle = (id: number) => {
    const updatedArticles = articles.map((article) =>
      article.id === id ? { ...article, published: true } : article,
    );
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Draft Articles Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Draft Articles</h2>
        {articles.filter((article) => !article.published).length === 0 ? (
          <p className="text-gray-500">No draft articles available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles
              .filter((article) => !article.published)
              .map((article) => (
                <div
                  key={article.id}
                  className="border p-4 rounded shadow bg-white"
                >
                  <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {article.content.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/article/${article.id}`)}
                      className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-full bg-transparent hover:bg-blue-500 hover:text-white"
                    >
                      Read More
                    </button>
                    <button
                      onClick={() => publishArticle(article.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Add Article Accordion */}
      <section className="my-10">
        <div
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="flex justify-between items-center p-4 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
        >
          <h2 className="text-xl font-semibold">Add New Article</h2>
          <span>{isAccordionOpen ? '▼' : '►'}</span>
        </div>
        {isAccordionOpen && (
          <div className="mt-4 p-4 bg-white rounded shadow">
            <ArticleForm onAddArticle={addArticle} />
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
