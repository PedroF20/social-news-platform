import React, { useState } from 'react';

interface ArticleFormProps {
  onAddArticle: (
    title: string,
    content: string,
    description: string,
    published: boolean,
  ) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddArticle(title, content, description, published);
    setTitle('');
    setContent('');
    setDescription('');
    setPublished(false);
  };

  const checkHandler = () => {
    setPublished(!published);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Enter the article title"
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
          rows={5}
          placeholder="Write your article content here..."
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
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Published selector */}
      <div>
        <label
          htmlFor="published"
          className="block text-sm font-medium text-gray-700"
        >
          Published
        </label>
        <input type="checkbox" checked={published} onChange={checkHandler} />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Article
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
