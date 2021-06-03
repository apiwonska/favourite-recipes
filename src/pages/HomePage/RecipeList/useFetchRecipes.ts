import {
  useInfiniteQuery,
  InfiniteData,
  InfiniteQueryObserverResult,
  FetchNextPageOptions,
} from 'react-query';
import { fetchRecipes } from 'apis/recipes';
import { IRecipeData } from 'appInterfaces';

interface IHookReturn {
  data: InfiniteData<IRecipeData> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<IRecipeData, Error>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const useFetchRecipes = (): IHookReturn => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IRecipeData, Error>('recipes', fetchRecipes, {
    getNextPageParam: (lastPage) => lastPage.offset,
  });
  return {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useFetchRecipes;
