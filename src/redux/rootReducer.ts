import { combineReducers } from "redux";
import { requestsList, Request } from "./reducers/requests";
import { loader, Loader } from "./reducers/loader";

export interface GlobalStateTree {
  requests: Request[];
  loader: Loader;
}

export const rootReducer = combineReducers<GlobalStateTree>({
  requests: requestsList,
  loader: loader,
});
