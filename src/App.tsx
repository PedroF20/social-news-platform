import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import AdminDashboard from './pages/AdminDashboard';
import ArticlesPage from './pages/ArticlesPage';
import Layout from './components/Layout';
import FullArticle from './pages/FullArticle';
import EditArticle from './pages/EditArticle';
import BookmarksPage from './pages/BookmarksPage';

const App: React.FC = () => {
  // Logic to load articles from localStorage to use on the app
  useEffect(() => {
    const loadArticles = async () => {
      const existingArticles = localStorage.getItem('articles');
      if (!existingArticles) {
        try {
          const response = await fetch('/articles.json');
          const data = await response.json();
          localStorage.setItem('articles', JSON.stringify(data));
          console.log('Articles loaded into localStorage');
        } catch (error) {
          console.error('Error loading articles:', error);
        }
      }
    };

    loadArticles();
  }, []);

  return (
    // Provides the Auth0Context
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE, // Optional for API use
      }}
    >
      <Router>
        <Routes>
          {/* Shared Layout route */}
          {/* These routes require access granted by an Auth0 token */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<ArticlesPage />} /> {/* Default path */}
            <Route path="/article/:id" element={<FullArticle />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
};

// Auth0 logic
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) {
    return <div>Loading...</div>; // Optional loading spinner or placeholder
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering until authentication is resolved
  }

  return <>{children}</>;
};

export default App;
