import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { RecipeInterface, RecipeDataInterface } from 'appInterfaces';
import RecipeItem from '../RecipeItem';
import useFetchRecipes from './useFetchRecipes';

const RecipeList: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchRecipes();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger">
        {error?.message
          ? `Error. ${error.message}`
          : 'Error occured. Please try again later'}
      </Alert>
    );
  }

  return (
    <>
      <h2 className="m-5">Your Recipes!</h2>
      {data?.pages.map((page: RecipeDataInterface) =>
        page.records.map((recipe: RecipeInterface) => (
          <RecipeItem key={recipe.id} recipe={recipe.fields} />
        ))
      )}
      <Button
        variant="primary"
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
