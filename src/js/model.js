import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search:{
    query: "",
    page: 1,
    results: [],
    searchResultPerPage: RES_PER_PAGE,
  },
  
  bookMarks: [],
};

const convertDataToRecipe = function(data){
  const { recipe } = data.data;
  return {
    id: recipe.id,
    cookingtime: recipe.cooking_time,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    url: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && {key: recipe.key})
  };
}

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    
    
    state.recipe = convertDataToRecipe(data)
    
    if(state.bookMarks.some(bookmark => bookmark.id === id))
    state.recipe.bookMarked = true
    else state.recipe.bookMarked = false

  } catch (err) {
    throw err
  }
};

export const loadSeachResults = async function(query){
try{
  const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
 state.search.results = data.data.recipes.map(res => {
 return  {
    id: res.id,
    image: res.image_url,
    publisher: res.publisher,
    title: res.title,
    ...(res.key && {key: res.key})
 }
  })
  state.search.page = 1
}catch(err){
  throw err
}

}

export const getResultPerPage = function(page = state.search.page){
  state.search.page = page
  const start = (page - 1) * state.search.searchResultPerPage
  const end = page * state.search.searchResultPerPage
  return state.search.results.slice(start, end)
}

export const updateServings = function(newServings){
 
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings
  })
  state.recipe.servings = newServings
  console.log(state.recipe.ingredients);
}

const presistbookmark = function(){
  localStorage.setItem("bookmarks", JSON.stringify(state.bookMarks))
}

export const addBookmark = function(recipe){
//add recipe to bookmark
state.bookMarks.push(recipe)

//mark bookmark on recipe
if(recipe.id === state.recipe.id) state.recipe.bookMarked = true
presistbookmark()
}

export const deleteBookmark = function(id){
  const index = state.bookMarks.findIndex(bookmark => bookmark.id ===id)
  console.log(index);
 state.bookMarks.splice(index, 1)
 if(id === state.recipe.id) state.recipe.bookMarked = false
 presistbookmark()
}

export const creatRecipe = async function(newRecipe){
  try{
    const newRecipeArr = Object.entries(newRecipe)
    const ingredients = newRecipeArr.filter(entry => entry[0].startsWith("ingredient") && entry[1] !== "").map(ing => {
      const ingArr = ing[1].replaceAll(" ", "").split(",")
      if(ingArr.length !== 3) throw new Error ("ingredients input is not correct")
      const [quantity, unit, description ] = ingArr
    return {quantity: quantity? +quantity : null, unit, description}
    })

    const recipe = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      ingredients,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
    }

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
    state.recipe = convertDataToRecipe(data)
    addBookmark(state.recipe)
    
  }catch(err){
    console.log(err);
    throw err

  }
}


const init = function(){
const storage = JSON.parse(localStorage.getItem("bookmarks"))
if(storage) state.bookMarks = storage
}
init()

const clearStorage = function(){
  localStorage.clear("bookmarks")
}
// clearStorage()