# Blogger's Dream

Blog website which allows users to read blog posts. It consists of two main pages - the main page showing the list of posts and post page showing post contents and comments left by users.

## Development notes

### Install

Before running any npm scripts in the project, install project dependencies with `npm install`.

### Start locally

There are two ways to start project locally:

- `npm start` starts the project in development mode with all APIs and data mocked
- `npm run start:prod` starts the project in production mode allowing calls to the real API

### Build

Build the project and create production-ready bundle using `npm run build`.

### Unit tests

Run unit tests in watch mode with `npm test`.

### Technology stack

- Typescript - programming language
- React - library for building user interfaces
- Redux - state management library
- msw - mocking APIs for local development and testing
- Jest - test runner
- React Testing Library - unit testing library
- MaterialUI - CSS framework with big set of styled UI components
- React Router - client-side routing
- Create-react-app - application scaffolding
