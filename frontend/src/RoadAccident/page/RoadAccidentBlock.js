import React, { useState } from "react";
import { RoadAccidentChart } from "./RoadAccidentChart";
import PeriodDropMenu from "./periodDropMenu";
import {
 CrimeLineChart_Line_option,
 CrimeLineChart_Line_Dataset,
 CrimeLineChart_HorizontalBar_option,
 CrimeLineChart_HorizontalBar_Dataset,
 RoadAccidentDateTime,
 RoadAccidentTransportType,
 RoadAccidentLocation,
 RoadAccidentCrime,
 RoadAccidentDriverStatus,
 RoadAccidentDriverPerpetrator,
 RoadAccidentDriverCategory,
 RoadAccidentTableData,
} from "./ChartOption";
import RoadAccident from "./RoadAccidentTable";
import YandexMap from "./Map";
import CheckBoxMenuBig from "./CheckBoxMenuBig";
import { ReactComponent as IconChart } from "../img/chart_lite.svg";
import { ReactComponent as IconTab } from "../img/table.svg";
import { ReactComponent as IconMap } from "../img/map_2.svg";
import { ReactComponent as IconFilter } from "../img/icons8-clear-filters-100.svg";
import {
 FETCH_ACCIDENTS_EPIC,
 FETCH_FILTER_ACCIDENTS_EPIC,
 RESET_FILTERS,
 RESET_ALL,
 FILTER_ACCIDENTS_DATA,
} from "../../redux/types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { chart_appeal_OA_status, chart_colors_OA_status } from "./ChartOption";
import CheckboxDistricts from "./CheckboxDistricts";
import CheckboxLocation from "./CheckboxLocation";
import CheckboxViolations from "./CheckboxViolations";
import { Spin } from "antd";
import { setFilterValue } from "../../redux/actions";
import Axios from "axios";

var moment = require("moment");

/**
 * Основные выпадашки фильтров
 * при открытии отправляеться запрос на сервер /sc-public-safety/api/accidents с данными о проишествиях
 * вывод графиков и карты
 * включение и выключение компонентов при нажатии
 */
const RoadAccidentBlock = (props) => {
 /**
  * isActiveChart = положение показа Графика
  * isActiveTab = положение показа Таблицы
  * isActiveMap = положение показа Карты
  * clickedPoint = нажатая точка на карте
  * mapState = положение карты
  * isHeatMap = положение теплокарты
  * CrimeLineChart_HorizontalBar_Dataset = подготовка данных для вертикального графика
  * CrimeLineChart_Line_Dataset = подготовка данных для линейных графиков

  * Redux
  * mapStateToProps = переменные взятые из redux
  * mapDispatchToProps = функции для связи с redux
  * resetData() = сброс примененных фильтров
  * fetchAccidentsData() = получение данных о проишествиях
  * fetchFilteredAccidentData() = получение данных с фильтрами
  * filterCrimesData() = приминение фильтров
  * setValue() = сохранение выбранных категории
  *
  */
 const [isActiveChart, setIsActiveChart] = useState(true);
 const [isActiveMap, setIsActiveMap] = useState(true);
 const [isActiveTab, setIsActiveTab] = useState(true);
 const [periodVisible, setPeriodVisible] = useState(false);
 const [reset, setReset] = useState(false);
 const [isHeatMap, setIsHeatMap] = useState(false);
 const [clickedPoint, setClickedPoint] = useState(null);
 const [districtsAndStreets, setDistricsAndStreets] = useState({
  districts: [],
  streets: [],
  districtFilter: [],
  streetsFilter: [],
  tempStreetFilter: [],

  checkedStreets: [],
  checkedDistricts: [],
 });
 const [mapState, setMapState] = useState({
  center: [43.238352, 76.8958813, 17],
  zoom: 15,
 });

 const CrimeLineChart_Line_Dataset = {
  labels: props.accidentsGroupedByDates
   ?.sort((a, b) => moment(a.date, "DD.MM.YY").diff(moment(b.date, "DD.MM.YY")))
   .map((el) => el["date"]),
  datasets: [...Array(9).keys()]
   .filter((el, index) => {
    const rr = props.accidentsGroupedByDates
     ?.sort((a, b) =>
      moment(a.date, "DD.MM.YY").diff(moment(b.date, "DD.MM.YY"))
     )
     .filter((el) => (el["crimes"][index] === 0 ? false : true));
    return rr?.length > 0 ? true : false;
   })
   .map((index) => {
    return {
     label: chart_appeal_OA_status.sort((a, b) => {
      if (a.includes("Не указан")) {
       return 1;
      } else if (b.includes("Не указан")) {
       return -1;
      } else if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
     })[index],
     data: props.accidentsGroupedByDates?.map((el) => el["crimes"][index]),
     lineTension: 0,
     fill: 0,
     borderColor: chart_colors_OA_status[index],
     backgroundColor: "transparent",
     pointBackgroundColor: "white",
     pointBorder: 5,
     pointBorderColor: chart_colors_OA_status[index],
     pointRadius: 5,
     pointHoverRadius: 8,
     pointHitRadius: 30,
    };
   }),
 };

 let CrimeLineChart_HorizontalBar_Dataset = {
  labels: chart_appeal_OA_status
   .sort((a, b) => {
    if (a.includes("Не указан")) {
     return 1;
    } else if (b.includes("Не указан")) {
     return -1;
    } else if (a < b) return -1;
    else if (a > b) return 1;
    return 0;
   })
   .map((district, index) => {
    const count = props.region?.filter((el) => el.name.includes(district))[0];
    return count ? district : false;
   }),
  datasets: [
   {
    label: "Преступлений ",
    backgroundColor: "#6bb0dd",
    data: chart_appeal_OA_status.map((district) => {
     const count = props.region?.filter((el) => el.name.includes(district))[0];

     return count ? count.count : 0;
    }),
    minBarLength: 10,
   },
  ],
 };
 /**
  * Получение данных
  */
 useEffect(() => {
  Axios.post("/sc-api-gateway/secured/_/sc-public-safety/api/accidents", {
   limit: 1,
   start: moment(`${moment().format("YYYY")}`).format("YYYY-MM-DD"),
  }, props.config).then((response) => {
   props.setValue({
    showSelectedDate: {
     startDate: moment
      .unix(response.data[0].date / 1000)
      .subtract(7, "days")
      .format("DD.MM.YY"),
     endDate: moment.unix(response.data[0].date / 1000).format("DD.MM.YY"),
    },
   });
   props.fetchFilteredAccidentData({
    start: moment
     .unix(response.data[0].date / 1000)
     .subtract(7, "days")
     .format("YYYY-MM-DD"),
    end: moment.unix(response.data[0].date / 1000).format("YYYY-MM-DD"), config: props.config
   });
  });
 }, []);

 return (
  <div className="RoadAccident_main">
   <div className="RoadAccident_wrapper">
    <div className="RoadAccident_title_wrap">
     <span className="RoadAccident_title">
      Дорожно-транспортные происшествия
     </span>
     <div className="RoadAccident_filter_btn">
      <div
       title={"График"}
       className={`RoadAccident_filter_btn_icon ${
        isActiveChart ? "active" : ""
       }`}
       onClick={async () => {
        setIsActiveChart(!isActiveChart);
       }}
      >
       <IconChart />
      </div>

      <div
       title={"Карта"}
       className={`RoadAccident_filter_btn_icon ${isActiveMap ? "active" : ""}`}
       onClick={async () => {
        setIsActiveMap(!isActiveMap);
       }}
      >
       <IconMap />
      </div>
      <div
       title={"Таблица"}
       className={`RoadAccident_filter_btn_icon ${isActiveTab ? "active" : ""}`}
       onClick={async () => {
        setIsActiveTab(!isActiveTab);
       }}
      >
       <IconTab />
      </div>
     </div>
    </div>

    <div className="RoadAccident_filter">
     <div className="RoadAccident_filter_filter">
      <div className="RoadAccident_filter_item">
       <PeriodDropMenu
        reset={reset}
        setReset={setReset}
        newVisible={periodVisible}
        setVisible={setPeriodVisible}
        titleBtn={"Период"}
        dateP={"dateP"}
        checkBox={RoadAccidentDateTime}
        setIsHeatMap={setIsHeatMap}
        config={props.config}
       />
      </div>
      <div className="RoadAccident_filter_item">
       <CheckboxDistricts
        reset={reset}
        setReset={setReset}
        titleBtn={"Район"}
        setPeriodVisible={setPeriodVisible}
        districtsAndStreets={districtsAndStreets}
        setDistricsAndStreets={setDistricsAndStreets}
       />
      </div>
      <div className="RoadAccident_filter_item">
       <CheckboxLocation
        reset={reset}
        setReset={setReset}
        setPeriodVisible={setPeriodVisible}
        titleBtn={"Место"}
        checkBox={RoadAccidentLocation}
       />
      </div>
      <div className="RoadAccident_filter_item third_filter">
       <CheckboxViolations
        reset={reset}
        setReset={setReset}
        titleBtn={"Правонарушение"}
        setPeriodVisible={setPeriodVisible}
        checkBox={RoadAccidentCrime}
       />
      </div>
      <div className="RoadAccident_filter_item">
       <CheckBoxMenuBig
        reset={reset}
        setReset={setReset}
        titleBtn={"Дополнительно"}
        setPeriodVisible={setPeriodVisible}
        RoadAccidentDriverStatus={RoadAccidentDriverStatus}
        RoadAccidentDriverPerpetrator={RoadAccidentDriverPerpetrator}
        RoadAccidentDriverCategory={RoadAccidentDriverCategory}
       />
      </div>
      <div
       className="RoadAccident_filter_item"
       style={{
        display: `${
         props.selectedFilters.start ||
         props.selectedFilters.disricts?.length > 0 ||
         props.selectedFilters.locations?.length > 0 ||
         props.selectedFilters.violations?.length > 0 ||
         props.selectedFilters.transCategory?.length > 0 ||
         props.selectedFilters.culprits?.length > 0 ||
         props.selectedFilters.conditions?.length > 0
          ? "flex"
          : "none"
        }`,
        height: "100%",
       }}
      >
       <div
        className="RoadAccident_filter_item_filter_buttons clear_filter"
        onClick={() => {
         props.selectedFilters.start ? props.resetAll() : props.resetData();
         setReset(true);
        }}
       >
        <IconFilter />
       </div>
      </div>
     </div>
    </div>
    {/* <SelectedFilters className="RoadAccident_selected_filters" /> */}
    <div
     className={`RoadAccident_body_wrap
                 ${isActiveChart ? "chartOn" : "chartOff"}
                 ${isActiveMap ? "mapOn" : "mapOff"}
                 ${isActiveTab ? "tabOn" : "tabOff"}
        `}
    >
     <div className="RoadAccident_body info_block">
      <div className="info_block_item">
       <span>Всего нарушений</span>
       <span className="info_block_item_date">
        {props.showSelectedDate.endDate
         ? `за период с ${props.showSelectedDate.startDate} по ${props.showSelectedDate.endDate}`
         : `за ${props.showSelectedDate.startDate}`}
       </span>
      </div>

      <div className="info_block_item">
       {props.filteredAccidents?.length ?? 0}
      </div>
     </div>
     <div
      className={`RoadAccident_body_chart_wrap 
            ${isActiveChart ? "active" : ""}
            ${isActiveMap ? "mapOn" : "mapOff"}
            ${isActiveTab ? "tabOn" : "tabOff"}  
              `}
     >
      <div className="RoadAccident_body_chart_block">
       <div className="RoadAccident_body chart_Line">
        <div className="RoadAccident_body_crime">Статистика по районам</div>
        {props.filteredAccidents.length > 0 ? (
         !props.isLoading ? (
          <RoadAccidentChart
           typeChart={"HorizontalBar"}
           option={CrimeLineChart_HorizontalBar_option}
           dataSet={CrimeLineChart_HorizontalBar_Dataset}
           isActiveMap={isActiveMap}
           isActiveChart={isActiveChart}
           onElementsClick={(elems) => {
            // if required to build the URL, you can
            // get datasetIndex and value index from an `elem`:
            let temp = "";
            // console.log(elems[0]);
            if (
             elems[0]?._index >= 0 &&
             elems[0]?._index < chart_appeal_OA_status.length
            ) {
             temp = [
              chart_appeal_OA_status.sort((a, b) => {
               if (a.includes("Не указан")) {
                return 1;
               } else if (b.includes("Не указан")) {
                return -1;
               } else if (a < b) return -1;
               else if (a > b) return 1;
               return 0;
              })[elems[0]._index],
             ];
             props.setValue({
              selectedDistricts: !props.isPieClicked ? temp : [],
              isPieClicked: !props.isPieClicked,
             });
             setDistricsAndStreets({
              ...districtsAndStreets,
              ...{ checkedDistricts: !props.isPieClicked ? temp : [] },
             });
             props.filterCrimesData();
            }
           }}
          />
         ) : (
          <div
           className="loading-panel"
           style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           }}
          >
           <Spin size="large" tip="Загрузка" style={{ color: "white" }} />
          </div>
         )
        ) : (
         <div className="no_data_style">
          <span>Нет Данных</span>
         </div>
        )}
       </div>
       <div className="RoadAccident_body chart_Bar">
        <div className="RoadAccident_body_crime">Статистика по дням</div>
        {props.filteredAccidents.length > 0 ? (
         !props.isLoading ? (
          <RoadAccidentChart
           typeChart={"Line"}
           option={CrimeLineChart_Line_option}
           dataSet={CrimeLineChart_Line_Dataset}
           isActiveMap={isActiveMap}
           isActiveChart={isActiveChart}
          />
         ) : (
          <div
           className="loading-panel"
           style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           }}
          >
           <Spin size="large" tip="Загрузка" style={{ color: "white" }} />
          </div>
         )
        ) : (
         <div className="no_data_style">
          <span>Нет Данных</span>
         </div>
        )}
       </div>
      </div>
     </div>
     <div
      id="map_block"
      className={`RoadAccident_body map_block 
            ${isActiveMap ? "active" : ""} 
         /*   ${isActiveChart ? "chartOn" : "chartOff"}
            ${isActiveTab ? "tabOn" : "tabOff"}*/
            `}
     >
      {!props.isLoading ? (
       <YandexMap
        mapState={mapState}
        mapdata={props.mapData ?? []}
        isActiveMap={isActiveMap}
        isActiveChart={isActiveChart}
        isActiveTab={isActiveTab}
        isHeatMap={isHeatMap}
        clickedPoint={clickedPoint}
        setIsHeatMap={setIsHeatMap}
       />
      ) : (
       <div
        className="loading-panel"
        style={{
         height: "100%",
         width: "100%",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
        }}
       >
        <Spin size="large" tip="Загрузка" style={{ color: "white" }} />
       </div>
      )}
     </div>
     <div
      className={`RoadAccident_body table_block 
            ${isActiveTab ? "active" : ""}
            ${isActiveChart ? "chartOn" : "chartOff"}
            ${isActiveMap ? "mapOn" : "mapOff"}
            `}
     >
      <RoadAccident
       RoadAccidentTableData={props.filteredAccidents?.map((el, index) => {
        return {
         key: index,
         date: moment.unix(el["date"] / 1000).format("DD.MM.YYYY"),
         district: el["district"],
         spot: el["location"] ?? "Не указан",
         timeDay: el["time-descr"],
         crime: el["violation-type"],
         driver: el["driver-condition"],
         culprit: el["culprit"],
         category: el["vehicle-category"] ?? "Не указан",
         transportType:
          el["is-public-transport"] === 0 ? "Частный" : "Общественный",
        };
       })}
       handleRowClick={(index) => {
        setMapState({
         ...mapState,
         ...{
          center: [
           props.filteredAccidents[index].geometry.y,
           props.filteredAccidents[index].geometry.x,
          ],
          zoom: 18,
         },
        });

        setClickedPoint(index);
       }}
      />
     </div>
    </div>
   </div>
  </div>
 );
};

const mapStateToProps = (state) => {
 return {
  isPieClicked: state.accidentsReducer.isPieClicked ?? false,
  showSelectedDate: state.accidentsReducer.showSelectedDate,
  filteredAccidents: state.accidentsReducer.filteredAccidents,
  accidentsGroupedByDates: state.accidentsReducer.accidentsGroupedByDates,
  primaryDistrictsAndStreets: state.accidentsReducer.primaryDistrictsAndStreets,
  region: state.accidentsReducer.accidentsByRegions,
  mapData: state.accidentsReducer.mapdata,
  selectedFilters: {
   start: state.accidentsReducer.startDate?.format("YYYY-MM-DD") ?? null,
   end: state.accidentsReducer.endDate?.format("YYYY-MM-DD") ?? null,
   disricts: state.accidentsReducer.selectedDistricts ?? [],
   locations: state.accidentsReducer.selectedLocations ?? [],
   violations: state.accidentsReducer.selectedViolations ?? [],
   transCategory: state.accidentsReducer.selectedTransportCategories ?? [],
   culprits: state.accidentsReducer.selectedCulprits ?? [],
   conditions: state.accidentsReducer.selectedDriverCondition ?? [],
  },

  isLoading: state.accidentsReducer.isLoading,
 };
};

const mapDispatchToProps = (dispatch) => ({
 resetAll: () => dispatch({ type: RESET_ALL }),
 resetData: () => dispatch({ type: RESET_FILTERS }),
 fetchAccidentsData: (payload) => dispatch({ type: FETCH_ACCIDENTS_EPIC, payload }),
 setValue: (payload) => dispatch(setFilterValue(payload)),
 fetchFilteredAccidentData: (payload) =>
  dispatch({ type: FETCH_FILTER_ACCIDENTS_EPIC, payload: { ...payload } }),
 filterCrimesData: () => dispatch({ type: FILTER_ACCIDENTS_DATA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoadAccidentBlock);
