import axios from 'axios';

import { RecipeDataInterface } from 'app_interfaces';

const BASE = process.env.REACT_APP_AIRTABLE_BASE_FAVOURITE_RECIPES;
export const url = `https://api.airtable.com/v0/${BASE}`;

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  },
});

export const fetchRecipes = async (): Promise<RecipeDataInterface> => {
  try {
    const res = await axiosInstance.get(`/recipes?view=grid`);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
