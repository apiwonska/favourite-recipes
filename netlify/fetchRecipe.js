const axiosInstance = require('./axiosInstance');

module.exports = async (event) => {
  const { recipeId } = event.queryStringParameters;

  try {
    const res = await axiosInstance.get(`/recipes/${recipeId}`);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return { statusCode: err.response.status, body: JSON.stringify(err) };
  }
};
