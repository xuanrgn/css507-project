import {
  fetchAccidentsEpic,
  fetchFilteredAccidentsEpic,
} from "./accidents/epics";
import { combineReducers } from "redux";
import { accidentsReducer } from "./accidents/reducer";
import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(
  fetchAccidentsEpic,
  fetchFilteredAccidentsEpic
);

export const rootReducers = combineReducers({
  accidentsReducer,
});
