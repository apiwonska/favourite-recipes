const axiosInstance = require('./axiosInstance');

module.exports = async (event) => {
  const { recipeId } = event.queryStringParameters;
  const data = JSON.parse(event.body);

  try {
    const res = await axiosInstance.put(`/recipes/${recipeId}`, data);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return { statusCode: err.response.status, body: JSON.stringify(err) };
  }
};
