import axios from "../../helper/axios";
import config from "../../helper/config ";
import {
  FAV_COUNT_FAILED,
  FAV_COUNT_REQUEST,
  FAV_COUNT_SUCCESS,
} from "../constants/Constant";

export const getTotalFavCount = () => async (dispatch) => {
  dispatch({
    type: FAV_COUNT_REQUEST,
  });

  await axios
    .get("/equipment/favorite-equipment-count", config)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: FAV_COUNT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: FAV_COUNT_FAILED,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: FAV_COUNT_FAILED,
        payload: err?.response?.data,
      });
    });
};
