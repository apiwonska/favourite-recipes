const { default: axios } = require('axios');

exports.handler = async (event) => {
  const url = event.body;
  try {
    const res = await axios.head(url);

    return {
      statusCode: 200,
      body: JSON.stringify({ headers: res.headers }),
    };
  } catch (err) {
    return { statusCode: 500 };
  }
};
