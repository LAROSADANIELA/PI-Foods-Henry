import {
  ADD_DIET_TYPE,
  REMOVE_DIET_TYPE,
  ADD_ORIGIN,
  REMOVE_ORIGIN,
  SET_ORDER_BY,
  RESET,
} from "../actions/sortAndFilter";

const initialState = {
  dietsTypes: [],
  origin: "",
  orderBy: null,
};

function sortAndFilterReducer(state = initialState, action) {
  const dietsTypes = state.dietsTypes;

  switch (action.type) {
    case ADD_DIET_TYPE:
      return { ...state, dietsTypes: dietsTypes.concat(action.payload) };
    case REMOVE_DIET_TYPE:
      return {
        ...state,
        dietsTypes: dietsTypes.filter((type) => {
          return type !== action.payload;
        }),
      };

    case ADD_ORIGIN:
      return { ...state, origin: action.payload };
    case REMOVE_ORIGIN:
      return { ...state, origin: action.payload };
    case SET_ORDER_BY:
      return { ...state, orderBy: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
export default sortAndFilterReducer;
