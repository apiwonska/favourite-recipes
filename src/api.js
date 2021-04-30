import axios from 'axios';

const BASE = process.env.REACT_APP_AIRTABLE_BASE_FAVOURITE_RECIPES;

const axiosInstance = axios.create({
  baseURL: `https://api.airtable.com/v0/${BASE}`,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  },
});

export const fetchRecipes = async () => {
  try {
    const res = await axiosInstance.get(`/recipes?view=grid`);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
