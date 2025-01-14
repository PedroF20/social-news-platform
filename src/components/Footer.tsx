import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-2 text-center shadow-inner">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} Sword Health. All rights reserved.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a
          href="https://swordhealth.com/legal/privacy-statement"
          className="text-blue-500 hover:underline"
        >
          Privacy Policy
        </a>
        <a
          href="https://swordhealth.com/legal/terms-and-conditions"
          className="text-blue-500 hover:underline"
        >
          Terms of Service
        </a>
        <a
          href="https://swordhealth.com/request-demo/platform"
          className="text-blue-500 hover:underline"
        >
          Contact Us
        </a>
      </div>
    </footer>
  );
};

export default Footer;
