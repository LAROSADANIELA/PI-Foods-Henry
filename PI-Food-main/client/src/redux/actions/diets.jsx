import { RecipeApi } from "../../services/api/instance";

//TIPOS
// type dietsModel = {
//   id: string;
//   name: string;
// };
// type arrDiets = Array<dietsModel>;

//ACCIONES GET ALL DIETS

export const GET_DIETS_REQUEST = "DIETS/GET_DIETS_REQUEST";
export const getDietsRequest = () => ({
  type: GET_DIETS_REQUEST,
});

export const GET_DIETS_SUCCESS = "DIETS/GET_DIETS_SUCCESS";
export const getDietsSuccess = (payload) => ({
  type: GET_DIETS_SUCCESS,
  payload,
});

export const GET_DIETS_FAILURE = "DIETS/GET_DIETS_FAILURE";
export const getDietsFailure = (payload) => ({
  type: GET_DIETS_FAILURE,
  payload,
});

export function getDiets() {
  return async function (dispatch) {
    try {
      const getDiets = async () => {
        dispatch(getDietsRequest());
        const response = await RecipeApi.get(`/diet`);
        dispatch(getDietsSuccess(response.data));
      };
      getDiets();
    } catch (error) {
      dispatch(getDietsFailure(error.message));
      console.log(error);
    }
  };
}
