import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { RecipeInterface } from 'app_interfaces';
import RecipeItem from '../RecipeItem';
import useFetchRecipes from './useFetchRecipes';

const RecipeList: React.FC = () => {
  const { data, isLoading, isError } = useFetchRecipes();
  if (isLoading) {
    return (
      <Spinner animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger">Error occured. Please try again later</Alert>
    );
  }

  return (
    <>
      <h2 className="m-5">Your Recipes!</h2>
      {data?.records.map((recipe: RecipeInterface) => (
        <RecipeItem key={recipe.id} recipe={recipe.fields} />
      ))}
    </>
  );
};
export default RecipeList;
