import React, { useEffect, useState } from "react";
import {
  Line,
  Bar,
  Doughnut,
  Pie,
  Chart,
  HorizontalBar,
} from "react-chartjs-2";
import datalabels from 'chartjs-plugin-datalabels';
export const RoadAccidentChart = ({
  option,
  dataSet,
  typeChart,
  isActiveMap,
  isActiveChart,onElementsClick
}) => {
  switch (typeChart) {
    case "Line":
      return (
        <Line
          data={dataSet}
          options={option}
          redraw={isActiveMap || isActiveChart}
        />
      );
    case "Bar":
      return (
        <Bar
          data={dataSet}
          options={option}
          redraw={isActiveMap || isActiveChart}
        />
      );
    case "Doughnut":
      return (
        <Doughnut
          data={dataSet}
          options={option}
          redraw={isActiveMap || isActiveChart}
        />
      );
    case "Pie":
      return (
        <Pie
          data={dataSet}
          options={option}
          redraw={isActiveMap || isActiveChart}
        />
      );
    case "Chart":
      return (
        <Chart
          data={dataSet}
          options={option}
          redraw={isActiveMap || isActiveChart}
        />
      );
    case "HorizontalBar":
      return (
        <HorizontalBar
          data={dataSet}
          options={option}
          redraw={isActiveMap || isActiveChart}
          onElementsClick={onElementsClick}
        />
      );
    // eslint-disable-next-line no-unused-expressions
    default:
      return <></>;
  }
};
