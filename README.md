# Social News Platform

A social news platform built using React, TypeScript, Tailwind and Vite. Users can browse, read, and manage news articles, with role-based access for administrators and general users.

## Features

- **Authentication:** User login and registration using Auth0.
- **Role-Based Authorization:**
  - Admins can create and manage articles.
  - Regular users can view published articles.
- **Article Management:**
  - Admins can create draft articles and publish them.
  - All users can view paginated published articles.
- **Pagination:** Smooth navigation for articles with "Load more" button.

## Future improvements

- Add image upload feature to the article creation/edit.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PedroF20/social-news-platform.git
   cd social-news-platform

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create a `.env.local` file in the root directory and add the following variables that were privately shared with you by the owner of this repository:

   ```bash
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_AUDIENCE=your-auth0-audience

   ```

4. Start the development server:

   ```bash
   npm run dev

   ```

5. Open your browser and navigate to

   ```bash
   http://localhost:5173
   ```

6. Log-in or register in order to use the application.

## Project Structure

```bash
social-news-platform/
├── public/                 # Public assets
├── src/                    # Source code
│   ├── components/         # Reusable components
│   │   ├── ArticleForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── Layout.tsx
│   │   └── Footer.tsx
│   ├── pages/              # Page components
│   │   ├── AdminDashboard.tsx
│   │   ├── FullArticle.tsx
│   │   ├── BookmarksPage.tsx
│   │   ├── EditArticle.tsx
│   │   └── ArticlesPage.tsx
│   ├── styles/             # CSS styles
│   │   ├── App.css
│   │   └── index.css
│   ├── types/              # TypeScript types
│   │   └── Article.ts
│   ├── App.tsx             # Main application logic
│   ├── main.tsx            # Entry point for the app
│   ├── setupTests.ts       # Tests setup file
│   └── vite-env.d.ts       # Vite environment file
├── tests                   # Test folder
├── .env.local              # Environment variables (not committed)
├── package.json            # Project dependencies and scripts
├── .eslintrc.json          # Lint configuration
├── eslint.config.js        # Lint configuration
├── postcss.config.cjs      # Postcss configuration
├── tailwind.config.js      # Tailwind configuration
├── .prettierrc             # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── .gitignore              # Ignored files and folders
├── README.md               # Project documentation
└── LICENSE                 # License file (optional)
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run linting checks.
- `npm run test`: Run tests.
- `npm run format`: Format the code using Prettier.

## License

This project is licensed under the MIT License.
