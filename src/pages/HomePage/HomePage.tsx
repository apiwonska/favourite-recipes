import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import RecipeList from './RecipeList';

const HomePage: React.FC = () => (
  <>
    <Container className="d-flex justify-content-end">
      <Link to="/add" className="btn btn-warning">
        Add New Recipe
      </Link>
    </Container>
    <h2 className="m-5">Your Recipes!</h2>
    <RecipeList />
  </>
);
export default HomePage;
