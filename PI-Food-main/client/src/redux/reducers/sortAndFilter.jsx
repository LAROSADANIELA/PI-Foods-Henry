import {
  ADD_DIET_TYPE,
  ADD_ORIGIN,
  REMOVE_DIET_TYPE,
  REMOVE_ORIGIN,
  RESET,
  SET_ORDER_BY,
} from "../actions/sortAndFilter";

const initialState = {
  dietsTypes: [],
  origin: [],
  orderBy: null,
};

function sortAndFilterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DIET_TYPE:
      return { ...state, dietsTypes: state.dietsTypes.concat(action.payload) };
    case REMOVE_DIET_TYPE:
      return {
        ...state,
        dietsTypes: state.dietsTypes.filter((type) => {
          return type !== action.payload;
        }),
      };

    case ADD_ORIGIN:
      return { ...state, origin: state.origin.concat(action.payload) };
    case REMOVE_ORIGIN:
      return {
        ...state,
        origin: state.origin.filter((orig) => {
          return orig !== action.payload;
        }),
      };
    case SET_ORDER_BY:
      return { ...state, orderBy: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
export default sortAndFilterReducer;
