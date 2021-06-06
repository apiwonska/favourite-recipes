import { IRecipeData, IRecipe } from 'appInterfaces';
import { IFormData as IAddRecipeFormData } from 'pages/AddRecipePage/AddRecipeForm';
import { IFormData as IUpdateRecipeFormData } from 'pages/UpdateRecipePage/UpdateRecipeForm';
import axiosInstance, { url } from 'apis/recipesAxiosInstance';

export const getUrl = (path: string): string => url + path;
const view = 'view=grid';
const formula = "filterByFormula=AND(NOT(name+%3D+'')%2C+NOT(link+%3D+''))";
const sort = 'sort%5B0%5D%5Bfield%5D=created&sort%5B0%5D%5Bdirection%5D=desc';
const recipeViewParams = `${view}&${formula}&${sort}`;

export const fetchRecipe = async (recipeId: string): Promise<IRecipe> => {
  try {
    const res = await axiosInstance.get(`/recipes/${recipeId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchRecipes = async ({
  pageParam = '',
}: {
  pageParam?: string;
}): Promise<IRecipeData> => {
  const pageSize = 6;

  try {
    const res = await axiosInstance.get(
      `/recipes?${recipeViewParams}&pageSize=${pageSize}&offset=${pageParam}`
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
