const { default: axios } = require('axios');

exports.handler = async (event) => {
  const { url } = event.queryStringParameters;
  try {
    const res = await axios.head(url);
    return {
      statusCode: 200,
      headers: res.headers,
    };
  } catch (err) {
    return { statusCode: 500 };
  }
};
