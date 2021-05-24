import {
  useInfiniteQuery,
  InfiniteData,
  InfiniteQueryObserverResult,
  FetchNextPageOptions,
} from 'react-query';
import { fetchRecipes } from 'api';
import { RecipeDataInterface } from 'appInterfaces';

interface HookReturnValuesInterface {
  data: InfiniteData<RecipeDataInterface> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<RecipeDataInterface, Error>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const useFetchRecipes = (): HookReturnValuesInterface => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<RecipeDataInterface, Error>('recipes', fetchRecipes, {
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
