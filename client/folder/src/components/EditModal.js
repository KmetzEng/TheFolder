import { React } from 'react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const EditModal = (props) => {

  const { 
    recipe,
    mealTypeList,
    tagList,
    cuisineTypeList,
    show,
    handleClose,
    editTitle,
    editURL,
    editNotes,
    editTagsFromDropDown,
    editTagsFromTextBox,
    editCuisine,
    editMealType
  } = props;

  const submitEditRecipe = async () => {
    await fetch(`http://localhost:3001/recipes/update-full-recipe/${recipe._id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "newRecipeTitle": recipe.recipeTitle,
        "newRecipeURL": recipe.recipeURL,
        "newRecipeNotes": recipe.notes,
        "newRecipeTags": recipe.tags,
        "newRecipeCuisine": recipe.cuisineType,
        "newRecipeMeal": recipe.mealType
      })
    });

    handleClose();
    window.location.reload();
  }

  return (
    <Modal show={show} onHide={ handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>Edit Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="md" className="my-1">
          <InputGroup.Text id="recipe-title-input">Recipe Title</InputGroup.Text>
          <FormControl aria-label="Recipe Title" aria-describedby="recipe-title-input" value={recipe.recipeTitle} onChange={(e) => editTitle(e.target.value) } />
        </InputGroup>
        <InputGroup size="md" className="my-1">
          <InputGroup.Text id="recipe-url-input">Recipe URL</InputGroup.Text>
          <FormControl aria-label="Recipe URL" aria-describedby="recipe-url-input" value={recipe.recipeURL} onChange={(e) => editURL(e.target.value) } />
        </InputGroup>
        <InputGroup size="md" className="my-1">
          <DropdownButton
              as={InputGroup.Prepend}
              variant="secondary"
              title="Meal Type"
              id="meal-type-dropdown"
          >
          {mealTypeList.map((val, key) => {
              return (
                  <Dropdown.Item key={key} onClick={() => editMealType(val) }>{val}</Dropdown.Item>
              )
          })}
          </DropdownButton>
          <FormControl aria-label="Recipe Meal" aria-describedby="inputGroup-sizing-md" value={recipe.mealType} onChange={(e) => editMealType(e.target.value)} />
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
                  <Dropdown.Item key={key} onClick={() => editCuisine(val) }>{val}</Dropdown.Item>
              )
          })}
          </DropdownButton>
          <FormControl aria-label="Cuisine Type" aria-describedby="inputGroup-sizing-md" value={recipe.cuisineType} onChange={(e) => editCuisine(e.target.value)} />
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
                  <Dropdown.Item key={key} onClick={() => { editTagsFromDropDown(val) }}>{val}</Dropdown.Item>
              )
          })}
          </DropdownButton>
          <FormControl aria-label="Recipe Meal" aria-describedby="inputGroup-sizing-md" value={recipe.tags} onChange={(e) => editTagsFromTextBox(e.target.value)} />
        </InputGroup>
        <InputGroup size="md" className="my-1">
          <InputGroup.Text id="recipe-notes-input">Notes</InputGroup.Text>
          <FormControl as="textarea" aria-label="Recipes Notes" aria-describedby="recipe-notes-input" value={recipe.notes} onChange={(e) => editNotes(e.target.value)} />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>Cancel</Button>
        <Button variant="primary" onClick={ submitEditRecipe }>Save Recipe</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;