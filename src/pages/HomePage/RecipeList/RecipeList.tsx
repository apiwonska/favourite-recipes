import Spinner from 'react-bootstrap/Spinner';
import CardDeck from 'react-bootstrap/CardDeck';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { IRecipe, IRecipeData } from 'appInterfaces';
import { capitalizeFirstLetter } from 'shared/utils';
import RecipeItem from '../RecipeItem';
import useFetchRecipes from './useFetchRecipes';

export interface IRecipeListProps {
  searchText: string;
  searchCategory: string;
}

const RecipeList: React.FC<IRecipeListProps> = ({
  searchText,
  searchCategory,
}) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchRecipes(searchText, searchCategory);

  if (isLoading) {
    return (
      <Spinner
        animation="border"
        role="status"
        variant="secondary"
        className="my-4"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger">
        {error?.message
          ? `Error occured while loading recipes. ${capitalizeFirstLetter(
              error.message as string
            )}.`
          : 'Error occured while loading recipes.'}
      </Alert>
    );
  }

  if (!data?.pages[0].records.length) {
    return (
      <Alert variant="secondary">
        No recipes found{' '}
        <span role="img" aria-hidden>
          &#128577;
        </span>
      </Alert>
    );
  }
  return (
    <>
      <CardDeck className="container-fluid">
        {data?.pages.map((page: IRecipeData) =>
          page.records.map((recipe: IRecipe) => (
            <RecipeItem
              key={recipe.id}
              recipe={recipe.fields}
              recipeId={recipe.id}
            />
          ))
        )}
      </CardDeck>
      {hasNextPage && (
        <Button
          variant="secondary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className=" mt-3 d-flex justify-content-center align-items-center"
        >
          {isFetchingNextPage && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
            />
          )}
          Load more
        </Button>
      )}
    </>
  );
};
export default RecipeList;
