import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, } from "recharts";
import { ChartWrapper } from "./ChartWrapper";
export const HistogramCard = ({ data }) => {
    var _a, _b;
    const color = (_b = (_a = data.colors) === null || _a === void 0 ? void 0 : _a.primary) !== null && _b !== void 0 ? _b : "var(--rdg-primary)";
    const rechartData = data.data.map((d) => ({ name: d.label, count: d.value }));
    return (React.createElement(ChartWrapper, { title: data.title, subtitle: data.subtitle },
        React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
            React.createElement(BarChart, { data: rechartData, barCategoryGap: 2 },
                data.showGrid !== false && (React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--rdg-border)" })),
                React.createElement(XAxis, { dataKey: "name", tick: { fontSize: 11, fill: "var(--rdg-muted)" } }),
                React.createElement(YAxis, { tick: { fontSize: 11, fill: "var(--rdg-muted)" } }),
                React.createElement(Tooltip, { contentStyle: {
                        background: "var(--rdg-card-bg)",
                        border: "1px solid var(--rdg-border)",
                        borderRadius: 8,
                        fontSize: 12,
                    } }),
                React.createElement(Bar, { dataKey: "count", radius: 0 }, rechartData.map((_, i) => (React.createElement(Cell, { key: i, fill: color, fillOpacity: 0.7 + (i / rechartData.length) * 0.3 }))))))));
};
