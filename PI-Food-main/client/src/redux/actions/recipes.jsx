import { RecipeApi } from "../../services/api/instance";

export const SET_PAGE = "SET_PAGE";
export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

//ACCIONES GET RECIPES

export const GET_RECIPES_REQUEST = "RECIPE/GET_RECIPES_REQUEST";
export const getRecipesRequest = () => ({
  type: GET_RECIPES_REQUEST,
});

export const GET_RECIPES_SUCCESS = "RECIPE/GET_RECIPES_SUCCESS";
export const getRecipesSuccess = (payload) => ({
  type: GET_RECIPES_SUCCESS,
  payload,
});

export const GET_RECIPES_FAILURE = "RECIPE/GET_RECIPES_FAILURE";
export const getRecipesFailure = (payload) => ({
  type: GET_RECIPES_FAILURE,
  payload,
});

export function getRecipes(title) {
  return async function (dispatch) {
    try {
      dispatch(getRecipesRequest());
      const response = await RecipeApi.get(`/recipes`, {
        params: {
          title,
        },
      });
      dispatch(getRecipesSuccess(response.data));
    } catch (error) {
      dispatch(getRecipesFailure(error.message));
      console.log(error);
    }
  };
}
