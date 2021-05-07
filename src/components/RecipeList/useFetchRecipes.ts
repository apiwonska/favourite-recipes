import { useQuery } from 'react-query';
import { fetchRecipes } from 'api';
import { RecipeDataInterface } from 'app_interfaces';

interface HookReturnValuesInterface {
  data: RecipeDataInterface | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const useFetchRecipes = (): HookReturnValuesInterface => {
  const { data, isLoading, isError, error } = useQuery<
    RecipeDataInterface,
    Error
  >('recipes', fetchRecipes, { retry: false });
  return { data, isLoading, isError, error };
};

export default useFetchRecipes;
