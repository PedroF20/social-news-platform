import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { logout } = useAuth0();

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-gray-100 shadow">
      <div onClick={() => navigate('/')} className="cursor-pointer">
        <img width="150" src="/Sword-logo-blue.svg.png" alt="Logo" />
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-600 md:hidden"
      >
        ☰
      </button>
      <div
        className={`flex flex-col md:flex-row md:gap-4 ${
          isMenuOpen ? 'block' : 'hidden'
        } md:block`}
      >
        <button className="text-gray-600 hover:text-blue-500 mr-6">
          My Bookmarks
        </button>
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="text-gray-600 hover:text-blue-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
