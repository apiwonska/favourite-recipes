import Spinner from 'react-bootstrap/Spinner';
import CardDeck from 'react-bootstrap/CardDeck';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { IRecipe, IRecipeData } from 'appInterfaces';
import RecipeItem from '../RecipeItem';
import useFetchRecipes from './useFetchRecipes';

interface IRecipeList {
  searchText: string;
}

const RecipeList: React.FC<IRecipeList> = ({ searchText }) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchRecipes(searchText);

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
          ? `Error occured while loading recipes. ${error.message}`
          : 'Error occured while loading recipes.'}
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
    </>
  );
};
export default RecipeList;
