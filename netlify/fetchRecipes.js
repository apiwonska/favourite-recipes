const axios = require('axios');
const axiosInstance = require('./axiosInstance');

let cancelFetchRecipes;
module.exports = async (event) => {
  const {
    searchText,
    searchCategory,
    pageSize,
    pageParam = '',
  } = event.queryStringParameters;

  // Query parameters
  // Same order as in a specified view (otherwise it's random)
  const view = 'view=grid';
  // Sort from most recently created
  const sort =
    '&sort%5B0%5D%5Bfield%5D=created&sort%5B0%5D%5Bdirection%5D=desc';
  // Ignore records that have empty name or link field
  const filteroutEmptyRecords = `NOT(name%3D'')%2CNOT(link%3D'')`;
  // Search for the text in name and note fields
  const textFilter = searchText
    ? `%2COR(SEARCH(%22${searchText}%22%2CLOWER(name))%2CSEARCH(%22${searchText}%22%2CLOWER(note)))`
    : '';
  const categoryFilter = searchCategory
    ? `%2CSEARCH(%22${searchCategory}%22%2Ccategories)`
    : '';
  const filterByFormula = `&filterByFormula=AND(${filteroutEmptyRecords}${textFilter}${categoryFilter})`;
  const recipeParams = `${view}${filterByFormula}${sort}`;

  // Cancelling previous request
  if (cancelFetchRecipes) cancelFetchRecipes.cancel();
  cancelFetchRecipes = axios.CancelToken.source();

  try {
    const res = await axiosInstance.get(
      `/recipes?${recipeParams}&pageSize=${pageSize}&offset=${pageParam}`,
      {
        cancelToken: cancelFetchRecipes.token,
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return { statusCode: err.response.status, body: JSON.stringify(err) };
  }
};
