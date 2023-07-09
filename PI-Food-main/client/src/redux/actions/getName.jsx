import { RecipeApi } from "../../services/api/instance";

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

//ACCIONES GET RECIPE BY NAME

export const GET_RECIPE_NAME_REQUEST = "RECIPE/GET_RECIPE_NAME_REQUEST";
export const getRecipeNameRequest = () => ({
  type: GET_RECIPE_NAME_REQUEST,
});

export const GET_RECIPE_NAME_SUCCESS = "RECIPE/GET_RECIPE_NAME_SUCCESS";
export const getRecipeNameSuccess = (payload) => ({
  type: GET_RECIPE_NAME_SUCCESS,
  payload,
});

export const GET_RECIPE_NAME_FAILURE = "RECIPE/GET_RECIPE_NAME_FAILURE";
export const getRecipeNameFailure = (payload) => ({
  type: GET_RECIPE_NAME_FAILURE,
  payload,
});

export function getRecipeName(title) {
  return async function (dispatch) {
    try {
      const recipeName = async () => {
        dispatch(getRecipeNameRequest());
        const response = await RecipeApi.get(`/recipes?title=${title}`);
        dispatch(getRecipeNameSuccess(response));
      };
      recipeName();
    } catch (error) {
      dispatch(getRecipeNameFailure(error.message));
      console.log(error);
    }
  };
}
