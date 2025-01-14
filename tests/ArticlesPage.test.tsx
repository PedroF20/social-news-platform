import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticlesPage from '../src/pages/ArticlesPage';
import React from 'react';

describe('ArticlesPage', () => {
  beforeEach(() => {
    localStorage.setItem(
      'articles',
      JSON.stringify([
        { id: 1, title: 'Article 1', content: 'Content 1', published: true },
        { id: 2, title: 'Article 2', content: 'Content 2', published: true },
        { id: 3, title: 'Article 3', content: 'Content 3', published: true },
        { id: 4, title: 'Article 4', content: 'Content 4', published: true },
        { id: 5, title: 'Article 5', content: 'Content 5', published: true },
        { id: 6, title: 'Article 6', content: 'Content 6', published: true },
      ]),
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the "Load More" button when there are more articles to load', () => {
    render(
      <MemoryRouter>
        <ArticlesPage />
      </MemoryRouter>,
    );

    // Target button by role
    const loadMoreButton = screen.getByRole('button', { name: /Load More/i });
    expect(loadMoreButton).toBeInTheDocument();
  });
});
