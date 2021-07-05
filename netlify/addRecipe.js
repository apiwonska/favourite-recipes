const axiosInstance = require('./axiosInstance');

module.exports = async (event) => {
  const data = JSON.parse(event.body);
  try {
    const res = await axiosInstance.post('/recipes', data);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return { statusCode: err.response.status, body: JSON.stringify(err) };
  }
};
