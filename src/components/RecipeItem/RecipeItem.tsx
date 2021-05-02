import Card from 'react-bootstrap/Card';
import Icon, { iconEnum } from 'assets/Icon';
import { RecipeInterface } from '../RecipeList';

interface RecipeItemProps {
  recipe: RecipeInterface['fields'];
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => (
  <Card className="m-2 w-100">
    <Card.Body>
      <Card.Title>{recipe.name}</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card&apos;s content.
      </Card.Text>
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
