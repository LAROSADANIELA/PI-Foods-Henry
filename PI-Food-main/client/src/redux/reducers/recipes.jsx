import {
  GET_RECIPES_FAILURE,
  GET_RECIPES_REQUEST,
  GET_RECIPES_SUCCESS,
  SET_PAGE,
} from "../actions/recipes";

const PAGINATION_SIZE = 9;

const initialState = {
  recipes: [],
  loading: false,
  error: "",
  pagination: {
    size: PAGINATION_SIZE,
    page: 1,
  },
};

function recipesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES_REQUEST:
      return { ...state, loading: true };

    case GET_RECIPES_SUCCESS:
      return { ...state, loading: false, recipes: action.payload };

    case GET_RECIPES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SET_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };

    default:
      return state;
  }
}

export default recipesReducer;
