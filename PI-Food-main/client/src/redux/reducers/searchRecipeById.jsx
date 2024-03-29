import {
  GET_RECIPE_ID_FAILURE,
  GET_RECIPE_ID_REQUEST,
  GET_RECIPE_ID_SUCCESS,
} from "../actions/searchRecipeById";

const initialState = {
  recipeId: null,
  loading: false,
  error: "",
};

function recipeIdReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE_ID_REQUEST:
      return { ...state, loading: true };
    case GET_RECIPE_ID_SUCCESS:
      return { ...state, loading: false, recipeId: action.payload };
    case GET_RECIPE_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default recipeIdReducer;
