const express = require('express');
const router = express.Router();
const RecipeModel = require('../models/Recipe');

/* RECIPES ROUTE HANDLERS */
/*   /recipes/<YOUR ROUTE HERE>      */

/*****************/
/*  GET FROM DB  */
/*****************/
// Get all recipes
router.get('/get-all-recipes', async (req, res) => {
    await RecipeModel.find({ recipeTitle: { $ne: "__DEBUG__" } }, (err, result) => {
        if (err) {
            res.status(400).json({ msg: `Error: ${err}` });
        }
        res.send(result);
    });
});

// Get recipe by id
router.get('/get-recipe-by-id/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await RecipeModel.findById((id), (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                res.status(400).json({ msg: `Error: ${err}` });
            }
        });
    } catch (err) {
        res.status(400).json({ msg: `Error: Cannot find recipe with id: ${id}` });
    }
});

// Get all recipes of a certain meal type
router.get('/get-recipes-by-meal-type/:type', async (req, res) => {
    const searchType = req.params.type;

    try {
        await RecipeModel.find({ mealType: searchType }, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                res.status(400).json({ msg: `Error: ${err}` });
            }
        })
    } catch (err) {
        res.status(400).json({ msg: `Error: Cannot find meals with type: ${searchType}` });
    }
});

// Get all recipes of a certain cuisine type
router.get('/get-recipes-by-cuisine-type/:type', async (req, res) => {
    const searchType = req.params.type;

    try {
        await RecipeModel.find({ cuisineType: searchType }, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                res.status(400).json({ msg: `Error: ${err}` });
            }
        })
    } catch (err) {
        res.status(400).json({ msg: `Error: Cannot find meals with cuisine type: ${searchType}` });
    }
});

// Get all recipes with certain tags
router.get('/get-recipes-by-tags', async (req, res) => {
    const tagList = req.body.tagList;

    try {
        await RecipeModel.find({ tags: {"$in" : tagList} }, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                res.status(400).json({ msg: `Error: ${err}`});
            }
        })
     } catch (err) {
         res.status(400).json({ msg: `Error: ${err}`});
     }
});

// Get a distinct list of all of the meal types
router.get('/get-distinct-meal-types', async (req, res) => {
	try {
		await RecipeModel.find().distinct('mealType', (err, result) => {
			if (!err) {
				res.send(result);
			} else {
				res.status(400).json({ msg: `Error: ${err}` });
			}
		})
	} catch (err) {
		res.status(400).json({ msg: `Error: ${err}` });
	}
});

// Get a distinct list of all of the tags
router.get('/get-distinct-tags', async (req, res) => {
	try {
		await RecipeModel.find().distinct('tags', (err, result) => {
			if (!err) {
				res.send(result);
			} else {
				res.status(400).json({ msg: `Error: ${err}` });
			}
		})
	} catch (err) {
		res.status(400).json({ msg: `Error: ${err}` });
	}
});

// Get a distinct list of all of the cuisine types
router.get('/get-distinct-cuisines', async (req, res) => {
	try {
		await RecipeModel.find().distinct('cuisineType', (err, result) => {
			if (!err) {
				res.send(result);
			} else {
				res.status(400).json({ msg: `Error: ${err}` });
			}
		})
	} catch (err) {
		res.status(400).json({ msg: `Error: ${err}` });
	}
});

// Get a filtered list of recipes
router.get('/filter-recipes', async (req, res) => {
    const filterMealType = req.query.filterMealType;
    const filterCuisine = req.query.filterCuisine;
    const filterTags = req.query.filterTags;

    try {
        await RecipeModel.find({ 
            mealType: {'$in': filterMealType},
            cuisineType: {'$in': filterCuisine},
            tags: {'$in' : filterTags },
        }, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                res.status(400).json({ msg: `Error: ${err}` });
            }
        });
    } catch (err) {
        res.status(400).json({ msg: `Error: ${err}` });
    }
});

/*******************/
/*  CREATE RECIPE  */
/*******************/
// Add a new recipe to the database
router.post('/add-recipe', async (req, res) => {
    // Get recipe parameters from the request body
    const title = req.body.recipeTitle;
    const url = req.body.recipeURL;
    const tags = req.body.recipeTags;
    const notes = req.body.recipeNotes;
    const cuisine = req.body.recipeType;
    const meal = req.body.mealType;

    // Create a new recipe model
    const recipe = new RecipeModel({
        recipeTitle: title,
        recipeURL: url,
        notes: notes,
        tags: tags,
        cuisineType: cuisine,
        mealType: meal
    });

    try {
        await recipe.save();
        res.status(200).json({
            msg: 'New Recipe Added to Database...'
        });
    } catch (err) {
        res.status(400).json({ msg: '!!! Error - Bad data sent to server. cannot create recipe.', error: `${err}` });
    }
});


/*************/
/*  UPDATES  */
/*************/
// Update recipe title
router.put('/update-title/:id', async (req, res) => {
    const id = req.params.id;
    const newTitle = req.body.newTitle;

    try {
        await RecipeModel.findById(id, (err, titleUpdate) => {
            titleUpdate.recipeTitle = newTitle;
            titleUpdate.save();
            res.status(200).json({ msg: `Recipe Title Updated To: ${newTitle}` });
        })
    } catch (err) {
        res.status(400).json({ msg: `Error: ${err}` });
    }
});

// Update recipe URL
router.put('/update-url/:id', async (req, res) => {
    const id = req.params.id;
    const newURL = req.body.newURL;

    try {
        await RecipeModel.findById(id, (err, urlUpdate) => {
            urlUpdate.recipeURL = newURL;
            urlUpdate.save();
            res.status(200).json({ msg: `Recipe URL Updated To: ${newTitle}` });
        })
    } catch (err) {
        res.status(400).json({ msg: `Error: ${err}` });
    }
});

// Update recipe notes
router.put('/update-notes/:id', async (req, res) => {
    const id = req.params.id;
    const newNotes = req.body.newNotes;

    try {
        await RecipeModel.findById(id, (err, notesUpdate) => {
            notesUpdate.notes = newNotes;
            notesUpdate.save();
            res.status(200).json({ msg: `Recipe Notes Updated To: ${newNotes}` });
        })
    } catch (err) {
        res.status(400).json({ msg: `Error: ${err}` });
    }
});

// Update recipe tags
router.put('/update-tags/:id', async (req, res) => {
    const id = req.params.id;
    const newTags = req.body.newTags;

    try {
        await RecipeModel.findById(id, (err, tagsUpdate) => {
            tagsUpdate.tags = newTags;
            tagsUpdate.save();
            res.status(200).json({ msg: `Recipe Tags Updated to: ${newTags}` });
        })
    } catch (err) {
        res.status(400).json({ msg: `Error: ${err}` });
    }
});

// Update recipe cuisine type
router.put('/update-cuisine/:id', async (req, res) => {
	const id = req.params.id;
	const newCuisine = req.body.newCuisine;

	try {
		await RecipeModel.findById(id, (err, cuisineUpdate) => {
			cuisineUpdate.cuisineType = newCuisine;
			cuisineUpdate.save();
			res.status(200).json({ msg: `Recipe Cuisine Type Updated To: ${newCuisine}` });
		})
	} catch (err) {
		res.status(400).json({ msg: `Error: ${err}` });
	}
});

// Update recipe meal type
router.put('/update-meal-type/:id', async (req, res) => {
    const id = req.params.id;
	const newMealType = req.body.newMealType;

	try {
		await RecipeModel.findById(id, (err, mealTypeUpdate) => {
			mealTypeUpdate.mealType = newMealType;
			mealTypeUpdate.save();
			res.status(200).json({ msg: `Recipe Meal Type Updated To: ${newMealType}` });
		})
	} catch (err) {
		res.status(400).json({ msg: `Error: ${err}` });
	}
});

router.put('/update-full-recipe/:id', async (req, res) => {
    const id = req.params.id;
    const newRecipeTitle = req.body.newRecipeTitle;
    const newRecipeURL = req.body.newRecipeURL;
    const newRecipeNotes = req.body.newRecipeNotes;
    const newRecipeTags = req.body.newRecipeTags;
    const newRecipeCuisine = req.body.newRecipeCuisine;
    const newRecipeMeal = req.body.newRecipeMeal;

    try {
        await RecipeModel.findById(id, (err, recipeUpdate) => {
			recipeUpdate.recipeTitle = newRecipeTitle;
            recipeUpdate.recipeURL = newRecipeURL;
            recipeUpdate.notes = newRecipeNotes;
            recipeUpdate.tags = newRecipeTags;
            recipeUpdate.cuisineType = newRecipeCuisine
            recipeUpdate.mealType = newRecipeMeal
			recipeUpdate.save();
			res.status(200).json({ msg: `Recipe Updated!` });
		})
    } catch (err) {
        res.status(400).json({ msg: `Error: ${err}` });
    }
});

/*******************/
/*  DELETE RECIPE  */
/*******************/
// Delete recipe by id
router.delete('/delete-recipe/:id', async (req, res) => {
    const id = req.params.id;

    await RecipeModel.findByIdAndRemove(id).exec();
    res.status(200).json({ msg: `Recipe id: ${id} was deleted...` });
});

module.exports = router;
