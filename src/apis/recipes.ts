import {
  RecipeDataInterface,
  RecipeInterface,
  RecipePayloadInterface,
  ApiDeleteRecipeReturnValue,
} from 'appInterfaces';
import axiosInstance, { url } from 'apis/recipesAxiosInstance';

export const getUrl = (path: string): string => url + path;
const view = 'view=grid';
const formula = "filterByFormula=AND(NOT(name+%3D+'')%2C+NOT(link+%3D+''))";
const sort = 'sort%5B0%5D%5Bfield%5D=created&sort%5B0%5D%5Bdirection%5D=desc';
const recipeViewParams = `${view}&${formula}&${sort}`;

export const fetchRecipes = async ({
  pageParam = '',
}: {
  pageParam?: string;
}): Promise<RecipeDataInterface> => {
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
  recipeData: RecipePayloadInterface
): Promise<RecipeInterface> => {
  try {
    const res = await axiosInstance.post('/recipes', recipeData);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteRecipe = async (
  recipeId: string
): Promise<ApiDeleteRecipeReturnValue> => {
  try {
    const res = await axiosInstance.delete(`/recipes/${recipeId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
