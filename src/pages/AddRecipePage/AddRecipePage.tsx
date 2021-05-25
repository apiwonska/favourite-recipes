import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import Icon, { iconEnum } from 'assets/Icon';
import { addRecipe } from 'apis/recipes';
import useTitle from 'shared/useTitle';
import Form from './AddRecipeForm';

const AddRecipe: React.FC = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { mutateAsync, isLoading, isError, isSuccess, reset } = useMutation(
    addRecipe,
    {
      retry: 1,
      onSuccess: () => {
        if (linkRef.current) linkRef.current.focus();
      },
    }
  );
  useTitle('Add New Recipe');

  return (
    <Container>
      <div className="text-left">
        <Link
          to="/"
          className="btn btn-secondary m-2 justify-content-center align-items-center"
          ref={linkRef}
        >
          <Icon name={iconEnum.LeftArrow} size="16px" />
          &nbsp;Go To Home Page
        </Link>
      </div>
      <Row className="justify-content-center">
        <Col className="col-lg-8 my-4 text-left">
          <h2 className=" mb-5 text-center">Add New Recipe</h2>
          {isSuccess && (
            <>
              <Alert variant="success">Recipe was saved!</Alert>
              <div className="text-center mt-5">
                <Button onClick={() => reset()} variant="warning">
                  Add another recipe
                </Button>
              </div>
            </>
          )}
          {isError && (
            <Alert variant="danger">
              Error occurred. Please try again later
            </Alert>
          )}
          {!isSuccess && <Form {...{ mutateAsync, isLoading }} />}
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;
