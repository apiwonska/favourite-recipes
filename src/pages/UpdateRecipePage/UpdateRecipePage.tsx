import { useParams } from 'react-router-dom';

const UpdateRecipe: React.FC = () => {
  // const { recipeId } = useParams();
  console.log(useParams());

  return (
    <div>
      <h3>Update Recipe</h3>
      {/* <h3>Update Recipe. ID: {recipeId}</h3> */}
    </div>
  );
};

export default UpdateRecipe;
