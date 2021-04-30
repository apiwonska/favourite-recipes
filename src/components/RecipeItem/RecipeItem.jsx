import Card from 'react-bootstrap/Card';
import Icon from 'assets/Icon';

const RecipeItem = ({ recipe }) => {
  return (
    <Card className="m-2 w-100">
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card&apos;s content.
        </Card.Text>
        <Card.Link
          href={recipe.link}
          style={{ color: 'blue' }}
          target="_blank"
          className="float-right"
        >
          <Icon name="link" size="16px" />
          &nbsp;Go to Recipe
        </Card.Link>
      </Card.Body>
    </Card>
  );
};
export default RecipeItem;
