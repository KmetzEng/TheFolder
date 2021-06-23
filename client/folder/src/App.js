import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import EditModal from './components/EditModal';
import NewRecipeModal from './components/NewRecipeModal';
import FilterModal from './components/FilterModal';

function App() {

  const [show, setShow] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [isListFiltered, setIsListFiltered] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [mealTypeList, setMealTypeList] = useState([]);
  const [cuisineTypeList, setCuisineTypeList] = useState([]);
  const [newRecipe, setNewRecipe] = useState({});
  const [editRecipe, setEditRecipe] = useState({});
  const [filters, setFilters] = useState({});

  // New Recipe Modal display helpers
  const handleShow = () => {
    setNewRecipe(defaultRecipe);
    setUpdates(false);
    setShow(true);
  };

  // Cancel Button Clicked
  const handleClose = () =>  {
    setFilters({
      filterMealType: "",
      filterCuisine: "",
      filterTags: []
    });
    setShow(false);
    setDisplayEdit(false);
    setDisplayFilter(false);
    setNewRecipe(defaultRecipe);
    setUpdates(true);
  };

  const handleFilterClose = () => {
    setIsListFiltered(true);
    setDisplayFilter(false);
    setUpdates(true);
  }

  // Submit button clicked
  const submitNewRecipe = async () => {

    await fetch('/recipes/add-recipe', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newRecipe)
    })

    setNewRecipe(defaultRecipe);
    setUpdates(true);
    setShow(false);
  };

  // Edit button clicked
  const modifyRecipe = async (id) => {
    setUpdates(false);

    await fetch(`/recipes/get-recipe-by-id/${id}`)
      .then(res => res.json())
      .then(data => setEditRecipe(data));
    
    setDisplayEdit(true);
  };

  // Filters button clicked
  const openFiltersMenu = () => {
    setUpdates(false);
    setFilters({
      filterMealType: "",
      filterCuisine: "",
      filterTags: []
    });
    setDisplayFilter(true);
  }

  // Delete button clicked
  const deleteRecipe = async (id) => {
    setUpdates(false);
    
    await fetch(`http://localhost:3001/recipes/delete-recipe/${id}`, {
      method: 'DELETE'
    });
    
    setUpdates(true);
  };


  const filterRecipeList = (filteredList) => {
    setRecipeList(filteredList);
    setIsListFiltered(true);
  };


  // New Recipe Helpers
  const editNewRecipeTitle = (title) => { setNewRecipe({ ...newRecipe, recipeTitle: title }) };
  const editNewRecipeURL = (url) => { setNewRecipe({ ...newRecipe, recipeURL: url }) };
  const editNewRecipeNotes = (notes) => { setNewRecipe({ ...newRecipe, recipeNotes: notes }) };
  const editNewRecipeTagsFromDropDown = (tag) => { setNewRecipe({ ...newRecipe, recipeTags: [...newRecipe.recipeTags, tag] }) };
  const editNewRecipeTagsFromTextBox = (tags) => { setNewRecipe({ ...newRecipe, recipeTags: [tags] }) };
  const editNewRecipeCuisine = (cuisine) => { setNewRecipe({ ...newRecipe, recipeType: cuisine }) };
  const editNewRecipeMealType= (mealType) => { setNewRecipe({ ...newRecipe, mealType: mealType }) };


  // Edit Recipe Helpers
  const editTitle = (title) => { setEditRecipe({ ...editRecipe, recipeTitle: title }) };
  const editURL = (url) => { setEditRecipe({ ...editRecipe, recipeURL: url }) };
  const editNotes = (notes) => { setEditRecipe({ ...editRecipe, notes: notes }) };
  const editTagsFromDropDown = (tag) => { setEditRecipe({ ...editRecipe, tags: [...editRecipe.tags, tag] }) };
  const editTagsFromTextBox = (tags) => { setEditRecipe({ ...editRecipe, tags: [tags] }) };
  const editCuisine = (cuisine) => { setEditRecipe({ ...editRecipe, cuisineType: cuisine }) };
  const editMealType= (mealType) => { setEditRecipe({ ...editRecipe, mealType: mealType }) };


  // Filter Helpers
  const filterTags = (tags) => { setFilters({ ...filters, filterTags: [tags] }) };
  const filterCuisine = (cuisine) => { setFilters({ ...filters, filterCuisine: cuisine }) };
  const filterMealType = (mealType) => { setFilters({ ...filters, filterMealType: mealType }) };
  const filterList = (filtered) => { setIsListFiltered(filtered) };

  // standard variables
  const defaultRecipe = {
  recipeTitle: '',
    recipeURL: '',
    recipeNotes: '',
    recipeTags: [],
    recipeType: '',
    mealType: ''
  };


  // SETUP ON LOAD
  useEffect(() => {
    
    if (!isListFiltered) {
      fetch('/recipes/get-all-recipes/')
        .then(res => res.json())
        .then(data => setRecipeList(data));
    }

    fetch('/recipes/get-distinct-meal-types')
      .then(res => res.json())
      .then(data => setMealTypeList(data));
    
    fetch('/recipes/get-distinct-cuisines')
      .then(res => res.json())
      .then(data => setCuisineTypeList(data));

    fetch('/recipes/get-distinct-tags')
      .then(res => res.json())
      .then(data => setTagList(data));

  }, [updates, isListFiltered, recipeList]);


  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col className="mt-4">
            <h1 className="display-3">The Folder</h1>
          </Col>
        </Row>
        <Row>
          <Col className="mt-1">
            <Button variant="primary" onClick={handleShow} className="mx-1">New Recipe</Button>
            <Button variant="primary" className="mx-1" onClick={openFiltersMenu}>Filter</Button>
          </Col>
        </Row>

        <Table striped bordered className="mt-4">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Recipe</th>
              <th style={{ width: '12%' }}>Meal</th>
              <th style={{ width: '12%' }}>Cuisine</th>
              <th style={{ width: '25%' }}>Tags</th>
              <th style={{ width: '25%' }}>Notes</th>
              <th style={{ width: '6%' }}></th>
            </tr>
          </thead>
          <tbody>
            {recipeList.map((val, key) => {
              return (
                <tr key={key}>
                  <td onClick={() => window.location.href = val.recipeURL} >{val.recipeTitle}</td>
                  <td>{val.mealType}</td>
                  <td>{val.cuisineType}</td>
                  <td>
                    <ul>
                    {val.tags.map((v, k) => {
                      return (
                        <li key={k} className="m-1">{v}</li>
                      )
                    })}
                    </ul>
                  </td>
                  <td>{val.notes}</td>
                  <td>
                    <ButtonGroup vertical>
                      <Button variant="secondary" onClick={() => modifyRecipe(val._id)}>Edit</Button>
                      <Button variant="danger" onClick={() => deleteRecipe(val._id)}>Delete</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>

      <EditModal 
        recipe={editRecipe}
        mealTypeList={mealTypeList}
        tagList={tagList}
        cuisineTypeList={cuisineTypeList}
        show={displayEdit}
        handleClose={handleClose}
        editTitle={editTitle}
        editURL={editURL}
        editNotes={editNotes}
        editTagsFromDropDown={editTagsFromDropDown}
        editTagsFromTextBox={editTagsFromTextBox}
        editCuisine={editCuisine}
        editMealType={editMealType}
      />
      <NewRecipeModal
        newRecipe={newRecipe}
        mealTypeList={mealTypeList}
        tagList={tagList}
        cuisineTypeList={cuisineTypeList}
        show={show}
        submit={submitNewRecipe}
        handleClose={handleClose}
        editNewRecipeTitle={editNewRecipeTitle}
        editNewRecipeURL={editNewRecipeURL}
        editNewRecipeMealType={editNewRecipeMealType}
        editNewRecipeCuisine={editNewRecipeCuisine}
        editNewRecipeTagsFromDropDown={editNewRecipeTagsFromDropDown}
        editNewRecipeTagsFromTextBox={editNewRecipeTagsFromTextBox}
        editNewRecipeNotes={editNewRecipeNotes}
      />
      <FilterModal
        filters={filters}
        recipeList={recipeList}
        show={displayFilter}
        handleFilter={handleFilterClose}
        handleClose={handleClose}
        tagList={tagList}
        cuisineTypeList={cuisineTypeList}
        mealTypeList={mealTypeList}
        filterTags={filterTags}
        filterCuisine={filterCuisine}
        filterMealType={filterMealType}
        filterRecipeList={filterRecipeList}
        filterList={filterList}
      />
    </div>
  );
}

export default App;
