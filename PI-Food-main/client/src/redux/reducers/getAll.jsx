import {
  GET_RECIPES_REQUEST,
  GET_RECIPES_SUCCESS,
  GET_RECIPES_FAILURE,
} from "../actions/getAll";

//TIPOS
// type recipeModel = {
//   id: string;
//   title: string;
//   summary: string;
//   score: number;
//   healthScore: number;
//   image: string;
//   steps: string;
//   diets: [];
// };
// type arrRecipes = Array<recipeModel>;

// export interface RecipesState {
//   recipes: arrRecipes;
// }

const initialState = {
  recipes: [],
  loading: false,
  error: "",
};

function recipesAllReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES_REQUEST:
      return { ...state, loading: true };

    case GET_RECIPES_SUCCESS:
      return { ...state, loading: false, recipes: action.payload };

    case GET_RECIPES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default recipesAllReducer;
