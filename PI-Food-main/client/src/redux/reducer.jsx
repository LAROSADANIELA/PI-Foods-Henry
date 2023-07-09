import { combineReducers } from "redux";

import diets from "./reducers/diets";
import getId from "./reducers/getId";
import getName from "./reducers/getName";
import postRecipe from "./reducers/postRecipe";
import getAll from "./reducers/getAll";

const reducer = combineReducers({
  //aca van todos los reducers
  diets,
  getAll,
  getId,
  getName,
  postRecipe,
});
export default reducer;
