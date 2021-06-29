import axios, { CancelTokenSource } from 'axios';

import { IRecipeData, IRecipe } from 'appInterfaces';
import { IFormData as IAddRecipeFormData } from 'pages/AddRecipePage/AddRecipeForm';
import { IFormData as IUpdateRecipeFormData } from 'pages/UpdateRecipePage/UpdateRecipeForm';
import axiosInstance, { url } from 'apis/favoriteRecipesAxiosInstance';

export const getUrl = (path: string): string => url + path;

export const fetchRecipe = async (recipeId: string): Promise<IRecipe> => {
  try {
    const res = await axiosInstance.get(`/recipes/${recipeId}`);
    return res.data;
  } catch (err) {
    throw new Error(
      `${err.response.statusText}. Error status code:${err.response.status}`
    );
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

  // Query parameters
  // Same order as in a specified view (otherwise it's random)
  const view = 'view=grid';
  // Sort from most recently created
  const sort =
    '&sort%5B0%5D%5Bfield%5D=created&sort%5B0%5D%5Bdirection%5D=desc';
  // Ignore records that have empty name or link field
  const filteroutEmptyRecords = `NOT(name%3D'')%2CNOT(link%3D'')`;
  // Search for the text in name and note fields
  const textFilter = searchText
    ? `%2COR(SEARCH(%22${searchText}%22%2CLOWER(name))%2CSEARCH(%22${searchText}%22%2CLOWER(note)))`
    : '';
  const categoryFilter = searchCategory
    ? `%2CSEARCH(%22${searchCategory}%22%2Ccategories)`
    : '';
  const filterByFormula = `&filterByFormula=AND(${filteroutEmptyRecords}${textFilter}${categoryFilter})`;
  const recipeParams = `${view}${filterByFormula}${sort}`;

  // Cancelling previous request
  if (cancelFetchRecipes) cancelFetchRecipes.cancel();
  const { CancelToken } = axios;
  cancelFetchRecipes = CancelToken.source();

  try {
    const res = await axiosInstance.get(
      `/recipes?${recipeParams}&pageSize=${pageSize}&offset=${pageParam}`,
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
    const res = await axiosInstance.put(`/recipes/${recipeId}`, data);
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
    const res = await axiosInstance.delete(`/recipes/${recipeId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
