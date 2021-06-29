/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'shared/yup-extended';
import { useHistory } from 'react-router-dom';
import { UseMutateAsyncFunction } from 'react-query';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { IRecipe, ICategory } from 'appInterfaces';

export interface IFormData {
  name: string;
  note: string;
  link: string;
  image: string;
  categories: string[];
}

interface IUpdateRecipeFormProps {
  recipeData: IRecipe;
  mutateAsync: UseMutateAsyncFunction<
    IRecipe,
    unknown,
    { recipeId: string; recipeFormData: IFormData },
    unknown
  >;
  isLoading: boolean;
  categories: ICategory[];
}

const schema = yup.object().shape({
  name: yup.string().trim().required().min(2).max(50),
  note: yup.string().trim().max(100),
  link: yup.string().trim().required().url(),
  image: yup.string().trim().url().isJpegImage().maxImageSize(300),
});

const UpdateRecipeForm: React.FC<IUpdateRecipeFormProps> = ({
  recipeData,
  mutateAsync,
  isLoading,
  categories,
}) => {
  const defaultFormValues: IFormData = {
    name: recipeData.fields.name,
    note: recipeData.fields.note || '',
    link: recipeData.fields.link,
    image: recipeData.fields.image || '',
    categories: recipeData.fields.categories || [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty },
    setFocus,
    reset,
  } = useForm<IFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const { id: recipeId } = recipeData;

  useEffect(() => {
    setFocus('name');
  }, []);

  return (
    <>
      {isSubmitSuccessful && !isDirty && (
        <Alert variant="success">Recipe was saved!</Alert>
      )}

      <Form
        name="add-recipe"
        onSubmit={handleSubmit(async (data) => {
          await mutateAsync({ recipeId, recipeFormData: data });
          reset(undefined, {
            keepDirty: false,
            keepValues: true,
          });
        })}
      >
        <Form.Group controlId="ur-name">
          <Form.Label>Recipe name</Form.Label>
          <Form.Control
            type="text"
            {...register('name')}
            aria-invalid={!!errors.name}
          />
          <Form.Text className="text-muted">
            This field is required. The name must be between 2 and 50
            characters.
          </Form.Text>
          {errors.name && (
            <Alert variant="danger" className="mt-2">
              {errors.name.message}
            </Alert>
          )}
        </Form.Group>

        <Form.Group controlId="ur-note">
          <Form.Label>Your notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register('note')}
            aria-invalid={!!errors.note}
          />
          <Form.Text className="text-muted">
            A note must be at most 100 characters.
          </Form.Text>
          {errors.note && (
            <Alert variant="danger" className="mt-2">
              {errors.note.message}
            </Alert>
          )}
        </Form.Group>
        <Form.Group controlId="ur-link">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            {...register('link')}
            aria-invalid={!!errors.link}
          />
          <Form.Text className="text-muted">This field is required.</Form.Text>
          {errors.link && (
            <Alert variant="danger" className="mt-2">
              {errors.link.message}
            </Alert>
          )}
        </Form.Group>

        <Form.Group controlId="ur-image">
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

        <Form.Group controlId="ur-categories">
          <Form.Label>Categories</Form.Label>
          <Form.Control as="select" multiple {...register('categories')}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.fields.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <div className="text-right">
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
            Save Recipe
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              history.goBack();
            }}
            className="m-2"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UpdateRecipeForm;
