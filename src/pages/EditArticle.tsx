import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Article } from '../types/Article';

const EditArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const articles: Article[] = JSON.parse(
    localStorage.getItem('articles') || '[]',
  );
  const article = articles.find((a) => a.id === Number(id));

  const [title, setTitle] = useState(article?.title || '');
  const [content, setContent] = useState(article?.content || '');
  const [description, setDescription] = useState(article?.description || '');
  const [category, setCategory] = useState(article?.category || 'Engineering');
  const [published, setPublished] = useState(article?.published || false);

  if (!article) {
    return <p className="p-6 text-red-500">Article not found.</p>;
  }

  const handleSave = () => {
    const updatedArticles = articles.map((a) =>
      a.id === article.id
        ? {
            ...a,
            title,
            content,
            description,
            category,
            published,
          }
        : a,
    );

    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    navigate(`/article/${article.id}`); // Redirect back to the full article page
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={3}
            required
          />
        </div>

        {/* Content Input */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={6}
            required
          />
        </div>

        {/* Category Selector */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as 'Engineering' | 'Design' | 'Marketing',
              )
            }
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="published"
            className="text-sm font-medium text-gray-700"
          >
            Published:
          </label>
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate(`/article/${article.id}`)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
