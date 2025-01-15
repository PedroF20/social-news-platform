import React, { useState } from 'react';
import FormField from '../components/FormField';
import { categories } from '../utils/constants';
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
  const [category, setCategory] = useState('Engineering');
  const [published, setPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddArticle(title, content, description, published);
    setTitle('');
    setContent('');
    setDescription('');
    setPublished(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl">
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
        onChange={(e) => setCategory(e.target.value)}
        options={categories}
      />
      <FormField
        id="published"
        label="Published"
        type="checkbox"
        value={published}
        onChange={(e) => setPublished((e.target as HTMLInputElement).checked)}
      />
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
