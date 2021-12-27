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
 FILTER_CRIMES_DATA,
 FILTER_ACCIDENTS_DATA,
 FETCH_FILTER_ACCIDENTS_EPIC,
 RESET_ALL,
 SET_INTERSECTIONS,
} from "../types";
import { from, of, zip } from "rxjs";
import { map, toArray, groupBy, mergeMap, scan, filter } from "rxjs/operators";

var moment = require("moment");
const NOT_DEFINED = "Не указан";

/**
 * accidentsReducer - основная архитектура логики redux
 * при отправки запроса данные примаються здесь
 * фильтрация всех данных
 * подготовка данных для карт
 *
 * filterCrimesByRegions() = фильтрация по регионам
 * sortCrimesByDates() = сортировка по датам
 * groupCrimesByDate() = группировка по датам
 * preConfig() = начальные настроики данных
 * primaryConfig() = первоначальные постановка данных
 * filterData() = основной поток фильтрация
 */

/** initital state - начальные данные */
const initialState = {
 accidents: [],
 filteredAccidents: [],
 showSelectedDate: {
  startDate: moment().subtract(3, "months").format("DD.MM.YY"),
  endDate: moment().format("DD.MM.YY"),
 },
 startDate: null,
 endDate: null,
 isLoading: false,
};

// Redux reducer все логика redux

export const accidentsReducer = (state = initialState, action) => {
 switch (action.type) {
  case FETCH_FILTER_ACCIDENTS_EPIC:
   return { ...state, isLoading: true };
  case SET_ACCIDENTS_DATA:
   return {
    ...state,
    ...primaryConfig({
     data: filterData({
      data: from(action.payload),
      state: state,
      sss: true,
     }),
    }),
   };
  case SET_FILTER_VALUE:
   return {
    ...state,
    ...action.payload,
   };

  case FILTER_ACCIDENTS_DATA:
   return {
    ...state,
    ...primaryConfig({
     data: filterData({ data: from(state.accidents), state: state }),
     filter,
    }),
   };
  case RESET_ALL:
   return {
    ...initialState,
   };
  case RESET_FILTERS:
   return {
    ...initialState,
    ...primaryConfig({ data: from(state.accidents) }),
   };

  default:
   return state;
 }
};

/**
 * начальные настроики данных
 */
const preConfig = ({ data }) => {
 return data.pipe(
  map((el) => {
   // el.street = el.street?.toLowerCase();
   if (el["region"].includes("Алатау")) {
    return { ...el, ...{ district: "Алатауский район" } };
   } else if (el["region"].includes("Бостандык")) {
    return { ...el, ...{ district: "Бостандыкский район" } };
   } else if (el["region"].includes("Ауэзов")) {
    return { ...el, ...{ district: "Ауэзовский район" } };
   } else if (el["region"].includes("Медеу")) {
    return { ...el, ...{ district: "Медеуский район" } };
   } else if (el["region"].includes("Алмалин")) {
    return { ...el, ...{ district: "Алмалинский район" } };
   } else if (el["region"].includes("Турксиб")) {
    return { ...el, ...{ district: "Турксибский район" } };
   } else if (el["region"].includes("Наурызбай")) {
    return { ...el, ...{ district: "Наурызбайский район" } };
   } else if (el["region"].includes("Жетысу")) {
    return { ...el, ...{ district: "Жетысуский район" } };
   } else {
    return el;
   }
  })
 );
};
/**
 * фильтрация по регионам
 */
const filterCrimesByRegions = ({ data }) => {
 return from(data).pipe(
  groupBy((crime) => {
   if (crime["district"]?.includes("Алатау")) {
    return "Алатауский район";
   } else if (crime["district"]?.includes("Бостандык")) {
    return "Бостандыкский район";
   } else if (crime["district"]?.includes("Ауэзов")) {
    return "Ауэзовский район";
   } else if (crime["district"]?.includes("Медеу")) {
    return "Медеуский район";
   } else if (crime["district"]?.includes("Алмалин")) {
    return "Алмалинский район";
   } else if (crime["district"]?.includes("Турксиб")) {
    return "Турксибский район";
   } else if (crime["district"]?.includes("Наурызбай")) {
    return "Наурызбайский район";
   } else if (crime["district"]?.includes("Жетысуский")) {
    return "Жетысуский район";
   } else {
    return NOT_DEFINED;
   }
  }),
  mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
  map((el) => ({ name: el[0], count: el[1].length })),
  toArray()
 );
};
/**
 * группировка по датам
 */
const groupCrimesByDate = ({ data }) => {
 return data.pipe(
  groupBy(
   (crime) => moment.unix(crime["date"] / 1000).format("DD.MM.YY"),
   (crime) => crime
  ),
  mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
  scan((acc, val, index) => {
   return {
    date: val[0],
    crimes: [
     val[1].filter((el) => el["district"]?.includes("Алатау")).length,
     val[1].filter((el) => el["district"]?.includes("Алмалин")).length,
     val[1].filter((el) => el["district"]?.includes("Ауэзов")).length,
     val[1].filter((el) => el["district"]?.includes("Бостандык")).length,
     val[1].filter((el) => el["district"]?.includes("Жетысу")).length,
     val[1].filter((el) => el["district"]?.includes("Медеу")).length,
     val[1].filter((el) => el["district"]?.includes("Наурызбай")).length,
     val[1].filter((el) => el["district"]?.includes("Турксиб")).length,
     val[1].filter((el) => el["district"] === null).length,
    ],
   };
  }, []),
  toArray()
 );
};
/**
 * сортировка по датам
 */
const sortCrimesByDates = ({ data }) => {
 return data.pipe(
  toArray(),
  map((el) =>
   el.sort((el1, el2) => {
    const firstDate = moment(el1["commission-date-pretty"], "DD.MM.YYYY HH:mm");
    const secondDate = moment(
     el2["commission-date-pretty"],
     "DD.MM.YYYY HH:mm"
    );
    if (firstDate === secondDate) return 0;
    else if (firstDate < secondDate) return -1;
    else return 1;
   })
  ),
  mergeMap((el) => el)
 );
};
/**
 * первоначальные постановка данных
 */
const primaryConfig = ({ data, filter }) => {
 let primaryData;
 let filteredData;
 const primaryDataObservable = preConfig({
  data: sortCrimesByDates({ data: data }),
 });
 const clonePrimaryDataObservable = primaryDataObservable;
 clonePrimaryDataObservable.pipe(toArray()).subscribe((result) => {
  primaryData = result;
  filteredData = result;
 });

 let crimesByDistricts;
 const crimesByDistrictObservable = primaryDataObservable.pipe(
  groupBy(
   (crime) => crime.district,
   (el) => el.street
  ),
  mergeMap((group) => zip(of(group.key), group.pipe(toArray()))),
  toArray()
 );
 crimesByDistrictObservable.subscribe((result) => {
  crimesByDistricts = result;
 });

 // Данные для первого графика
 let crimesByRegions;
 filterCrimesByRegions({
  data: primaryDataObservable,
 }).subscribe((result) => {
  crimesByRegions = result;
 });

 // Данные для второго графика
 let accidentsGroupedByDates = null;
 groupCrimesByDate({
  data: primaryDataObservable,
 }).subscribe((result) => {
  accidentsGroupedByDates = result;
 });

 let crimesMapData;
 primaryDataObservable
  .pipe(
   map((el, index) => ({
    type: "Feature",
    id: index,
    geometry: {
     type: "Point",
     coordinates: [el.geometry.y, el.geometry.x],
    },
    properties: {
     balloonContent: `
                <div>
                  <div><b>Дата :</b>${moment
                   .unix(el["date"] / 1000)
                   .format("DD.MM.YY")} </div>
                  <div><b>Район :</b> ${el["district"]}</div>
                  <div><b>Место :</b> ${el["location"]}</div>
                  <div><b>Время суток :</b> ${el["time-descr"]}</div>
                  <div><b>Нарушение :</b> ${el["violation-type"]}</div>
                  <div><b>Состояние водителя :</b> ${
                   el["driver-condition"]
                  }</div>
                  <div><b>Виновник :</b> ${el["culprit"]}</div>
                </div>
              `,
     clusterCaption: `${moment.unix(el["date"] / 1000).format("DD.MM.YY")}`,
     hintContent: "Текст подсказки",
    },
   })),
   toArray()
  )
  .subscribe((res) => {
   crimesMapData = res;
  });

 return {
  ...(filter ?? { accidents: primaryData }),
  filteredAccidents: filteredData,
  accidentsGroupedByDates: accidentsGroupedByDates,
  primaryDistrictsAndStreets: crimesByDistricts,
  accidentsByRegions: crimesByRegions,
  mapdata: crimesMapData,
  isLoading: false,
 };
};
/**
 * фильтрация
 */
const filterData = ({ data, state, sss }) => {
 return data.pipe(
  filter((el) =>
   state.selectedDistricts?.length > 0 && !sss
    ? state.selectedDistricts.includes(el["district"])
    : true
  ),
  filter((el) =>
   state.selectedStreets?.length > 0
    ? state.selectedStreets.includes(el["street"])
    : true
  ),
  filter((el) =>
   state.selectedLocations?.length > 0
    ? state.selectedLocations.includes(el["location"])
    : true
  ),
  filter((el) =>
   state.selectedViolations?.length > 0
    ? state.selectedViolations.includes(el["violation-type"])
    : true
  ),
  filter((el1) =>
   state.selectedDayTimes?.length > 0
    ? state.selectedDayTimes.filter((el) =>
       el.toLowerCase().includes(el1["time-descr"].toLowerCase())
      ).length > 0
    : true
  ),
  filter((el) => {
   return state.selectedTransportCategories?.length > 0
    ? state.selectedTransportCategories.filter((el1) =>
       el["vehicle-category"].includes(el1)
      )[0] ?? false
    : true;
  }),
  filter((el) =>
   state.selectedCulprits?.length > 0
    ? state.selectedCulprits.includes(el["culprit"])
    : true
  ),
  filter((el) =>
   state.selectedConditions?.length > 0
    ? state.selectedConditions.includes(el["driver-condition"])
    : true
  )
 );
};
