import { combineReducers } from "redux";

import diets from "./reducers/diets";
import getId from "./reducers/getId";
import postRecipe from "./reducers/postRecipe";
import getAll from "./reducers/getAll";
import sortAndFilter from "./reducers/sortAndFilter";

const reducer = combineReducers({
  diets,
  getAll,
  getId,
  postRecipe,
  sortAndFilter,
});
export default reducer;
