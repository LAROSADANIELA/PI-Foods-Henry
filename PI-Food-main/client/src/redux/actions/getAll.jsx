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

export function recipeAll(title) {
  return async function (dispatch) {
    try {
      // const dataAll = async () => {
      dispatch(getRecipesRequest());
      const response = await RecipeApi.get(`/recipes`, {
        params: {
          title,
        },
      });
      dispatch(getRecipesSuccess(response.data));
      // console.log(response, "dataAll");
      // };
    } catch (error) {
      dispatch(getRecipesFailure(error.message));
      console.log(error);
    }
  };
}
