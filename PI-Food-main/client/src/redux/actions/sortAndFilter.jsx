export const ADD_DIET_TYPE = "ADD_DIET_TYPE";
export const addDietType = () => ({
  type: ADD_DIET_TYPE,
});
export const REMOVE_DIET_TYPE = "REMOVE_DIET_TYPE";
export const removeDietType = () => ({
  type: REMOVE_DIET_TYPE,
});
export const SET_ORIGIN = "SET_ORIGIN";
export const setOrigin = () => ({
  type: SET_ORIGIN,
});
//fn que devueven acciones
export const SET_ORDER_BY = "SET_ORDER_BY";
export const setOrderBy = (orderBy) => {
  return {
    type: SET_ORDER_BY,
    payload: orderBy,
  };
};

export function selectTypes(e, dietsTypes) {
  return function (dispatch) {
    if (e.target.checked) {
      const arr = dietsTypes.concat(e.target.value);
      dispatch(addDietType(arr));
    } else {
      const arr = dietsTypes.filter((type) => {
        return type !== e.target.value;
      });
      dispatch(removeDietType(arr));
    }
  };
}

export function selectOrigin(e) {
  return function (dispatch) {
    if (e.target.checked) {
      dispatch(setOrigin(e.target.value));
    } else dispatch(setOrigin(null));
  };
}
