import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();

  const isAdmin = user?.['https://auth.mycompany.com/roles']?.includes('admin');

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => handleNavigate('/')} className="cursor-pointer">
          <img
            src="/Sword-logo-blue.svg.png"
            alt="Logo"
            className="h-10 object-contain"
          />
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <span className="text-xl font-bold">✖</span>
          ) : (
            <span className="text-xl font-bold">☰</span>
          )}
        </button>

        {/* Menu Items */}
        <div
          className={`${
            isMenuOpen
              ? 'absolute top-16 left-0 w-full bg-white shadow-md py-4 z-50'
              : 'hidden'
          } md:flex md:items-center md:gap-6 md:static md:w-auto md:py-0`}
        >
          {/* Admin Access */}
          {isAuthenticated && isAdmin && (
            <button
              onClick={() => handleNavigate('/admin')}
              className="block w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition md:px-3 md:py-1 md:text-sm"
            >
              Manage Articles
            </button>
          )}

          {/* My Bookmarks */}
          <button
            onClick={() => handleNavigate('/bookmarks')}
            className="block w-full md:w-auto px-4 py-2 text-gray-700 hover:text-blue-500 transition md:px-3 md:py-1 md:text-sm"
          >
            My Bookmarks
          </button>

          {/* Logout */}
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="block w-full md:w-auto px-4 py-2 text-gray-700 hover:text-blue-500 transition md:px-3 md:py-1 md:text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
