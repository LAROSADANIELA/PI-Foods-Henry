import {
  GET_RECIPE_NAME_REQUEST,
  GET_RECIPE_NAME_SUCCESS,
  GET_RECIPE_NAME_FAILURE,
} from "../actions/getName";

const initialState = {
  recipeName: null,
  loading: false,
  error: "",
};

function recipeNameReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE_NAME_REQUEST:
      return { ...state, loading: true };
    case GET_RECIPE_NAME_SUCCESS:
      return { ...state, loading: false, recipeName: action.payload };
    case GET_RECIPE_NAME_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default recipeNameReducer;
