import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import RecipeList from './RecipeList';

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <>
      <Container className="d-flex justify-content-end">
        <Form className="d-flex mr-2">
          <FormControl
            type="search"
            placeholder="Search recipes"
            className="mr-2"
            aria-label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Form>
        <Link to="/add" className="btn btn-warning">
          Add New Recipe
        </Link>
      </Container>
      <h2 className="m-5">Your Recipes!</h2>
      <RecipeList searchText={searchText} />
    </>
  );
};
export default HomePage;
