/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { UseMutateAsyncFunction } from 'react-query';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import {
  RecipeInterface,
  RecipePayloadInterface,
  AddRecipeFormDataInterface as FormDataInterface,
} from 'appInterfaces';

interface AddRecipeFormInterface {
  mutateAsync: UseMutateAsyncFunction<
    RecipeInterface,
    unknown,
    RecipePayloadInterface,
    unknown
  >;
  isLoading: boolean;
}

const schema = yup.object().shape({
  name: yup.string().trim().required().min(2).max(50),
  note: yup.string().trim().max(100),
  link: yup.string().trim().required().url(),
  image: yup.string().trim().url(),
});

const AddRecipeForm: React.FC<AddRecipeFormInterface> = ({
  mutateAsync,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<FormDataInterface>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  useEffect(() => {
    setFocus('name');
  }, []);

  return (
    <>
      <Form
        name="add-recipe"
        onSubmit={handleSubmit(async (data) => {
          await mutateAsync({ fields: data });
          reset();
        })}
      >
        <Form.Group controlId="ar-name">
          <Form.Label>Recipe name</Form.Label>
          <Form.Control
            type="text"
            {...register('name')}
            aria-invalid={!!errors.name}
          />
          <Form.Text className="text-muted">
            This field is required. Name must be between 2 and 50 characters.
          </Form.Text>
          {errors.name && (
            <Alert variant="danger" className="mt-2">
              {errors.name.message}
            </Alert>
          )}
        </Form.Group>

        <Form.Group controlId="ar-note">
          <Form.Label>Your notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register('note')}
            aria-invalid={!!errors.note}
          />
          <Form.Text className="text-muted">
            Note must be at most 100 characters.
          </Form.Text>
          {errors.note && (
            <Alert variant="danger" className="mt-2">
              {errors.note.message}
            </Alert>
          )}
        </Form.Group>
        <Form.Group controlId="ar-link">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            {...register('link')}
            aria-invalid={!!errors.link}
          />
          <Form.Text className="text-muted">This field is required</Form.Text>
          {errors.link && (
            <Alert variant="danger" className="mt-2">
              {errors.link.message}
            </Alert>
          )}
        </Form.Group>

        <Form.Group controlId="ar-image">
          <Form.Label>Image url</Form.Label>
          <Form.Control
            type="text"
            {...register('image')}
            aria-invalid={!!errors.image}
          />
          {errors.image && (
            <Alert variant="danger" className="mt-2">
              {errors.image.message}
            </Alert>
          )}
        </Form.Group>
        <div className="text-right">
          <Button
            variant="secondary"
            onClick={() => {
              history.goBack();
            }}
            className="m-2"
          >
            Cancel
          </Button>
          <Button
            variant="warning"
            type="submit"
            disabled={isLoading}
            className="m-2"
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-2"
              />
            )}
            Submit Recipe
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddRecipeForm;
