import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Menu, Dropdown } from "antd";
import { FETCH_FILTER_ACCIDENTS_EPIC } from "../redux/types";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { setSelectedDate, setSelectedArticles } from "../redux/actions";

function SelectedFilters({
  className,
  selectedDate,
  selectedDistricts,
  selectedStreets,
  selectedLocations,
  selectedViolations,
  selectedTransportCategories,
  selectedCulprits,
  selectedDriverCondition,
  selectedDayTime,
  fetchFilterCrimesData,
  setSelectedDate,
  handleSetSelectedArticles,
}) {
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState();

  const handle = () => {
    const data = {
      start: filters.startDate.format("YYYY-MM-DD"),
      end: filters.endDate.format("YYYY-MM-DD"),
      streets: filters.streets ?? [],
      grades: filters.severities ?? [],
      agencies: filters.agencies ?? [],
      articles: filters.articles ?? [],
    };
    fetchFilterCrimesData(data);
  };

  const handleFilterRemove = (index, type) => {
    switch (type) {
      case "Date":
        setFilters({ ...filters, ...{ startDate: null, endDate: null } });
        break;
      case "DayTime":
        filters.daytimes.splice(index, 1);
        setFilters({ ...filters, ...{ daytimes: filters.daytimes } });
        break;
      case "Location":
        filters.locations.splice(index, 1);
        setFilters({ ...filters, ...{ locations: filters.locations } });
        break;
      case "District":
        filters.districts.splice(index, 1);
        setFilters({ ...filters, ...{ districts: filters.districts } });
        break;
      case "Street":
        filters.streets.splice(index, 1);
        setFilters({ ...filters, ...{ streets: filters.streets } });
        break;
      case "Violation":
        filters.violations.splice(index, 1);
        setFilters({ ...filters, ...{ violations: filters.violations } });
        break;
      case "TransportCategory":
        filters.transportCatogory.splice(index, 1);
        setFilters({
          ...filters,
          ...{ transportCatogory: filters.transportCatogory },
        });
        break;
      case "Culprit":
        filters.culprits.splice(index, 1);
        setFilters({ ...filters, ...{ culprits: filters.culprits } });
        break;
      case "Condition":
        filters.conditions.splice(index, 1);
        setFilters({ ...filters, ...{ conditions: filters.conditions } });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setFilters({
      ...filters,
      ...{
        startDate: selectedDate?.startDate ?? null,
        endDate: selectedDate?.endDate ?? null,
        daytimes: selectedDayTime?.types ?? [],
        districts: selectedDistricts ?? [],
        streets: selectedStreets ?? [],
        locations: selectedLocations?.locations ?? [],
        violations: selectedViolations?.violations ?? [],
        culprits: selectedCulprits ?? [],
        transportCatogory: selectedTransportCategories ?? [],
        conditions: selectedDriverCondition ?? [],
      },
    });
  }, [
    selectedDate,
    selectedDistricts,
    selectedStreets,
    selectedLocations,
    selectedViolations,
    selectedTransportCategories,
    selectedCulprits,
    selectedDriverCondition,
    selectedDayTime,
  ]);

  const menu = (
    <Menu className="ant_drop_block" style={{ width: "100%" }}>
      <Menu.Item key="0" style={{ height: "450px" }}>
        <div
          style={{
            display: "flex",
            height: "100%",
          }}
        >
          <div
            className="selectedFilter_content"
            style={{
              width: "calc(100% / 7)",
              display: `${selectedDate || selectedDayTime ? "block" : "none"}`,
            }}
          >
            <div className="selectedFilter_content_title">
              Временной период{" "}
            </div>
            {selectedDate &&
              `${filters.startDate?.format(
                "DD.MM.YY"
              )} - ${filters.endDate?.format("DD.MM.YY")}`}
            {selectedDayTime &&
              filters.daytimes.map((el, index) => (
                <div className="selectedFilter_content_item" key={index}>
                  <div className="selectedFilter_content_item_content">
                    {el}
                  </div>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={() => handleFilterRemove(index, "DayTime")}
                  ></Button>
                </div>
              ))}
          </div>
          <div
            className="selectedFilter_content"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "calc(100% / 7)",
              display: `${selectedDistricts ? "block" : "none"}`,
            }}
          >
            <div className="selectedFilter_content_title">Районы</div>

            {filters?.districts?.map((el, index) => (
              <div className="selectedFilter_content_item" key={index}>
                <div className="selectedFilter_content_item_content">{el}</div>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleFilterRemove(index, "District")}
                ></Button>
              </div>
            ))}
          </div>
          <div
            className="selectedFilter_content"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "calc(100% / 7)",

              display: `${selectedStreets?.length > 0 ? "block" : "none"}`,
            }}
          >
            <div className="selectedFilter_content_title">Улицы</div>

            {filters?.streets?.map((el, index) => (
              <div className="selectedFilter_content_item" key={index}>
                <div className="selectedFilter_content_item_content">{el}</div>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleFilterRemove(index, "Street")}
                ></Button>
              </div>
            ))}
          </div>
          <div
            className="selectedFilter_content"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "calc(100% / 7)",
              display: `${selectedLocations ? "block" : "none"}`,
            }}
          >
            <div className="selectedFilter_content_title">Место</div>

            {filters?.locations?.map((el, index) => (
              <div className="selectedFilter_content_item" key={index}>
                <div className="selectedFilter_content_item_content">{el}</div>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleFilterRemove(index, "Location")}
                ></Button>
              </div>
            ))}
          </div>
          <div
            className="selectedFilter_content"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "calc(100% / 7)",

              display: `${filters?.violations.length > 0 ? "block" : "none"}`,
            }}
          >
            <div className="selectedFilter_content_title">Правонарушения </div>

            {filters?.violations?.map((el, index) => (
              <div className="selectedFilter_content_item" key={index}>
                <div className="selectedFilter_content_item_content">{el}</div>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleFilterRemove(index, "Violation")}
                ></Button>
              </div>
            ))}
          </div>
          <div
            className="selectedFilter_content"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "calc(100% / 7)",
              display: `${selectedCulprits ? "block" : "none"}`,
            }}
          >
            <div className="selectedFilter_content_title">Виновник </div>

            {filters?.culprits?.map((el, index) => (
              <div className="selectedFilter_content_item" key={index}>
                <div className="selectedFilter_content_item_content">{el}</div>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleFilterRemove(index, "Culprit")}
                ></Button>
              </div>
            ))}
          </div>

          <div
            className="selectedFilter_content"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "calc(100% / 7)",
              display: `${selectedDriverCondition ? "block" : "none"}`,
            }}
          >
            <div className="selectedFilter_content_title">
              Состояние водителя{" "}
            </div>

            {filters?.conditions?.map((el, index) => (
              <div className="selectedFilter_content_item" key={index}>
                <div className="selectedFilter_content_item_content">{el}</div>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleFilterRemove(index, "Condition")}
                ></Button>
              </div>
            ))}
          </div>
          <div
            className="selectedFilter_content"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "calc(100% / 7)",
              display: `${selectedTransportCategories ? "block" : "none"}`,
            }}
          >
            <div className="selectedFilter_content_title">
              Категории транспорта{" "}
            </div>

            {filters?.transportCatogory?.map((el, index) => (
              <div className="selectedFilter_content_item" key={index}>
                <div className="selectedFilter_content_item_content">{el}</div>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleFilterRemove(index, "TransportCategory")}
                ></Button>
              </div>
            ))}
          </div>
          <div
            className="selectedFilter_content"
            style={{
              overflowY: "scroll",
              height: "100%",
              width: "calc(100% / 7)",
            }}
          >
            <Button onClick={handle}>Применить~</Button>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className={className}
      style={{
        display: `${
          selectedDate ||
          selectedDistricts ||
          selectedStreets ||
          selectedLocations ||
          selectedViolations ||
          selectedTransportCategories ||
          selectedCulprits ||
          selectedDriverCondition ||
          selectedDayTime
            ? "block"
            : "none"
        }`,
        height: `${
          selectedDate ||
          selectedDistricts ||
          selectedStreets ||
          selectedLocations ||
          selectedViolations ||
          selectedTransportCategories ||
          selectedCulprits ||
          selectedDriverCondition ||
          selectedDayTime
            ? "55px"
            : "0px"
        } `,
        width: "100%",
      }}
    >
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        visible={visible}
        onVisibleChange={(val) => setVisible(val)}
        className="ant_drop_menu"
      >
        <Button className="ant_drop_btn">
          {"Использованные фильтры"} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    selectedDate: state.accidentsReducer.selectedDate,
    selectedDistricts: state.accidentsReducer.selectedDistricts,
    selectedStreets: state.accidentsReducer.selectedStreets,
    selectedLocations: state.accidentsReducer.selectedLocations,
    selectedViolations: state.accidentsReducer.selectedViolations,
    selectedTransportCategories:
      state.accidentsReducer.selectedTransportCategories,
    selectedCulprits: state.accidentsReducer.selectedCulprits,
    selectedDriverCondition: state.accidentsReducer.selectedDriverCondition,
    selectedDayTime: state.accidentsReducer.selectedDayTime,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchFilterCrimesData: (payload) =>
    dispatch({ type: FETCH_FILTER_ACCIDENTS_EPIC, payload: payload }),
  setSelectedDate: ({ startDate: startDate, endDate: endDate }) =>
    dispatch(setSelectedDate({ startDate: startDate, endDate: endDate })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectedFilters);
