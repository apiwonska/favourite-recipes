# Favourite Recipes App

Live demo: [https://favourite-recipes.netlify.app](https://favourite-recipes.netlify.app)

A simple CRUD application has been created in React with Airtable as a database.
The main purpose for creating this app was to learn react-query library, unit tests with jest/ react testing library, Typescript.

## Main features:

- Allows you to save links to your favourite recipes and add notes to them.
- It's possible to add categories to the recipe.
- You can create, update and delete recipes. Note: some recipes have been blocked from being modified for demo purposes.
- You can search for recipes by text and category.
- Infinite scrolling applied for recipes list browsing.
- Form validation (using yup).
- Use netlify lambda functions to proxy requests and protect API key.

## Used technologies and libraries:

- React (the app uses functional components and hooks)
- create-react-app
- Typescript
- react-query
- react-hook-form
- yup
- react-bootstrap
- jest
- react-testing-library
- msw (Mock Service Worker)
- Airtable
- Rest API
- eslint
- netlify lambda functions

## Setup for developement:

Prerequisites: you need to install Node and npm on your machine.

- Clone the repository to a directory on your computer
- Create a new base in [Airtable](https://airtable.com/)
- Add .env file with constants:

```
REACT_APP_AIRTABLE_API_KEY = Your Airtable API key
REACT_APP_AIRTABLE_BASE = Your base id
REACT_APP_AIRTABLE_URL = https://api.airtable.com/v0
FAST_REFRESH=false
```

- Move to the project directory and install project dependencies

```
cd favourite-recipes
npm install
```

- Start the project

```
npm run start:ntl
or
ntl dev
```

## Credits:

- Photos:
  - background image - Pixabay
  - recipe image placeholder - Heather Ford, Unsplash
  - svg illustration - Undraw
