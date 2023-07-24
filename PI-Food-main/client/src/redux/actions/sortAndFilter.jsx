export const ADD_DIET_TYPE = "ADD_DIET_TYPE";
export const addDietType = (dietsTypes) => ({
  type: ADD_DIET_TYPE,
  payload: dietsTypes,
});
export const REMOVE_DIET_TYPE = "REMOVE_DIET_TYPE";
export const removeDietType = (dietsTypes) => ({
  type: REMOVE_DIET_TYPE,
  payload: dietsTypes,
});

export const ADD_ORIGIN = "ADD_ORIGIN";
export const addOrigin = (origin) => {
  return {
    type: ADD_ORIGIN,
    payload: origin,
  };
};
export const REMOVE_ORIGIN = "REMOVE_ORIGIN";
export const removeOrigin = (origin) => {
  return {
    type: REMOVE_ORIGIN,
    payload: origin,
  };
};

export const SET_ORDER_BY = "SET_ORDER_BY";
export const setOrderBy = (orderBy) => {
  return {
    type: SET_ORDER_BY,
    payload: orderBy,
  };
};

export const RESET = "RESET";
export const reset = () => {
  return {
    type: RESET,
  };
};
