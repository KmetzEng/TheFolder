import { React } from 'react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const FilterModal = (props) => {

  const { 
    filters,
    recipeList,
    show,
    handleFilter,
    handleClose,
    mealTypeList,
    tagList,
    cuisineTypeList,
    filterTags,
    filterCuisine,
    filterMealType,
    filterRecipeList,
    filterList
  } = props;

  const applyFilters = async () => {
    
    let filteredRecipeList = await recipeList.filter(recipe => recipe.mealType === filters.filterMealType 
                                                      || recipe.cuisineType === filters.filterCuisine 
                                                      || recipe.tags.some( tag => filters.filterTags.includes(tag))
                                              );

    filterRecipeList(filteredRecipeList);

    handleFilter();
  };

  const clearFilters = () => {
    filterList(false);
    handleClose();
  };

  return (
    <Modal show={show} onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Recipe Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="md" className="my-1">
          <DropdownButton
              as={InputGroup.Prepend}
              variant="secondary"
              title="Meal Type"
              id="meal-type-dropdown"
          >
          {mealTypeList.map((val, key) => {
              return (
                  <Dropdown.Item key={key} onClick={() => filterMealType(val) }>{val}</Dropdown.Item>
              )
          })}
          </DropdownButton>
          <FormControl aria-label="Recipe Meal" aria-describedby="inputGroup-sizing-md" value={filters.filterMealType} onChange={(e) => filterMealType(e.target.value)} />
        </InputGroup>
        <InputGroup size="md" className="my-1">
          <DropdownButton
              as={InputGroup.Prepend}
              variant="secondary"
              title="Cuisine"
              id="cuisine-type-dropdown"
          >
          {cuisineTypeList.map((val, key) => {
              return (
                  <Dropdown.Item key={key} onClick={() => filterCuisine(val) }>{val}</Dropdown.Item>
              )
          })}
          </DropdownButton>
          <FormControl aria-label="Cuisine Type" aria-describedby="inputGroup-sizing-md" value={filters.filterCuisine} onChange={(e) => filterCuisine(e.target.value)} />
        </InputGroup>
        <InputGroup size="md" className="my-1">
          <DropdownButton
              as={InputGroup.Prepend}
              variant="secondary"
              title="Tags"
              id="recipe-tags-dropdown"
          >
          {tagList.map((val, key) => {
              return (
                  <Dropdown.Item key={key} onClick={() => { filterTags(val) }}>{val}</Dropdown.Item>
              )
          })}
          </DropdownButton>
          <FormControl aria-label="Recipe Tags" aria-describedby="inputGroup-sizing-md" value={filters.filterTags} onChange={(e) => filterTags(e.target.value)} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ clearFilters }>Clear</Button>
        <Button variant="primary" onClick={ applyFilters }>Apply</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilterModal;