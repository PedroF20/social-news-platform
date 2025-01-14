import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FullArticle from '../src/pages/FullArticle';
import React from 'react';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

describe('FullArticle', () => {
  beforeEach(() => {
    localStorage.setItem(
      'articles',
      JSON.stringify([
        {
          id: 1,
          title: 'Article 1',
          content: 'Content of Article 1',
          description: 'Description of Article 1',
          published: true,
        },
      ]),
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the article if found', () => {
    render(
      <BrowserRouter>
        <FullArticle />
      </BrowserRouter>,
    );

    // Check the title
    expect(
      screen.getByRole('heading', { level: 1, name: /Article 1/i }),
    ).toBeInTheDocument();

    // Check the description
    expect(screen.getByText(/Description of Article 1/i)).toBeInTheDocument();

    // Check the content
    expect(screen.getByText(/Content of Article 1/i)).toBeInTheDocument();
  });

  it('shows an error message if the article is not found', () => {
    localStorage.setItem('articles', JSON.stringify([]));

    render(
      <BrowserRouter>
        <FullArticle />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Article not found/i)).toBeInTheDocument();
  });
});
