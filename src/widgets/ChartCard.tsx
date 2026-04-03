import React from "react";
import { ChartData } from "../types";
import { LineChartCard } from "./charts/LineChartCard";
import { BarChartCard } from "./charts/BarChartCard";
import { AreaChartCard } from "./charts/AreaChartCard";
import { PieChartCard } from "./charts/PieChartCard";
import { HistogramCard } from "./charts/HistogramCard";

export const ChartCard: React.FC<{ data: ChartData }> = ({ data }) => {
  switch (data.chartType) {
    case "line":
      return <LineChartCard data={data} />;
    case "bar":
      return <BarChartCard data={data} />;
    case "area":
      return <AreaChartCard data={data} />;
    case "pie":
    case "donut":
      return <PieChartCard data={data} />;
    case "histogram":
      return <HistogramCard data={data} />;
    default:
      return null;
  }
};
