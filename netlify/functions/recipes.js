const fetchRecipes = require('../fetchRecipes');
const fetchRecipe = require('../fetchRecipe');
const addRecipe = require('../addRecipe');
const updateRecipe = require('../updateRecipe');
const deleteRecipe = require('../deleteRecipe');
const formattedReturn = require('../formattedReturn');

exports.handler = (event) => {
  if (event.httpMethod === 'GET') {
    const { recipeId } = event.queryStringParameters;
    if (recipeId) {
      return fetchRecipe(event);
    }
    return fetchRecipes(event);
  }
  if (event.httpMethod === 'POST') {
    return addRecipe(event);
  }
  if (event.httpMethod === 'PUT') {
    return updateRecipe(event);
  }
  if (event.httpMethod === 'DELETE') {
    return deleteRecipe(event);
  }
  return formattedReturn(405, {});
};
