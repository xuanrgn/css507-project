import {
  SET_ACCIDENTS_DATA,
  SET_SELECTED_DATE,
  SET_SELECTED_DAYTIME,
  SET_SELECTED_DISTRICS,
  SET_SELECTED_LOCATIONS,
  SET_SELECTED_VIOLATIONS,
  SET_SELECTED_ANOTHER,
  RESET_FILTERS,
  SET_FILTER_VALUE,
  SET_INTERSECTIONS,
} from "./types";

export const setAccidentsData = (payload) => ({
  type: SET_ACCIDENTS_DATA,
  payload: payload,
});

export const setSelectedDate = ({ startDate, endDate }) => ({
  type: SET_SELECTED_DATE,
  payload: { startDate, endDate },
});

export const setSelectedDayTypes = ({ types }) => ({
  type: SET_SELECTED_DAYTIME,
  payload: { types },
});

export const setSelectedDistrictsAndStreets = ({ districts, streets }) => ({
  type: SET_SELECTED_DISTRICS,
  payload: { districts, streets },
});

export const setFilterValue = (payload) => ({
  type: SET_FILTER_VALUE,
  payload: payload,
});

export const setSelectedLocations = ({ locations }) => ({
  type: SET_SELECTED_LOCATIONS,
  payload: { locations },
});

export const setSelectedViolations = ({ violations }) => ({
  type: SET_SELECTED_VIOLATIONS,
  payload: { violations },
});

export const setSelectedAnothers = ({
  transportCategories,
  culprits,
  driverConditions,
}) => ({
  type: SET_SELECTED_ANOTHER,
  payload: {
    transportCategories: transportCategories,
    culprits: culprits,
    driverConditions: driverConditions,
  },
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});
