import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from '../src/pages/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('AdminDashboard', () => {
  beforeEach(() => {
    // Mock articles in localStorage
    localStorage.setItem(
      'articles',
      JSON.stringify([
        {
          id: 1,
          title: 'Draft Article 1',
          content: 'Content 1',
          published: false,
        },
      ]),
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders draft articles', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Draft Article 1/i)).toBeInTheDocument();
  });

  it('publishes an article when the "Publish" button is clicked', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>,
    );

    const publishButton = screen.getByText(/Publish/i);
    fireEvent.click(publishButton);

    const updatedArticles = JSON.parse(
      localStorage.getItem('articles') || '[]',
    );
    expect(updatedArticles[0].published).toBe(true);
  });
});
