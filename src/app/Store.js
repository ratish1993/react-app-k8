import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { FavReducer } from "./reducers/FavReducer";

const reducer = combineReducers({});

const initialState = {
  fav: FavReducer,
};
const middleware = [thunk];

export const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
