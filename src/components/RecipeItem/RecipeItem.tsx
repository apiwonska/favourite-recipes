import Card from 'react-bootstrap/Card';
import Icon, { iconEnum } from 'assets/Icon';
import { RecipeInterface } from 'appInterfaces';

interface RecipeItemProps {
  recipe: RecipeInterface['fields'];
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => (
  <Card className="m-2 w-100" data-testid="recipe-card">
    <Card.Body>
      <Card.Title>{recipe.name}</Card.Title>
      <Card.Text>{recipe.note}</Card.Text>
      <Card.Link
        href={recipe.link}
        style={{ color: 'blue' }}
        target="_blank"
        className="float-right"
      >
        <Icon name={iconEnum.Link} size="1.3em" />
        &nbsp;Go to Recipe
      </Card.Link>
    </Card.Body>
  </Card>
);

export default RecipeItem;
