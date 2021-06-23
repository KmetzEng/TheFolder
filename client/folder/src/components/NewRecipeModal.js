import { React } from 'react';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const NewRecipeModal = (props) => {

    const { 
        newRecipe,
        mealTypeList,
        tagList,
        cuisineTypeList,
        show,
        submit,
        handleClose,
        editNewRecipeTitle,
        editNewRecipeURL, 
        editNewRecipeMealType,
        editNewRecipeCuisine,
        editNewRecipeTagsFromDropDown,
        editNewRecipeTagsFromTextBox, 
        editNewRecipeNotes 
    } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup size="md" className="my-1">
                    <InputGroup.Text id="recipe-title-input">Recipe Title</InputGroup.Text>
                    <FormControl aria-label="Recipe Title" aria-describedby="recipe-title-input" onChange={(e) => editNewRecipeTitle(e.target.value)} />
                </InputGroup>
                <InputGroup size="md" className="my-1">
                    <InputGroup.Text id="recipe-url-input">Recipe URL</InputGroup.Text>
                    <FormControl aria-label="Recipe URL" aria-describedby="recipe-url-input" onChange={(e) => editNewRecipeURL(e.target.value)} />
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
                            <Dropdown.Item key={key} onClick={() => editNewRecipeMealType(val) }>{val}</Dropdown.Item>
                        )
                    })}
                    </DropdownButton>
                    <FormControl aria-label="Recipe Meal" aria-describedby="inputGroup-sizing-md" value={newRecipe.mealType} onChange={(e) => editNewRecipeMealType(e.target.value)} />
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
                            <Dropdown.Item key={key} onClick={() => editNewRecipeCuisine(val) }>{val}</Dropdown.Item>
                        )
                    })}
                    </DropdownButton>
                    <FormControl aria-label="Cuisine Type" aria-describedby="inputGroup-sizing-md" value={newRecipe.recipeType} onChange={(e) => editNewRecipeCuisine(e.target.value)} />
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
                            <Dropdown.Item key={key} onClick={() => { editNewRecipeTagsFromDropDown(val) }}>{val}</Dropdown.Item>
                        )
                    })}
                    </DropdownButton>
                    <FormControl aria-label="Recipe Meal" aria-describedby="inputGroup-sizing-md" value={newRecipe.recipeTags} onChange={(e) => editNewRecipeTagsFromTextBox(e.target.value)} />
                </InputGroup>
                <InputGroup size="md" className="my-1">
                    <InputGroup.Text id="recipe-notes-input">Notes</InputGroup.Text>
                    <FormControl as="textarea" aria-label="Recipes Notes" aria-describedby="recipe-notes-input" onChange={(e) => editNewRecipeNotes(e.target.value)} />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={ (e) => submit() }>Save Recipe</Button>
            </Modal.Footer>
    </Modal>
    );
}

export default NewRecipeModal;