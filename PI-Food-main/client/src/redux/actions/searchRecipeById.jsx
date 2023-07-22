import { RecipeApi } from "../../services/api/instance";

//ACCIONES GET RECIPE BY ID
export const GET_RECIPE_ID_REQUEST = "RECIPE/GET_RECIPE_ID_REQUEST";
export const getRecipeIdRequest = () => ({
  type: GET_RECIPE_ID_REQUEST,
});

export const GET_RECIPE_ID_SUCCESS = "RECIPE/GET_RECIPE_ID_SUCCESS";
export const getRecipeIdSuccess = (payload) => ({
  type: GET_RECIPE_ID_SUCCESS,
  payload,
});

export const GET_RECIPE_ID_FAILURE = "RECIPE/GET_RECIPE_ID_FAILURE";
export const getRecipeIdFailure = (payload) => ({
  type: GET_RECIPE_ID_FAILURE,
  payload,
});

export function getRecipeId(id) {
  return async function (dispatch) {
    try {
      const recipeId = async () => {
        dispatch(getRecipeIdRequest());
        const response = await RecipeApi.get(`/recipes/${id}`);
        dispatch(getRecipeIdSuccess(response.data));
      };
      recipeId();
    } catch (error) {
      dispatch(getRecipeIdFailure(error.message));
      console.log(error);
    }
  };
}
