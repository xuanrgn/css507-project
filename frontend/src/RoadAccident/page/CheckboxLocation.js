import React, { useState } from "react";
import { Menu, Dropdown, Button, Typography, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Row, Col } from "antd";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
 setSelectedarticles,
 setSelectedArticles,
 setSelectedLocations,
 setFilterValue,
} from "../../redux/actions";
import {
 FETCH_FILTER_ACCIDENTS_EPIC,
 FILTER_CRIMES_DATA,
 FILTER_ACCIDENTS_DATA,
} from "../../redux/types";

const jp = require("jsonpath");

/** Выпадашка для отображения фильтров и фильтрации по месту проишествия
 *  После выбора статусов и приминение вызываеться функция setFilterLocations()
 *  для сохранения выбранных фильтров месту
 *  и вторая функиця filterCrimesData() для приминение выбранных фильтров
 */
const CheckboxLocations = ({
 titleBtn,
 filteredAccidents,
 handleSetSelectedLocations,
 primaryRoadAccidents,
 setFilterLocations,
 filterCrimesData,
 setPeriodVisible,
 selectedLocations,
 reset,
 setReset,
}) => {
 /** переменные
  * visible - состояние выпадашки
  * primaryLocations - основные категории
  * locations - отфильтрованные категории
  * checkedLocations - выбранные катерогии
  * mapStateToProps = данные из редакс
  * mapDistrictToProps = функции из редакс
  * filterCrimesData() = приминение выбранных фильтров
  * setFilterLocations() = сохранение выбранных фильтров
  */

 const [visible, setVisible] = useState(false);
 const [primaryLocations, setPrimaryLocations] = useState([]);
 const [locations, setLocations] = useState([]);
 const [checkedLocations, setCheckedLocations] = useState([]);

 /** Получение данных о категориях */
 useEffect(() => {
  const locations = [
   ...new Set(
    jp.query(
     JSON.parse(JSON.stringify(filteredAccidents)),
     "$..[?(@.location != null & @.location != '')].location"
    )
   ),
  ];
  selectedLocations.length === 0 && setLocations(locations);
  const primaryLocations = [
   ...new Set(
    jp.query(
     JSON.parse(JSON.stringify(primaryRoadAccidents)),
     "$..[?(@.location != null & @.location != '')].location"
    )
   ),
  ];
  setPrimaryLocations(primaryLocations);
  reset && setCheckedLocations([]);
  setReset(false);
 }, [filteredAccidents, reset]);

 /** Парсинг данных из json */
 const handleLocationsChange = (event) => {
  setCheckedLocations(event);
 };

 const menu = (
  <Menu className="ant_drop_block">
   {filteredAccidents.length > 0 ? (
    <div>
     <Checkbox.Group
      value={checkedLocations}
      className="ant_drop_block_Checkbox"
      // options={locations}
      onChange={handleLocationsChange}
     >
      {primaryLocations.map((el, index) => {
       const res = locations.filter((el1) => el1 === el);

       return (
        <Checkbox
         key={el}
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
   {filteredAccidents.length > 0 ? (
    <Menu.Item key="6" className="ant_drop_block_item">
     <div
      className="ant_drop_block_btn"
      style={{
       justifyContent: `${
        checkedLocations.length > 0 && selectedLocations.length > 0
         ? "space-between"
         : "flex-end"
       }`,
      }}
     >
      {selectedLocations.length > 0 && (
       <span className="default_btn_style active">
        <span
         /** Сброс данных */
         onClick={() => {
          setCheckedLocations([]);
          setFilterLocations({
           selectedLocations: [],
          });
          filterCrimesData();
         }}
        >
         Сбросить
        </span>
       </span>
      )}
      {checkedLocations.length > 0 && (
       <span
        className={`default_btn_style ${
         checkedLocations.length === 0 ? "" : "active"
        }`}
       >
        <span
         /** Применение выбранных данных */
         onClick={() => {
          setFilterLocations({
           selectedLocations: checkedLocations,
           // selectedTransportCategories: [],
           // selectedCulprits: [],
           // selectedViolations: [],
           // selectedConditions: [],
          });
          filterCrimesData();
         }}
        >
         Применить
        </span>
       </span>
      )}
     </div>
    </Menu.Item>
   ) : null}
   {filteredAccidents?.length === 0 ? (
    <div className="info-panel">
     {filteredAccidents.length === 0 ? "Нет Данных" : ""}
    </div>
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
    checkedLocations.length != selectedLocations.length &&
     setCheckedLocations(selectedLocations);
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
  primaryRoadAccidents: state.accidentsReducer.accidents,
  filteredAccidents: state.accidentsReducer.filteredAccidents,
  selectedLocations: state.accidentsReducer.selectedLocations ?? [],
 };
};
/** Redux функции */
const mapDistrictToProps = (dispatch) => ({
 filterCrimesData: () => dispatch({ type: FILTER_ACCIDENTS_DATA }),
 setFilterLocations: (payload) => dispatch(setFilterValue(payload)),
});
export default connect(mapStateToProps, mapDistrictToProps)(CheckboxLocations);
