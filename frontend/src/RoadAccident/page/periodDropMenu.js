import React, { useState } from "react";
import { Menu, Dropdown, Button, Typography, DatePicker, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import AirDatepicker from "../DatePicker/DatePicker";
import {
 setSelectedDate,
 setSelectedDayTypes,
 setFilterValue,
} from "../../redux/actions";
import {
 FETCH_FILTER_ACCIDENTS_EPIC,
 FILTER_ACCIDENTS_DATA,
} from "../../redux/types";
import { useEffect } from "react";

var moment = require("moment");

/** Выпадашка для отображения фильтров и фильтрации по времени и дате проишествия
 *  После выбора статусов и приминение вызываеться функция setSelectedDate()
 *  для сохранения выбранных фильтров по времени и дате проишествия
 *  и вторая функиця filterData() для приминение выбранных фильтров
 *  при сбросе всех фильтров запрашиваем у сервера начальне данные fetchFilteredCrimesData()
 */
const PeriodDropMenu = ({
 newVisible,
 setVisible,
 titleBtn,
 checkBox,
 setSelectedDate,
 setSelectedDay,
 filterData,
 streets,
 districts,
 articles,
 severities,
 start,
 agencies,
 reset,
 setReset,
 fetchFilteredCrimesData,
 selectedDayTimes,
 end,
 setIsHeatMap,
    config
}) => {
 /** переменные
  * selectedDates - выбранные даты
  * selectedDate - выбранный тип дат
  * mapStateToProps = данные из редакс
  * mapDistrictToProps = функции из редакс
  * filterData() = приминение выбранных фильтров
  * setSelectedDate() = сохранение выбранных фильтров
  * fetchFilteredCrimesData() = запрос данных из сервера
  */
 const [checkedDayTypes, setCheckedDayTypes] = useState([]);
 const [selectedDates, setSelectedDates] = useState();
 const [selectedDate, changeSelectedDate] = useState();

 /** Сброс данных */
 useEffect(() => {
  reset && clearAll();
  setReset(false);
 }, [newVisible, reset]);

 /** Сброс данных */
 const clearAll = () => {
  setIsHeatMap(false);
  setSelectedDates({
   startDate: null,
   endDate: null,
  });
  setSelectedDate({
   startDate: null,
   endDate: null,
   showSelectedDate: {
    startDate: moment().subtract(1, "months").format("DD.MM.YY"),
    endDate: moment().format("DD.MM.YY"),
   },
   selectedDayTimes: [],
  });
  fetchFilteredCrimesData({
   // start: moment().subtract(1, "months").format("YYYY-MM-DD"),
   // end: moment().format("YYYY-MM-DD"),
      config
  });
  changeSelectedDate(null);
  setCheckedDayTypes([]);
 };

 const menu = (
  <Menu className="ant_drop_block">
   <Menu.Item key="0">
    <div>
     <AirDatepicker
      handleModalClose={setVisible}
      setSelectedDates={setSelectedDates}
      changeSelectedDate={changeSelectedDate}
     />
    </div>
   </Menu.Item>
   <Menu.Item
    key="1"
    className={`ant_drop_block_item ${selectedDate === 1 ? "active" : ""}`}
    onClick={() => {
     setSelectedDates({
      startDate: moment().subtract(1, "weeks"),
      endDate: moment(),
     });
     changeSelectedDate(1);
    }}
   >
    <Typography.Text className="ant_drop_block_text">За неделю</Typography.Text>
   </Menu.Item>
   <Menu.Item
    key="2"
    className={`ant_drop_block_item ${selectedDate === 2 ? "active" : ""}`}
    onClick={() => {
     setSelectedDates({
      startDate: moment().subtract(1, "months"),
      endDate: moment(),
     });
     changeSelectedDate(2);
    }}
   >
    <Typography.Text className="ant_drop_block_text">За месяц</Typography.Text>
   </Menu.Item>
   <Menu.Item
    key="3"
    className={`ant_drop_block_item ${selectedDate === 3 ? "active" : ""}`}
    onClick={() => {
     setSelectedDates({
      startDate: moment().subtract(3, "months"),
      endDate: moment(),
     });

     changeSelectedDate(3);
    }}
   >
    <Typography.Text className="ant_drop_block_text">
     За квартал
    </Typography.Text>
   </Menu.Item>
   <Menu.Item key="4" className="ant_drop_block_item_Time">
    <Checkbox.Group
     value={checkedDayTypes}
     className="ant_drop_block_Checkbox"
     options={checkBox}
     onChange={(e) => {
      setCheckedDayTypes(e);
     }}
    />
   </Menu.Item>
   <Menu.Item key="4" className="ant_drop_block_item">
    <div
     className="ant_drop_block_btn"
     style={{
      justifyContent: `${
       start && selectedDates?.startDate ? "space-between" : "flex-end"
      }`,
     }}
    >
     {start && (
      <span
       className="default_btn_style"
       /** Сброс данных */
       onClick={() => {
        clearAll();
       }}
      >
       Сбросить
      </span>
     )}
     {(selectedDates?.startDate || checkedDayTypes?.length > 0) && (
      <span
       className={`default_btn_style ${selectedDates?.startDate && "active"}`}
       /** Применение выбранных данных */
       onClick={() => {
        setIsHeatMap(false);
        setVisible(false);
        (selectedDates?.startDate || checkedDayTypes?.length > 0) &&
         setSelectedDate({
          selectedDayTimes: checkedDayTypes ?? [],
          startDate: selectedDates?.startDate ?? moment(start, "DD.MM.YY"),
          endDate: selectedDates?.endDate ?? null,
          showSelectedDate: {
           startDate:
            selectedDates?.startDate?.format("DD.MM.YY") ??
            moment().subtract(1, "weeks").format("DD.MM.YY"),
           endDate: selectedDates?.endDate?.format("DD.MM.YY") ?? null,
          },
         });
        checkedDayTypes?.length > 0 && filterData();
        selectedDates?.startDate &&
         fetchFilteredCrimesData({
          start: selectedDates.startDate.format("YYYY-MM-DD"),
          end: selectedDates.endDate?.format("YYYY-MM-DD") ?? selectedDates.startDate.format("YYYY-MM-DD"), config
         });
       }}
      >
       Применить
      </span>
     )}
    </div>
   </Menu.Item>
  </Menu>
 );
 return (
  <Dropdown
   overlay={menu}
   trigger={["click"]}
   visible={newVisible}
   onClick={() => setVisible(!newVisible)}
   // onVisibleChange={(val) => setVisible(val)}
   className="ant_drop_menu"
  >
   <Button className="ant_drop_btn">
    {titleBtn}
    <DownOutlined />
   </Button>
  </Dropdown>
 );
};

const mapStateToProps = (state) => {
 return {
  isLoading: state.accidentsReducer?.isLoading,
  start: state.accidentsReducer?.startDate,
  end: state.accidentsReducer?.showSelectedDate.endDate,
  streets: state.accidentsReducer?.selectedStreets,
  districts: state.accidentsReducer?.selectedDistricts,
  selectedDayTimes: state.accidentsReducer?.selectedDayTimes,
  severities: state.accidentsReducer?.selectedSeverities,
  agencies: state.accidentsReducer?.selectedAgencies,
 };
};

const mapDistrictToProps = (dispatch) => ({
 filterData: () => dispatch({ type: FILTER_ACCIDENTS_DATA }),
 fetchFilteredCrimesData: (payload) =>
  dispatch({ type: FETCH_FILTER_ACCIDENTS_EPIC, payload: payload }),
 setSelectedDate: (payload) => dispatch(setFilterValue(payload)),
});
export default connect(mapStateToProps, mapDistrictToProps)(PeriodDropMenu);
