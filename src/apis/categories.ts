import axiosInstance from 'apis/favoriteRecipesAxiosInstance';

import { ICategoryData } from 'appInterfaces';

export const fetchCategories = async (): Promise<ICategoryData> => {
  // Only name and order fields
  const fields = 'fields%5B%5D=name&fields%5B%5D=order';

  try {
    const res = await axiosInstance.get(`categories?view=grid&${fields}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
