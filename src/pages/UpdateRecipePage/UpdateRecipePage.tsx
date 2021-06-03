import { useParams, Link } from 'react-router-dom';
import { useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import Icon, { iconEnum } from 'assets/Icon';
import { fetchRecipe, updateRecipe } from 'apis/recipes';
import useTitle from 'shared/useTitle';
import Form from './UpdateRecipeForm';

const UpdateRecipe: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const { data, isError: isQueryError, isSuccess: isQuerySuccess } = useQuery(
    ['recipe', recipeId],
    () => fetchRecipe(recipeId)
  );
  // console.log(data);
  const {
    mutateAsync,
    isLoading: isUpdating,
    isError: isUpdateError,
    isSuccess: isUpdateSuccess,
  } = useMutation(updateRecipe, {
    retry: 1,
    onSuccess: () => {
      if (linkRef.current) linkRef.current.focus();
    },
  });
  useTitle('Update Recipe');

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
          <h2 className=" mb-5 text-center">Update New Recipe</h2>

          {isUpdateSuccess && (
            <Alert variant="success">Recipe was saved!</Alert>
          )}

          {isQueryError ||
            (isUpdateError && (
              <Alert variant="danger">
                Error occurred. Please try again later
              </Alert>
            ))}

          {isQuerySuccess && !!data && (
            <Form
              {...{ recipeData: data, mutateAsync, isLoading: isUpdating }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateRecipe;
