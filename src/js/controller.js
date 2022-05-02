// const { reverse } = require("core-js/core/array");
import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import RecipeView from './views/recipeView.js';
import 'core-js';
import 'regenerator-runtime';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from "./views/bookmarksView"
import addRecipeView from './views/addRecipeView.js';
import recipeView from './views/recipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();
    resultView.update(model.getResultPerPage())
    bookmarksView.render(model.state.bookMarks)
    //1.loading recipe
    await model.loadRecipe(id);
    //2. rendering recipe
    RecipeView.render(model.state.recipe);

  } catch (err) {
    RecipeView.renderError()
    console.log(err);
  }
};


const controlSearchResults = async function(){
  try{
    resultView.renderSpinner()
    //1) get query
    const query = searchView.getQuery()
    if(!query) return;

    //2) load results
    await model.loadSeachResults(query)

    //3) render results
    resultView.render(model.getResultPerPage())
    paginationView.render(model.state.search)

  }catch(err){
    resultView.renderError()
  }
  
}

const controlPagination = function(goToPage){

  resultView.render(model.getResultPerPage(goToPage))
  paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  console.log(newServings);
  // update the servings in the state
  model.updateServings(newServings)
  //update the recipe view
  RecipeView.update(model.state.recipe);

}

const controlAddBookmark = function(){
  if(!model.state.recipe.bookMarked)
  model.addBookmark(model.state.recipe)
 else model.deleteBookmark(model.state.recipe.id)

  RecipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookMarks)
}


const controlBookmarks = function(){
  bookmarksView.render(model.state.bookMarks)
}

const controlUpload = async function(newRecipe){
  try{

    addRecipeView.renderSpinner()
    //upload new recipe date
    await model.creatRecipe(newRecipe)
    
    //Render recipe
   recipeView.render(model.state.recipe)

   
   //render message
   addRecipeView.renderError()
   
   //render bookmark
   bookmarksView.render(model.state.bookMarks)
   
   //change id in url
   window.history.pushState(null, "", `#${model.state.recipe.id}`)

  //  close form window
   setTimeout(function(){
    addRecipeView.toggleHiddenClass()
   }, MODEL_CLOSE_SEC * 1000)
   
  }catch(err){
    console.log(err);
   addRecipeView.renderError(err.message)
  }
 

}


const init =  function(){
 bookmarksView.addHandlerRender(controlBookmarks)
 RecipeView.addHandlerRender(controlRecipes)
 searchView.addHanderSearch(controlSearchResults)
 paginationView.addHanderClick(controlPagination)
 RecipeView.addHanderClick(controlServings)
 RecipeView.addBookmarkHander(controlAddBookmark)
 addRecipeView.addHandlerUpload(controlUpload)
 }
init()






