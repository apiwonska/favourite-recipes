import axios from 'axios';

const BASE = process.env.REACT_APP_AIRTABLE_BASE_FAVOURITE_RECIPES;
export const url = `https://api.airtable.com/v0/${BASE}`;

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  },
});

export default axiosInstance;
