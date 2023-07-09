import {
  POST_RECIPE_REQUEST,
  POST_RECIPE_SUCCESS,
  POST_RECIPE_FAILURE,
} from "../actions/postRecipe";

const initialState = {
  recipe: null,
  loading: false,
  error: "",
};

function recipePostReducer(state = initialState, action) {
  switch (action.type) {
    case POST_RECIPE_REQUEST:
      return { ...state, loading: true };

    case POST_RECIPE_SUCCESS:
      return { ...state, loading: false, recipe: action.payload };

    case POST_RECIPE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default recipePostReducer;
