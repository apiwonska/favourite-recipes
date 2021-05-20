import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Icon, { iconEnum } from 'assets/Icon';
import { RecipeInterface } from 'appInterfaces';
import placeholder from 'assets/heather-ford-_U4F6pyOQRs-unsplash.jpg';

import './RecipeItem.css';

interface RecipeItemProps {
  recipe: RecipeInterface['fields'];
}

const RecipeItem: React.FC<RecipeItemProps> = ({
  recipe: { name, note, image, link, locked },
}) => (
  <Col lg={4} sm={6} className="m-0 p-0 d-flex align-items-stretch">
    <Card className="recipe-card flex-grow-1" data-testid="recipe-card">
      <Card.Img
        variant="top"
        src={image || placeholder}
        className="recipe-img"
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{note}</Card.Text>
        <Card.Link href={link} style={{ color: 'blue' }} target="_blank">
          <Icon name={iconEnum.Link} size="1.3em" />
          &nbsp;Go to Recipe
        </Card.Link>
      </Card.Body>
      <Card.Footer className="text-right">
        <Button variant="warning" disabled={locked}>
          Edit
        </Button>
        <Button variant="warning" className="ml-2" disabled={locked}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  </Col>
);

export default RecipeItem;
