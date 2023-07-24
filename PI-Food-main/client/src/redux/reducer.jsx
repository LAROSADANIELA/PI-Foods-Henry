import { combineReducers } from "redux";

import postRecipe from "./reducers/createRecipe";
import diets from "./reducers/diets";
import recipes from "./reducers/recipes";
import getId from "./reducers/searchRecipeById";
import sortAndFilter from "./reducers/sortAndFilter";

const reducer = combineReducers({
  diets,
  recipes,
  getId,
  postRecipe,
  sortAndFilter,
});
export default reducer;
