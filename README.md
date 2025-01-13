# Social News Platform

A social news platform built using React, TypeScript, and Vite. Users can browse, share, and manage news articles, with role-based access for administrators and general users.

## Features

- **Authentication:** User login and registration using Auth0.
- **Role-Based Authorization:**
  - Admins can create and manage articles.
  - Regular users can view published articles.
- **Article Management:**
  - Admins can create draft articles and publish them.
  - Users can view paginated published articles.
- **Pagination:** Smooth navigation for articles with "Next" and "Previous" buttons.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/social-news-platform.git
   cd social-news-platform


2. Install dependencies:
   ```bash
   npm install


3. Create a `.env.local` file in the root directory and add the following variables:
   ```bash
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_AUDIENCE=your-auth0-audience

4. Start the development server:
   ```bash
   npm run dev

5. Open your browser and navigate to
   ```bash
   http://localhost:5173

## Project Structure

```bash
social-news-platform/
├── public/                 # Public assets
├── src/                    # Source code
│   ├── components/         # Reusable components
│   │   ├── AdminRoute.tsx
│   │   ├── ArticleForm.tsx
│   │   ├── Navbar.tsx
│   │   └── Pagination.tsx
│   ├── pages/              # Page components
│   │   ├── AdminDashboard.tsx
│   │   ├── ArticlesPage.tsx
│   │   ├── HomePage.tsx
│   │   └── LoginPage.tsx
│   ├── styles/             # CSS styles
│   │   └── index.css
│   ├── types/              # TypeScript types
│   │   └── Article.ts
│   ├── App.tsx             # Main application logic
│   ├── main.tsx            # Entry point for the app
│   └── vite-env.d.ts       # Vite environment file
├── .env.local              # Environment variables (not committed)
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── .gitignore              # Ignored files and folders
├── README.md               # Project documentation
└── LICENSE                 # License file (optional)
```

## Scripts

* `npm run dev`: Start the development server.
* `npm run build`: Build the application for production.
* `npm run preview`: Preview the production build.
* `npm run lint`: Run linting checks.
* `npm run format`: Format the code using Prettier.

## License

This project is licensed under the MIT License.

