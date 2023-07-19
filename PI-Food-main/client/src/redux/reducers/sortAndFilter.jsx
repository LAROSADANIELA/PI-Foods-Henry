import {
  ADD_DIET_TYPE,
  REMOVE_DIET_TYPE,
  SET_ORIGIN,
  SET_ORDER_BY,
} from "../actions/sortAndFilter";

const initialState = {
  dietsTypes: [],
  origin: "",
  orderBy: null,
};

function sortAndFilterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DIET_TYPE:
      return { ...state, dietsTypes: action.payload };
    case REMOVE_DIET_TYPE:
      return { ...state, dietsTypes: action.payload };
    case SET_ORIGIN:
      return { ...state, origin: action.payload };
    case SET_ORDER_BY:
      return { ...state, orderBy: action.payload };
    default:
      return state;
  }
}
export default sortAndFilterReducer;
