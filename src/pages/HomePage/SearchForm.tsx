import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import useCategories from 'shared/useCategories';

interface ISearchFormProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchCategory: string;
  setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<ISearchFormProps> = ({
  searchText,
  setSearchText,
  searchCategory,
  setSearchCategory,
}) => {
  const { categories } = useCategories();

  return (
    <Form>
      <Form.Row>
        <Col sm className="mb-2">
          <FormControl
            type="search"
            placeholder="Search recipes"
            aria-label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col sm>
          <Form.Group>
            <Form.Control
              as="select"
              aria-label="Choose recipe category"
              value={searchCategory}
              onChange={(e) => {
                setSearchCategory(e.target.value);
              }}
            >
              <option value="">Select Category...</option>
              {categories?.map((category) => (
                <option value={category.fields.name} key={category.id}>
                  {category.fields.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
