import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

import RecipeList from './RecipeList';
import SearchForm from './SearchForm';

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('');

  return (
    <>
      <Container fluid>
        <Row className="justify-content-end mb-4">
          <Col sm="auto">
            <Link to="/add" className="btn btn-warning w-100">
              Add New Recipe
            </Link>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col sm={10} md={8}>
            <SearchForm
              {...{
                searchText,
                setSearchText,
                searchCategory,
                setSearchCategory,
              }}
            />
          </Col>
        </Row>
      </Container>

      <h1 className="mb-5 mt-4">Your Recipes!</h1>
      <RecipeList {...{ searchText, searchCategory }} />
    </>
  );
};

export default HomePage;
