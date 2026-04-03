import React from "react";
import { LineChartCard } from "./charts/LineChartCard";
import { BarChartCard } from "./charts/BarChartCard";
import { AreaChartCard } from "./charts/AreaChartCard";
import { PieChartCard } from "./charts/PieChartCard";
import { HistogramCard } from "./charts/HistogramCard";
export const ChartCard = ({ data }) => {
    switch (data.chartType) {
        case "line":
            return React.createElement(LineChartCard, { data: data });
        case "bar":
            return React.createElement(BarChartCard, { data: data });
        case "area":
            return React.createElement(AreaChartCard, { data: data });
        case "pie":
        case "donut":
            return React.createElement(PieChartCard, { data: data });
        case "histogram":
            return React.createElement(HistogramCard, { data: data });
        default:
            return null;
    }
};
