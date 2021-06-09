import axios, { CancelTokenSource } from 'axios';

import { IRecipeData, IRecipe } from 'appInterfaces';
import { IFormData as IAddRecipeFormData } from 'pages/AddRecipePage/AddRecipeForm';
import { IFormData as IUpdateRecipeFormData } from 'pages/UpdateRecipePage/UpdateRecipeForm';
import axiosInstance, { url } from 'apis/recipesAxiosInstance';

export const getUrl = (path: string): string => url + path;

export const fetchRecipe = async (recipeId: string): Promise<IRecipe> => {
  try {
    const res = await axiosInstance.get(`/recipes/${recipeId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

interface IFetchRecipesArgs {
  queryKey: [string, { searchText: string }];
  pageParam?: string;
}

let cancelFetchRecipes: CancelTokenSource | null = null;

export const fetchRecipes = async ({
  queryKey,
  pageParam = '',
}: IFetchRecipesArgs): Promise<IRecipeData> => {
  const searchText = queryKey[1].searchText.toLowerCase();
  const pageSize = 6;

  // Query parameters
  // Same order as in a specified view (otherwise it's random)
  const view = 'view=grid';
  // Sort from most recently created
  const sort = 'sort%5B0%5D%5Bfield%5D=created&sort%5B0%5D%5Bdirection%5D=desc';
  // Ignore records that have empty name or link field
  const filterByFormula = (optionalFilters = ''): string =>
    `filterByFormula=AND(${optionalFilters}NOT(name%3D'')%2CNOT(link%3D''))`;
  let optionalFilters = '';
  if (searchText.length) {
    // Search for the phrase in name and note fields
    optionalFilters += `OR(SEARCH(%22${searchText}%22%2CLOWER(name))%2CSEARCH(%22${searchText}%22%2CLOWER(note)))%2C`;
  }
  const recipeViewParams = `${view}&${filterByFormula(
    optionalFilters
  )}&${sort}`;

  // Cancelling previous request
  if (cancelFetchRecipes) cancelFetchRecipes.cancel();
  const { CancelToken } = axios;
  cancelFetchRecipes = CancelToken.source();

  try {
    const res = await axiosInstance.get(
      `/recipes?${recipeViewParams}&pageSize=${pageSize}&offset=${pageParam}`,
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
