import React from "react";
import { Table, Empty } from "antd";
import { connect } from "react-redux";

var moment = require("moment");
/**
 * Таблица
 *  при нажатии на строку применятьеся функция handleRowClick() которая принимает id строки
 *  после выбранная работа показываеться на карте
 */
const RoadAccidentTable = ({
 handleRowClick,
 RoadAccidentTableData,
 isLoading,
}) => {
 const columns = [
  {
   title: "Дата",
   dataIndex: "date",
   sorter: (el1, el2) => {
    const firstDate = moment(el1["commission-date-pretty"], "DD.MM.YYYY HH:mm");
    const secondDate = moment(
     el2["commission-date-pretty"],
     "DD.MM.YYYY HH:mm"
    );
    if (firstDate === secondDate) return 0;
    else if (firstDate < secondDate) return -1;
    else return 1;
   },
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Район",
   dataIndex: "district",
   sorter: (a, b) => {
    if (a.district < b.district) {
     return -1;
    }
    if (a.district > b.district) {
     return 1;
    }
    return 0;
   },
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Место",
   dataIndex: "spot",
   sorter: (a, b) => {
    if (a.spot < b.spot) {
     return -1;
    }
    if (a.spot > b.spot) {
     return 1;
    }
    return 0;
   },
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Время суток",
   dataIndex: "timeDay",
   sorter: (a, b) => {
    if (a.timeDay < b.timeDay) {
     return -1;
    }
    if (a.timeDay > b.timeDay) {
     return 1;
    }
    return 0;
   },
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Нарушение",
   dataIndex: "crime",
   sorter: (a, b) => {
    if (a.crime < b.crime) {
     return -1;
    }
    if (a.crime > b.crime) {
     return 1;
    }
    return 0;
   },
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Состояние водителя ",
   dataIndex: "driver",
   sorter: (a, b) => {
    if (a.driver < b.driver) {
     return -1;
    }
    if (a.driver > b.driver) {
     return 1;
    }
    return 0;
   },
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Виновник",
   dataIndex: "culprit",
   sorter: (a, b) => {
    if (a.culprit < b.culprit) {
     return -1;
    }
    if (a.culprit > b.culprit) {
     return 1;
    }
    return 0;
   },
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Кат. прав",
   dataIndex: "category",
   sorter: (a, b) => {
    if (a.category < b.category) {
     return -1;
    }
    if (a.category > b.category) {
     return 1;
    }
    return 0;
   },
   sortDirections: ["descend", "ascend"],
  },
  {
   title: "Тип ТС",
   dataIndex: "transportType",
   sorter: (a, b) => {
    if (a.transportType < b.transportType) {
     return -1;
    }
    if (a.transportType > b.transportType) {
     return 1;
    }
    return 0;
   },
   sortDirections: ["descend", "ascend"],
  },
 ];

 return (
  <Table
   locale={{
    emptyText: (
     <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет Данных" />
    ),
   }}
   onRow={(record, rowIndex) => {
    return {
     onClick: (event) => {
      handleRowClick(record.key);
     }, // click row
     onDoubleClick: (event) => {}, // double click row
     onContextMenu: (event) => {}, // right button click row
     onMouseEnter: (event) => {}, // mouse enter row
     onMouseLeave: (event) => {}, // mouse leave row
    };
   }}
   pagination={{ defaultPageSize: 10, showSizeChanger: false }}
   columns={columns}
   loading={isLoading}
   dataSource={RoadAccidentTableData}
  />
 );
};

const mapStateToProps = (state) => {
 return {
  isLoading: state.accidentsReducer.isLoading,
 };
};

export default connect(mapStateToProps)(RoadAccidentTable);
