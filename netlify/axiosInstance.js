const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AIRTABLE_URL}/${process.env.REACT_APP_AIRTABLE_BASE_FAVOURITE_RECIPES}`,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  },
});

module.exports = axiosInstance;
