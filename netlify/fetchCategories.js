const axiosInstance = require('./axiosInstance');

module.exports = async () => {
  // Only name and order fields
  const fields = 'fields%5B%5D=name&fields%5B%5D=order';

  try {
    const res = await axiosInstance.get(`categories?view=grid&${fields}`);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return { statusCode: err.response.status, body: JSON.stringify(err) };
  }
};
