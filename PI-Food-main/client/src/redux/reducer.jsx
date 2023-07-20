import { combineReducers } from "redux";

import diets from "./reducers/diets";
import getId from "./reducers/getId";
import postRecipe from "./reducers/postRecipe";
import recipes from "./reducers/recipes";
import sortAndFilter from "./reducers/sortAndFilter";

const reducer = combineReducers({
  diets,
  recipes,
  getId,
  postRecipe,
  sortAndFilter,
});
export default reducer;
