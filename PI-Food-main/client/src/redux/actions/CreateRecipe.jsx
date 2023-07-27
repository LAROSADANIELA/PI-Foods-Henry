import { RecipeApi } from "../../services/api/instance";

//ACCIONES POST RECIPE

export const POST_RECIPE_REQUEST = "RECIPE/POST_RECIPE_REQUEST";
export const postRecipeRequest = () => ({
  type: POST_RECIPE_REQUEST,
});

export const POST_RECIPE_SUCCESS = "RECIPE/POST_RECIPE_SUCCESS";
export const postRecipeSuccess = (payload) => ({
  type: POST_RECIPE_SUCCESS,
  payload,
});

export const POST_RECIPE_FAILURE = "RECIPE/POST_RECIPE_FAILURE";
export const postRecipeFailure = (payload) => ({
  type: POST_RECIPE_FAILURE,
  payload,
});

export function postRecipe(recipe) {
  return async function (dispatch) {
    try {
      dispatch(postRecipeRequest());
      const response = await RecipeApi.post("/recipes", recipe);
      dispatch(postRecipeSuccess(response));
    } catch (error) {
      dispatch(postRecipeFailure(error.response.data));
      console.log(error);
    }
  };
}
