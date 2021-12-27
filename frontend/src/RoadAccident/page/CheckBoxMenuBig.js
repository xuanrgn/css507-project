import React, { useState } from "react";
import { Menu, Dropdown, Button, Typography, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Row, Col } from "antd";
import {
 RoadAccidentDriverCategory,
 RoadAccidentDriverPerpetrator,
 RoadAccidentDriverStatus,
} from "./ChartOption";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setFilterValue } from "../../redux/actions";
import { FILTER_ACCIDENTS_DATA } from "../../redux/types";
import { accidentsReducer } from "../../redux/accidents/reducer";
const jp = require("jsonpath");

/** Выпадашка для отображения фильтров и фильтрации по состоянию водителя, тип транспорта,
 *  После выбора статусов и приминение вызываеться функция setFilter()
 *  для сохранения выбранных фильтров
 *  и вторая функиця filterData() для приминение выбранных фильтров
 */
const CheckBoxMenu = ({
 titleBtn,
 RoadAccidentDriverCategory,
 RoadAccidentDriverPerpetrator,
 RoadAccidentDriverStatus,
 filteredAccidents,
 accidents,
 setFilter,
 filterData,
 setPeriodVisible,
 selectedConditions,
 selectedCulprits,
 selectedTransportCategories,
 reset,
 setReset,
}) => {
 /** переменные
  * visible - состояние выпадашки
  * checkPrimaryBoxsValues - основные категории
  * checkBoxsValues - отфильтрованные категории
  * checkedCulprits,checkedTransportCategories,checkedDriverConditions  - выбранные катерогии
  * mapStateToProps = данные из редакс
  * mapDistrictToProps = функции из редакс
  * filterData() = приминение выбранных фильтров
  * setFilter() = сохранение выбранных фильтров
  */

 const [visible, setVisible] = useState(false);
 const [checkPrimaryBoxsValues, setCheckPrimaryBoxsValues] = useState({});
 const [checkBoxsValues, setCheckBoxsValues] = useState({});
 const [checkedCulprits, setCheckedCulprits] = useState([]);
 const [checkedTransportCategories, setCheckedTransportCategories] = useState(
  []
 );
 const [checkedDriverConditions, setCheckedDriverConditions] = useState([]);

 /** Получение данных о категориях */
 useEffect(() => {
  if (filteredAccidents) {
   const transportCategories = [
    ...new Set(
     jp
      .query(
       JSON.parse(JSON.stringify(filteredAccidents)),
       "$..[?(@['vehicle-category'] != null & @['vehicle-category'] != '')]['vehicle-category']"
      )
      .reduce((acc, el) => {
       el.split(", ").map((el1) => {
        acc.push(el1.trim());
       });
       if (el.includes(",")) {
        return [...new Set(acc)];
       } else {
        return acc;
       }
      }, [])
    ),
   ];
   const primaryTransportCategories = [
    ...new Set(
     jp
      .query(
       JSON.parse(JSON.stringify(accidents)),
       "$..[?(@['vehicle-category'] != null & @['vehicle-category'] != '')]['vehicle-category']"
      )
      .reduce((acc, el) => {
       el.split(", ").map((el1) => {
        acc.push(el1.trim());
       });
       if (el.includes(",")) {
        return [...new Set(acc)];
       } else {
        return acc;
       }
      }, [])
    ),
   ];
   const primaryCulprits = [
    ...new Set(
     jp.query(
      JSON.parse(JSON.stringify(accidents)),
      "$..[?(@.culprit != null & @.culprit != '')]['culprit']"
     )
    ),
   ];
   const culprits = [
    ...new Set(
     jp.query(
      JSON.parse(JSON.stringify(filteredAccidents)),
      "$..[?(@.culprit != null & @.culprit != '')]['culprit']"
     )
    ),
   ];
   const primaryDriverConditions = [
    ...new Set(
     jp.query(
      JSON.parse(JSON.stringify(accidents)),
      "$..[?(@['driver-condition'] != null & @['driver-condition'] != '')]['driver-condition']"
     )
    ),
   ];
   const driverConditions = [
    ...new Set(
     jp.query(
      JSON.parse(JSON.stringify(filteredAccidents)),
      "$..[?(@['driver-condition'] != null & @['driver-condition'] != '')]['driver-condition']"
     )
    ),
   ];
   setCheckPrimaryBoxsValues({
    transportCategories: primaryTransportCategories,
    culprits: primaryCulprits,
    driverConditions: primaryDriverConditions,
   });
   setCheckBoxsValues({
    transportCategories:
     selectedTransportCategories.length === 0
      ? transportCategories
      : checkBoxsValues.transportCategories,
    culprits:
     selectedCulprits.length === 0 ? culprits : checkBoxsValues.culprits,
    driverConditions:
     selectedConditions.length === 0
      ? driverConditions
      : checkBoxsValues.driverConditions,
   });
  }
  reset && setCheckedCulprits([]);
  reset && setCheckedDriverConditions([]);
  reset && setCheckedTransportCategories([]);
  setReset(false);
 }, [filteredAccidents, reset]);

 /** изминения */
 const handleLocationsChange = (event, type) => {
  switch (type) {
   case "category":
    setCheckedTransportCategories(event);
    break;
   case "culprit":
    setCheckedCulprits(event);
    break;
   case "condition":
    setCheckedDriverConditions(event);
    break;
  }
 };

 const menu = (
  <Menu className="ant_drop_block">
   {filteredAccidents?.length === 0 ? (
    <div className="info-panel">
     {filteredAccidents.length === 0 ? "Нет Данных" : ""}
    </div>
   ) : null}
   {filteredAccidents?.length > 0 ? (
    <div>
     <span className="ant_drop_block_title">Категория</span>
     <Checkbox.Group
      value={checkedTransportCategories}
      className="ant_drop_block_Checkbox row_item"
      // options={checkBoxsValues.transportCategories}
      onChange={(e) => handleLocationsChange(e, "category")}
     >
      {checkPrimaryBoxsValues.transportCategories.map((el, index) => {
       const res = checkBoxsValues.transportCategories.filter(
        (el1) => el1 === el
       );

       return (
        <Checkbox
         key={index}
         value={el}
         disabled={!(res.length > 0)}
         className={`ant-checkbox-group-item ant-checkbox-wrapper ant-checkbox-wrapper-checked ${
          res.length > 0 ? "" : "ant-checkbox-wrapper-disabled"
         }`}
        >
         {el}
        </Checkbox>
       );
      })}
     </Checkbox.Group>
    </div>
   ) : null}
   {filteredAccidents?.length > 0 ? (
    <div>
     <span className="ant_drop_block_title">Виновник</span>
     <Checkbox.Group
      value={checkedCulprits}
      className="ant_drop_block_Checkbox"
      // options={checkBoxsValues.culprits}
      onChange={(e) => handleLocationsChange(e, "culprit")}
     >
      {checkPrimaryBoxsValues.culprits.map((el, index) => {
       const res = checkBoxsValues.culprits.filter((el1) => el1 === el);

       return (
        <Checkbox
         key={index}
         value={el}
         disabled={!(res.length > 0)}
         className={`ant-checkbox-group-item ant-checkbox-wrapper ant-checkbox-wrapper-checked ${
          res.length > 0 ? "" : "ant-checkbox-wrapper-disabled"
         }`}
        >
         {el}
        </Checkbox>
       );
      })}
     </Checkbox.Group>
    </div>
   ) : null}
   {filteredAccidents?.length > 0 ? (
    <div>
     <span className="ant_drop_block_title">Состояние водителя</span>
     <Checkbox.Group
      value={checkedDriverConditions}
      className="ant_drop_block_Checkbox"
      onChange={(e) => handleLocationsChange(e, "condition")}
     >
      {checkPrimaryBoxsValues.driverConditions.map((el, index) => {
       const res = checkBoxsValues.driverConditions.filter((el1) => el1 === el);

       return (
        <Checkbox
         key={index}
         value={el}
         disabled={!(res.length > 0)}
         className={`ant-checkbox-group-item ant-checkbox-wrapper ant-checkbox-wrapper-checked ${
          res.length > 0 ? "" : "ant-checkbox-wrapper-disabled"
         }`}
        >
         {el}
        </Checkbox>
       );
      })}
     </Checkbox.Group>
    </div>
   ) : null}
   {filteredAccidents?.length > 0 ? (
    <Menu.Item key="6" className="ant_drop_block_item">
     <div
      className="ant_drop_block_btn"
      style={{
       justifyContent: `${
        (selectedConditions.length > 0 ||
         selectedCulprits.length > 0 ||
         selectedTransportCategories.length > 0) &&
        (checkedCulprits.length > 0 ||
         checkedDriverConditions.length > 0 ||
         checkedTransportCategories.length > 0)
         ? "space-between"
         : "flex-end"
       }`,
      }}
     >
      {(selectedConditions.length > 0 ||
       selectedCulprits.length > 0 ||
       selectedTransportCategories.length > 0) && (
       <span className="default_btn_style active">
        <span
         /** Сброс данных */
         onClick={() => {
          setCheckedTransportCategories([]);
          setCheckedCulprits([]);
          setCheckedDriverConditions([]);
          setFilter({
           selectedTransportCategories: [],
           selectedCulprits: [],
           selectedConditions: [],
          });
          filterData();
         }}
        >
         Сбросить
        </span>
       </span>
      )}
      {(checkedCulprits.length > 0 ||
       checkedDriverConditions.length > 0 ||
       checkedTransportCategories.length > 0) && (
       <span
        className={`default_btn_style ${
         checkedDriverConditions.length > 0 ||
         checkedTransportCategories.length > 0 ||
         checkedCulprits.length > 0
          ? "active"
          : ""
        }`}
       >
        <span
         /** Применение выбранных данных */
         onClick={() => {
          setFilter({
           selectedTransportCategories: checkedTransportCategories,
           selectedCulprits: checkedCulprits,
           selectedConditions: checkedDriverConditions,

           // selectedLocations: [],
           // selectedViolations: [],
           // selectedDistricts: [],
          });
          filterData();
         }}
        >
         Применить
        </span>
       </span>
      )}
     </div>
    </Menu.Item>
   ) : null}
  </Menu>
 );
 return (
  <Dropdown
   overlay={menu}
   trigger={["click"]}
   visible={visible}
   onVisibleChange={(val) => {
    setVisible(val);
    setPeriodVisible(false);
   }}
   className="ant_drop_menu"
  >
   <Button className="ant_drop_btn">
    {titleBtn}
    <DownOutlined />
   </Button>
  </Dropdown>
 );
};

/** Redux переменные */
const mapStateToProps = (state) => {
 return {
  accidents: state.accidentsReducer.accidents,
  filteredAccidents: state.accidentsReducer.filteredAccidents,
  selectedConditions: state.accidentsReducer.selectedConditions ?? [],
  selectedCulprits: state.accidentsReducer.selectedCulprits ?? [],
  selectedTransportCategories:
   state.accidentsReducer.selectedTransportCategories ?? [],
 };
};
/** Redux функции */
const mapDistrictToProps = (dispatch) => ({
 filterData: () => dispatch({ type: FILTER_ACCIDENTS_DATA }),
 setFilter: (payload) => dispatch(setFilterValue(payload)),
});
export default connect(mapStateToProps, mapDistrictToProps)(CheckBoxMenu);
