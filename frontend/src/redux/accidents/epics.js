import {
 FETCH_ACCIDENTS_EPIC,
 SET_ACCIDENTS_DATA,
 FETCH_FILTER_ACCIDENTS_EPIC,
 FETCH_INTERSECTIONS_EPIC,
} from "../types";
import { mergeMap, map, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { setAccidentsData, setIntersections } from "../actions";
import { of } from "rxjs";

/**
 * Все запросы от отправляемы на сервер
 */
/**
 * fetchAccidentsEpic - первоначальные данные по дорог происш
 * fetchFilteredAccidentsEpic - данные по фильтрации
 */
const ACCIDENTS_URL = "/sc-api-gateway/secured/_/sc-public-safety/api/accidents";
export const fetchAccidentsEpic = (action$) =>
 action$.pipe(
  ofType(FETCH_ACCIDENTS_EPIC),
  mergeMap((action) =>
   ajax({
    url: ACCIDENTS_URL,
    headers: {
     "Content-Type": "application/json",
        ...action.payload,
    },
    crossDomain: true,
    withCredentials: false,
    method: "POST",
    body: JSON.stringify({}),
   }).pipe(
    map(({ response }) => setAccidentsData(response)),
    catchError((error) =>
     of({
      type: "FETCH_USER_REJECTED",
      payload: error.xhr.response,
      error: true,
     })
    )
   )
  )
 );

export const fetchFilteredAccidentsEpic = (action$) =>
 action$.pipe(
  ofType(FETCH_FILTER_ACCIDENTS_EPIC),
  mergeMap((action) =>
   ajax({
    url: ACCIDENTS_URL,
    headers: {
     "Content-Type": "application/json",
        ...action.payload.config
    },
    crossDomain: true,
    withCredentials: false,
    method: "POST",
    body: JSON.stringify({
     start: action.payload?.start ?? null,
     end: action.payload?.end ?? null,
     regions: action.payload?.districts ?? [],
     locations: action.payload?.locations ?? [],
     violations: action.payload?.violations ?? [],
     culprits: action.payload?.culprits ?? [],
     ["driver-conditions"]: action.payload?.conditions ?? [],
     ["vehicle-categories"]: action.payload?.transCategory ?? [],
    }),
   }).pipe(
    map(({ response }) => setAccidentsData(response)),
    catchError((error) =>
     of({
      type: "FETCH_USER_REJECTED",
      payload: error.xhr.response,
      error: true,
     })
    )
   )
  )
 );
