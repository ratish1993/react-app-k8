import {
  FAV_COUNT_FAILED,
  FAV_COUNT_REQUEST,
  FAV_COUNT_SUCCESS,
} from "../constants/Constant";

export const FavReducer = (state = {}, action) => {
  switch (action.type) {
    case FAV_COUNT_REQUEST:
      return { loading: true };

    case FAV_COUNT_SUCCESS:
      return { loading: false, fav_details: action.payload };

    case FAV_COUNT_FAILED:
      return { loading: false, fav_error: action.payload };

    default:
      return state;
  }
};
