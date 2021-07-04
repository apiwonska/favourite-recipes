import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import Icon, { iconEnum } from 'assets/Icon';
import { IRecipe } from 'appInterfaces';
import placeholder from 'assets/heather-ford-_U4F6pyOQRs-unsplash.jpg';
import { deleteRecipe } from 'api';
import useCategories from 'shared/useCategories';
import './RecipeItem.css';

export interface IRecipeItemProps {
  recipeId: string;
  recipe: IRecipe['fields'];
}

const RecipeItem: React.FC<IRecipeItemProps> = ({
  recipeId,
  recipe: { name, note, image, link, locked, categories },
}) => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { mutate, isLoading } = useMutation(deleteRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
  const { categories: allCategories } = useCategories();
  const [imgSrc, setImgSrc] = useState<string>('');

  useEffect(() => {
    setImgSrc(image || placeholder);
  }, [image]);

  const handleSrcError = () => {
    if (imgSrc === placeholder) {
      setImgSrc('');
    } else if (imgSrc) {
      setImgSrc(placeholder);
    }
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      mutate(recipeId);
    }
  };

  return (
    <Col
      lg={4}
      sm={6}
      className="m-0 p-0 d-flex align-items-stretch flex-grow-1"
    >
      <Card className="recipe-card flex-grow-1" data-testid="recipe-card">
        <Card.Img
          variant="top"
          src={imgSrc}
          className="recipe-img"
          onError={handleSrcError}
          aria-hidden
          data-testid="card-img"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{name}</Card.Title>

          {allCategories && categories && (
            <div className="mb-3">
              {categories.map((categoryId) => (
                <span
                  className="badge badge-secondary mr-2"
                  key={categoryId}
                  data-testid="category-tag"
                >
                  {
                    allCategories.find((category) => category.id === categoryId)
                      ?.fields?.name
                  }
                </span>
              ))}
            </div>
          )}
          <Card.Text className="flex-grow-1">{note}</Card.Text>
          <Card.Link href={link} style={{ color: 'blue' }} target="_blank">
            <Icon name={iconEnum.Link} size="1.3em" />
            &nbsp;Go to Recipe
          </Card.Link>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            variant="warning"
            disabled={locked}
            onClick={() => history.push(`/update/${recipeId}`)}
          >
            Edit
          </Button>
          <Button
            variant="warning"
            className="ml-2"
            disabled={locked}
            onClick={handleDelete}
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
            &nbsp; Delete
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default RecipeItem;
