import { useQuery } from 'react-query';
import { fetchRecipes } from 'api';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import RecipeItem from '../RecipeItem';

const RecipeList = () => {
  const { data, isLoading, isError, error } = useQuery('recipes', fetchRecipes);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" variant="secondary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // console.log(data.records);

  return (
    <>
      <h2 className="m-5">Your Recipes!</h2>
      {data.records.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe.fields} />
      ))}
    </>
  );
};
export default RecipeList;
