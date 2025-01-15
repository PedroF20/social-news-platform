import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { Article } from '../types/Article';
import { categories } from '../utils/constants';

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
    window.alert('Article successfully deleted!');
    navigate(`/article/${article.id}`);
  };

  // Deletes the article
  const handleDelete = () => {
    const updatedArticles = articles.filter((a) => a.id !== article.id);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    navigate('/'); // Redirect to the homepage after deletion
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        <FormField
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormField
          id="description"
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormField
          id="content"
          label="Content"
          type="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <FormField
          id="category"
          label="Category"
          type="select"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as 'Engineering' | 'Design' | 'Marketing',
            )
          }
          options={categories}
        />
        <FormField
          id="published"
          label="Published"
          type="checkbox"
          value={published}
          onChange={(e) => setPublished((e.target as HTMLInputElement).checked)}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
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
