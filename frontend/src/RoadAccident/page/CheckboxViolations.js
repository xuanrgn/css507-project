import React, { useState } from "react";
import { Menu, Dropdown, Button, Typography, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Row, Col } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import { setSelectedViolations, setFilterValue } from "../../redux/actions";
import { FILTER_ACCIDENTS_DATA } from "../../redux/types";
import { RoadAccidentCrime } from "./ChartOption";

const jp = require("jsonpath");

/** Выпадашка для отображения фильтров и фильтрации по типу проишествия
 *  После выбора статусов и приминение вызываеться функция setFilterViolations()
 *  для сохранения выбранных фильтров по типу проишествия
 *  и вторая функиця filterData() для приминение выбранных фильтров
 */
const CheckboxViolations = ({
 titleBtn,
 filteredAccidents,
 handleSetSelectedViolations,
 filterData,
 setFilterViolations,
 setPeriodVisible,
 selectedViolations,
 reset,
 setReset,
}) => {
 /** переменные
  * visible - состояние выпадашки
  * violations - основные категории
  * checkedViolations - выбранные катерогии
  * mapStateToProps = данные из редакс
  * mapDistrictToProps = функции из редакс
  * filterData() = приминение выбранных фильтров
  * setFilterViolations() = сохранение выбранных фильтров
  */
 const [visible, setVisible] = useState(false);
 const [violations, setViolations] = useState([]);
 const [checkedViolations, setCheckedViolations] = useState([]);

 /** Получение данных о категориях */
 useEffect(() => {
  if (filteredAccidents) {
   const violations = [
    ...new Set(
     jp.query(
      JSON.parse(JSON.stringify(filteredAccidents)),
      "$..[?(@['violation-type'] != null & @['violation-type'] != '')]['violation-type']"
     )
    ),
   ];
   selectedViolations.length === 0 && setViolations(violations);
  }

  reset && setCheckedViolations([]);
  setReset(false);
 }, [filteredAccidents, reset]);

 /** изминения */
 const handleLocationsChange = (event) => {
  setCheckedViolations(event);
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
     <Checkbox.Group
      value={checkedViolations}
      className="ant_drop_block_Checkbox Offence_block_Filter"
      options={violations}
      onChange={handleLocationsChange}
     />
    </div>
   ) : null}
   {filteredAccidents?.length > 0 ? (
    <Menu.Item key="6" className="ant_drop_block_item">
     <div
      className="ant_drop_block_btn"
      style={{
       justifyContent: `${
        checkedViolations.length > 0 && selectedViolations.length > 0
         ? "space-between"
         : "flex-end"
       }`,
      }}
     >
      {selectedViolations.length > 0 && (
       <span className="default_btn_style active">
        <span
         /** Сброс данных */
         onClick={() => {
          setCheckedViolations([]);
          setFilterViolations({
           selectedViolations: [],
          });
          filterData();
         }}
        >
         Сбросить
        </span>
       </span>
      )}
      {checkedViolations.length > 0 && (
       <span
        className={`default_btn_style ${
         checkedViolations.length === 0 ? "" : "active"
        }`}
       >
        <span
         /** Применение выбранных данных */
         onClick={() => {
          setFilterViolations({
           selectedViolations: checkedViolations,

           // selectedLocations: [],
           // selectedTransportCategories: [],
           // selectedCulprits: [],
           // selectedDistricts: [],
           // selectedConditions: [],
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
   className={`ant_drop_menu `}
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
  filteredAccidents: state.accidentsReducer.filteredAccidents,
  selectedViolations: state.accidentsReducer.selectedViolations ?? [],
 };
};
const mapDistrictToProps = (dispatch) => ({
 filterData: () => dispatch({ type: FILTER_ACCIDENTS_DATA }),
 setFilterViolations: (payload) => dispatch(setFilterValue(payload)),
});
export default connect(mapStateToProps, mapDistrictToProps)(CheckboxViolations);
