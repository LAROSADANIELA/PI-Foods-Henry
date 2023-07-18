import {
  GET_DIETS_REQUEST,
  GET_DIETS_SUCCESS,
  GET_DIETS_FAILURE,
} from "../actions/diets";

const initialState = {
  diets: [],
  loading: false,
  error: "",
};

function dietsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DIETS_REQUEST:
      return { ...state, loading: true };
    case GET_DIETS_SUCCESS:
      return { ...state, loading: false, diets: action.payload };
    case GET_DIETS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export default dietsReducer;
