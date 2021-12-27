import React from "react";
import $ from "jquery";
import "air-datepicker/dist/js/datepicker.js";
import "air-datepicker/dist/css/datepicker.css";
import "./DatePicker.css";
import { connect } from "react-redux";
import { setSelectedDate, setFilterValue } from "../../redux/actions";
import { FETCH_FILTER_ACCIDENTS_EPIC } from "../../redux/types";

let moment = require("moment");
class AirDatepicker extends React.Component {
  state = {
    classname: "",
    date: "x",
  };
  constructor(props) {
    super(props);
    this.valueDate = null;
  }

  componentDidMount() {
    this.$el = $(this.el);
    this.$el.datepicker();
    this.configure();
  }

  handleActive = () => {
    this.setState({ classname: " active" });
  };
  handleOff = () => {
    this.props.setSelectedDates({
      startDate: moment(this.state.date.split(" - ")[0], "DD.MM.YYYY"),
      endDate: this.state.date.split(" - ")[1]
        ? moment(this.state.date.split(" - ")[1], "DD.MM.YYYY")
        : null,
      // : moment(this.state.date.split(" - ")[0], "DD.MM.YYYY").add(1, "days"),
    });
    // console.log(this.state.date.split(" - "));
    this.props.changeSelectedDate(0);
  };

  handleSetData = (event) => {
    // console.log(event);
    // this.setState({ date: this.valueDate.value });
  };

  configure = () => {
    var parent = this;
    $("#example-show").datepicker({
      onShow: function (dp, animationCompleted) {
        if (!animationCompleted) {
          // console.log("start showing");
        } else {
          // console.log("finished showing");
        }
      },
      onHide: function (dp, animationCompleted) {
        if (!animationCompleted) {
          // console.log("start hiding");
        } else {
          // console.log("finished hiding");
        }
      },
      onSelect: function (frmtDate, date, inst) {
        parent.setState({ date: frmtDate });
        // parent.props.onDateSelected({
        //   startDate: moment(frmtDate.split(" - ")[0], "DD.MM.YYYY"),
        //   endDate:
        //     moment(frmtDate.split(" - ")[1], "DD.MM.YYYY") ??
        //     moment(frmtDate.split(" - ")[0], "DD.MM.YYYY"),
        // });
        // parent.props.filterCrimesData({
        //   byDate: true,
        // });
      },
    });
  };
  render() {
    let ttr = "tessst";
    if (this.state.classname === "") {
      ttr = "tessst active";
    } else {
      ttr = "tessst";
    }

    return (
      <div style={{ display: "flex" }}>
        <input
          id="example-show"
          type="text"
          data-range="true"
          data-multiple-dates-separator=" - "
          className="datepicker-here"
          placeholder="выбрать диапазон"
          autoComplete="off"
          ref={(ref) => this.configure(ref)}
          readOnly="readonly"
        />
        <button
          className="calendar_ok covid_city_btn"
          onClick={(e) => {
            this.handleOff();
          }}
        >
          ок
        </button>
      </div>
    );
  }
}

const mapDistrictToProps = (dispatch) => ({
  setSelectedDate: ({ start, end }) =>
    dispatch(setFilterValue({ start: start, end: end })),
  fetchFilteredCrimesData: (payload) =>
    dispatch({ type: FETCH_FILTER_ACCIDENTS_EPIC, payload: payload }),
});
export default connect(null, mapDistrictToProps)(AirDatepicker);
