import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, } from "recharts";
import { ChartWrapper } from "./ChartWrapper";
const DEFAULT_COLORS = [
    "var(--rdg-primary)",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
];
export const PieChartCard = ({ data }) => {
    const showLegend = data.showLegend !== false;
    // Side legend items
    const legendItems = data.data.map((entry, i) => {
        var _a;
        return (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 5 } },
            React.createElement("div", { style: {
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: (_a = entry.color) !== null && _a !== void 0 ? _a : DEFAULT_COLORS[i % DEFAULT_COLORS.length],
                    flexShrink: 0,
                } }),
            React.createElement("span", { style: {
                    fontSize: 10,
                    color: "var(--rdg-muted)",
                    whiteSpace: "nowrap",
                } }, entry.label)));
    });
    return (React.createElement(ChartWrapper, { title: data.title, subtitle: data.subtitle, legendSide: showLegend, legend: showLegend ? React.createElement(React.Fragment, null, legendItems) : undefined },
        React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
            React.createElement(PieChart, null,
                React.createElement(Pie, { data: data.data, dataKey: "value", nameKey: "label", cx: "50%", cy: "50%", innerRadius: data.chartType === "donut" ? "50%" : 0, outerRadius: "80%", paddingAngle: 2 }, data.data.map((entry, i) => {
                    var _a;
                    return (React.createElement(Cell, { key: i, fill: (_a = entry.color) !== null && _a !== void 0 ? _a : DEFAULT_COLORS[i % DEFAULT_COLORS.length] }));
                })),
                React.createElement(Tooltip, { contentStyle: {
                        background: "var(--rdg-card-bg)",
                        border: "1px solid var(--rdg-border)",
                        borderRadius: 8,
                        fontSize: 11,
                    } })))));
};
