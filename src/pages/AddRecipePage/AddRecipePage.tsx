import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Icon, { iconEnum } from 'assets/Icon';

// import Form from './AddRecipeForm';

const AddRecipe: React.FC = () => (
  <Container>
    <div className="text-left">
      <Link
        to="/"
        className="btn btn-secondary m-2 justify-content-center align-items-center"
      >
        <Icon name={iconEnum.LeftArrow} size="16px" />
        &nbsp;Go To Home Page
      </Link>
    </div>
    <Row className="justify-content-center">
      <Col className="col-lg-8 my-4 text-left">
        <h2 className=" mb-5 text-center">Add New Recipe!</h2>

        <Form name="add-recipe">
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Recipe title</Form.Label>
            <Form.Control type="text" />
            <Form.Text className="text-muted">This field is required</Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your notes</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group controlId="formBasicLink">
            <Form.Label>Link</Form.Label>
            <Form.Control type="text" />
            <Form.Text className="text-muted">This field is required</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicImage">
            <Form.Label>Image url</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <div className="text-center">
            <Button variant="warning" type="submit">
              Submit Recipe
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default AddRecipe;
