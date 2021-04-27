# Favourite Recipes App

A simple CRUD application created in React with Airtable as database.
The main goal was to learn react-query library and testing with jest and react-testing-library.

## Main features:

- Allows to save links to your favourite recipes and add notes to it.
- You can create new records, update and delete records.
- You can add a categories to recipes to facilitate browsing recipes.
- Infinite scrolling applied for recipes list browsing.

## Used technogies and libraries:

- React
- create-react-app
- react-queries
- jest
- react-testing-library
- Airtable

## Setup for developement:

Prerequisites: you need to install Node and npm on your machine.

- Clone the repository to a directory on your computer
- Create a new base in [Airtable](https://airtable.com/)
- Add .env file with constants:

```
REACT_APP_AIRTABLE_API_KEY = Your Airtable API key
REACT_APP_AIRTABLE_BASE = Your base id
```

- Move to the project directory and install project dependencies

```
cd favourite-recipes
npm install
```

- Start the project

```
npm start
```

- Open the app on [port:3000](http://localhost:3000/)

## Credits:

## To improve:

- There is a safety issue to solve
