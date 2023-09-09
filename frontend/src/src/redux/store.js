import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers } from "redux";
import { MainReducer } from "./reducers/main-reducer";

const rootReducer = combineReducers({
  data: MainReducer,
});

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
