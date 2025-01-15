import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookmarksPage from '../src/pages/BookmarksPage';
import { vi } from 'vitest';
import * as ReactRouterDom from 'react-router-dom';
import React from 'react';
import { Article } from '../src/types/Article';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('BookmarksPage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(ReactRouterDom.useNavigate).mockReturnValue(mockNavigate);

    // Mock articles in localStorage
    localStorage.setItem(
      'articles',
      JSON.stringify([
        {
          id: 1,
          title: 'Article 1',
          description: 'Description 1',
          category: 'Engineering',
          published: true,
          bookmarked: true,
        },
        {
          id: 2,
          title: 'Article 2',
          description: 'Description 2',
          category: 'Design',
          published: true,
          bookmarked: true,
        },
      ]),
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('navigates to the full article when clicking on an article', () => {
    render(
      <MemoryRouter>
        <BookmarksPage />
      </MemoryRouter>,
    );

    // Find the article title and simulate a click
    const articleTitle = screen.getByText(/Article 1/i);
    fireEvent.click(articleTitle);

    // Assert navigation to the full article
    expect(mockNavigate).toHaveBeenCalledWith('/article/1');
  });

  it('removes a bookmark when the "Remove Bookmark" button is clicked', () => {
    render(
      <MemoryRouter>
        <BookmarksPage />
      </MemoryRouter>,
    );

    // Find the button by exact text match
    const removeButtons = screen.getAllByTitle(/Remove Bookmark/i);

    // Click the first "Remove Bookmark" button
    fireEvent.click(removeButtons[0]);

    // Assert the article is no longer rendered
    expect(screen.queryByText(/Article 1/i)).not.toBeInTheDocument();

    // Assert localStorage is updated
    const updatedArticles = JSON.parse(
      localStorage.getItem('articles') || '[]',
    );
    expect(
      updatedArticles.find((article: Article) => article.id === 1)?.bookmarked,
    ).toBe(false);
  });
});
