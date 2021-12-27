import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Input, Typography, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import testtt from "../FakeData";
import {
 setSelectedDistrictsAndStreets,
 setFilterValue,
} from "../../redux/actions";
import { connect } from "react-redux";
import { chart_appeal_OA_status } from "./ChartOption";
import { FILTER_CRIMES_DATA, FILTER_ACCIDENTS_DATA } from "../../redux/types";
const jp = require("jsonpath");

/** Выпадашка для отображения фильтров и фильтрации по району проишествия
 *  После выбора статусов и приминение вызываеться функция setFilterDistrict()
 *  для сохранения выбранных фильтров районов
 *  и вторая функиця filterCrimesData() для приминение выбранных фильтров
 */
const CheckboxDistricts = ({
 titleBtn,
 filteredAccidents,
 setSelectedDistrics,
 setFilterDistrict,
 filterCrimesData,
 setPeriodVisible,
 selectedDistricts,
 reset,
 setReset,
 districtsAndStreets,
 setDistricsAndStreets,
}) => {
 /** переменные
  * visible - состояние выпадашки
  * districtsAndStreets - основные категории
  * mapStateToProps = данные из редакс
  * mapDistrictToProps = функции из редакс
  * filterCrimesData() = приминение выбранных фильтров
  * setFilterDistrict() = сохранение выбранных фильтров
  */
 const [visible, setVisible] = useState(false);

 /** переменные
  * changeHandler - изминение данных
  */
 const changeHandler = ({ value }) => {
  setDistricsAndStreets({ ...districtsAndStreets, ...value });
 };
 /**
  * начальные данные
  */
 useEffect(() => {
  if (filteredAccidents) {
   const districs = [
    ...new Set(
     jp.query(JSON.parse(JSON.stringify(filteredAccidents)), "$..district")
    ),
   ];

   const streets = [
    ...new Set(
     jp.query(
      JSON.parse(JSON.stringify(filteredAccidents)),
      "$..[?(@.street != null & @.street != '')].street"
     )
    ),
   ];
   selectedDistricts.length === 0 &&
    changeHandler({
     value: {
      districts: districs,
      districtFilter: districs,
      streets: streets,
      streetsFilter: streets,

      checkedDistricts: reset ? [] : districtsAndStreets.checkedDistricts,
      checkedStreets: reset ? [] : districtsAndStreets.checkedStreets,
     },
    });
  }
  setReset(false);
 }, [filteredAccidents, reset]);

 const filterDistr = (e) => {
  let disfil = districtsAndStreets.districts.filter((el) =>
   el.toUpperCase().includes(e.target.value.toUpperCase())
  );
  changeHandler({ value: { districtFilter: disfil } });

  const distCH = districtsAndStreets.checkedDistricts;
  updateStreet({ values: disfil });
  // changeHandler({ value: { checkedDistricts: distCH } });
 };
 const filterStreet = (e) => {
  if (e !== "") {
   changeHandler({
    value: {
     tempStreetFilter: districtsAndStreets.streetsFilter.filter((el) =>
      el.toUpperCase().includes(e.target.value.toUpperCase())
     ),
    },
   });
  } else {
   changeHandler({
    value: {
     tempStreetFilter: [],
    },
   });
  }
 };
 /**
  * при выборе района
  */
 const updateStreet = ({ values }) => {
  if (values.length === 0) {
   changeHandler({
    value: {
     streetsFilter: districtsAndStreets.streets,
     checkedDistricts: values,
    },
   });
   return;
  }
  let arrStreet = [];
  // for (let i = 0; i < values.length; i++) {
  //   const streets = jp.query(
  //     JSON.parse(JSON.stringify(filteredAccidents)),
  //     `$[?(@.district == ['${values[i]}'] & @.street != '')].street`
  //   )[0];
  //   if (streets) {
  //     arrStreet.push(streets);
  //   }
  // }
  arrStreet = [...new Set(arrStreet.flatMap((el) => el))];
  // console.log(arrStreet);
  changeHandler({
   value: { checkedDistricts: values, streetsFilter: arrStreet },
  });
 };
 const clearAll = () => {
  changeHandler({ value: { checkedDistricts: [], checkedStreets: [] } });
 };
 const saveChecked = () => {};
 const menu = (
  <Menu className="ant_drop_block">
   {filteredAccidents?.length === 0 ? (
    <div className="info-panel">
     {filteredAccidents.length === 0 ? "Нет Данных" : ""}
    </div>
   ) : null}
   {filteredAccidents?.length > 0 ? (
    <Menu.Item key="2" className="ant_drop_block_item">
     <div style={{ height: "250px" }}>
      <Checkbox.Group
       value={districtsAndStreets?.checkedDistricts}
       onChange={(v) => {
        updateStreet({ values: v });
       }}
       className="ant_drop_block_item_list"
      >
       {[
        "Ауэзовский район",
        "Бостандыкский район",
        "Алатауский район",
        "Медеуский район",
        "Алмалинский район",
        "Турксибский район",
        "Наурызбайский район",
        "Жетысуский район",
        "Не указан",
       ]
        .sort((a, b) => {
         if (a.includes("Не указан")) {
          return 1;
         } else if (b.includes("Не указан")) {
          return -1;
         } else if (a < b) return -1;
         else if (a > b) return 1;
         return 0;
        })
        .map((el, index) => {
         const res = districtsAndStreets.districtFilter.filter(
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
    </Menu.Item>
   ) : null}

   {filteredAccidents?.length !== 0 ? (
    <Menu.Item key="6" className="ant_drop_block_item">
     <div
      className="ant_drop_block_btn"
      style={{
       justifyContent: `${
        selectedDistricts.length > 0 &&
        (districtsAndStreets.checkedDistricts.length > 0 ||
         districtsAndStreets.checkedStreets.length > 0)
         ? "space-between"
         : "flex-end"
       }`,
      }}
     >
      {selectedDistricts.length > 0 && (
       <span
        disabled={selectedDistricts?.length === 0}
        className={`default_btn_style active`}
       >
        <span
         /**
          * сброс данных
          */
         onClick={() => {
          setFilterDistrict({
           districts: [],
           streets: [],
          });
          filterCrimesData();
          clearAll();
         }}
        >
         Сбросить
        </span>
       </span>
      )}
      {(districtsAndStreets.checkedDistricts.length > 0 ||
       districtsAndStreets.checkedStreets.length > 0) && (
       <span
        className={`default_btn_style ${
         districtsAndStreets.checkedDistricts?.length === 0 &&
         districtsAndStreets.checkedStreets?.length === 0
          ? ""
          : "active"
        }`}
       >
        <span
         /**
          * приминение выбранных данных
          */
         onClick={() => {
          setFilterDistrict({
           districts: districtsAndStreets.checkedDistricts ?? [],
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
    {titleBtn} <DownOutlined />
   </Button>
  </Dropdown>
 );
};

const streets = [
 "ул. Толе би",
 "ул. Поперечная",
 "пр. Гагарина",
 "ул. Майлина",
 "ул. Хмельницкого",
];

/** Redux переменные */
const mapStateToProps = (state) => {
 return {
  filteredAccidents: state.accidentsReducer.filteredAccidents,
  selectedDistricts: state.accidentsReducer.selectedDistricts ?? [],
 };
};

/** Redux функции */
const mapDistrictToProps = (dispatch) => ({
 filterCrimesData: () => dispatch({ type: FILTER_ACCIDENTS_DATA }),
 setFilterDistrict: ({ districts, streets }) =>
  dispatch(
   setFilterValue({
    selectedDistricts: districts,
    selectedStreets: streets,
    selectedLocations: [],
    selectedTransportCategories: [],
    selectedCulprits: [],
    selectedViolations: [],
    selectedConditions: [],
   })
  ),
});
export default connect(mapStateToProps, mapDistrictToProps)(CheckboxDistricts);
