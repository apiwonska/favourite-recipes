import axios, { CancelTokenSource } from 'axios';

import { IRecipeData, IRecipe, ICategoryData } from 'appInterfaces';
import { IFormData as IAddRecipeFormData } from 'pages/AddRecipePage/AddRecipeForm';
import { IFormData as IUpdateRecipeFormData } from 'pages/UpdateRecipePage/UpdateRecipeForm';

const axiosInstance = axios.create({
  baseURL: '/.netlify/functions',
});

export const fetchCategories = async (): Promise<ICategoryData> => {
  try {
    const res = await axiosInstance.get('/categories');

    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchRecipe = async (recipeId: string): Promise<IRecipe> => {
  try {
    const res = await axiosInstance.get(`/recipes?recipeId=${recipeId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

interface IFetchRecipesArgs {
  queryKey: [string, { searchText: string; searchCategory: string }];
  pageParam?: string;
}

let cancelFetchRecipes: CancelTokenSource | null = null;

export const fetchRecipes = async ({
  queryKey,
  pageParam = '',
}: IFetchRecipesArgs): Promise<IRecipeData> => {
  const searchText = queryKey[1].searchText.toLowerCase();
  const { searchCategory } = queryKey[1];
  const pageSize = 6;

  // Cancelling previous request
  if (cancelFetchRecipes) cancelFetchRecipes.cancel();
  const { CancelToken } = axios;
  cancelFetchRecipes = CancelToken.source();

  try {
    const res = await axiosInstance.get(
      `/recipes?searchText=${searchText}&searchCategory=${searchCategory}&pageSize=${pageSize}&pageParam=${pageParam}`,
      {
        cancelToken: cancelFetchRecipes.token,
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addRecipe = async (
  recipeFormData: IAddRecipeFormData
): Promise<IRecipe> => {
  try {
    const data = { fields: recipeFormData };
    const res = await axiosInstance.post('/recipes', data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const updateRecipe = async ({
  recipeId,
  recipeFormData,
}: {
  recipeId: string;
  recipeFormData: IUpdateRecipeFormData;
}): Promise<IRecipe> => {
  try {
    const data = { fields: recipeFormData };
    const res = await axiosInstance.put(`/recipes?recipeId=${recipeId}`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export interface IDeleteRecipeReturn {
  deleted: boolean;
  id: string;
}

export const deleteRecipe = async (
  recipeId: string
): Promise<IDeleteRecipeReturn> => {
  try {
    const res = await axiosInstance.delete(`/recipes?recipeId=${recipeId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
