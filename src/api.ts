import axios from 'axios';

import { RecipeDataInterface } from 'appInterfaces';

const BASE = process.env.REACT_APP_AIRTABLE_BASE_FAVOURITE_RECIPES;
export const url = `https://api.airtable.com/v0/${BASE}`;
export const getUrl = (path: string): string => url + path;

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
  },
});

export const fetchRecipes = async ({
  pageParam = '',
}: {
  pageParam?: string;
}): Promise<RecipeDataInterface> => {
  const pageSize = 5;

  try {
    const res = await axiosInstance.get(
      `/recipes?view=grid&pageSize=${pageSize}&offset=${pageParam}`
    );
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
