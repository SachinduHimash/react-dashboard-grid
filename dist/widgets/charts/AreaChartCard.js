import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { ChartWrapper } from "./ChartWrapper";
export const AreaChartCard = ({ data }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const p = (_b = (_a = data.colors) === null || _a === void 0 ? void 0 : _a.primary) !== null && _b !== void 0 ? _b : "var(--rdg-primary)";
    const s = (_d = (_c = data.colors) === null || _c === void 0 ? void 0 : _c.secondary) !== null && _d !== void 0 ? _d : "#22c55e";
    const sl = data.seriesLabels;
    const rechartData = data.data.map((d) => {
        var _a, _b;
        return (Object.assign({ name: d.label, [(_a = sl === null || sl === void 0 ? void 0 : sl.value) !== null && _a !== void 0 ? _a : "Value"]: d.value }, (d.value2 !== undefined && { [(_b = sl === null || sl === void 0 ? void 0 : sl.value2) !== null && _b !== void 0 ? _b : "Value 2"]: d.value2 })));
    });
    return (React.createElement(ChartWrapper, { title: data.title, subtitle: data.subtitle },
        React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
            React.createElement(AreaChart, { data: rechartData },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "grad1", x1: "0", y1: "0", x2: "0", y2: "1" },
                        React.createElement("stop", { offset: "5%", stopColor: p, stopOpacity: 0.3 }),
                        React.createElement("stop", { offset: "95%", stopColor: p, stopOpacity: 0 })),
                    React.createElement("linearGradient", { id: "grad2", x1: "0", y1: "0", x2: "0", y2: "1" },
                        React.createElement("stop", { offset: "5%", stopColor: s, stopOpacity: 0.3 }),
                        React.createElement("stop", { offset: "95%", stopColor: s, stopOpacity: 0 }))),
                data.showGrid !== false && (React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--rdg-border)" })),
                React.createElement(XAxis, { dataKey: "name", tick: { fontSize: 11, fill: "var(--rdg-muted)" } }),
                React.createElement(YAxis, { tick: { fontSize: 11, fill: "var(--rdg-muted)" } }),
                React.createElement(Tooltip, { contentStyle: {
                        background: "var(--rdg-card-bg)",
                        border: "1px solid var(--rdg-border)",
                        borderRadius: 8,
                        fontSize: 12,
                    } }),
                data.showLegend && React.createElement(Legend, null),
                React.createElement(Area, { type: "monotone", dataKey: (_e = sl === null || sl === void 0 ? void 0 : sl.value) !== null && _e !== void 0 ? _e : "Value", stroke: p, fill: "url(#grad1)", strokeWidth: 2, stackId: data.stacked ? "stack" : undefined }),
                ((_f = rechartData[0]) === null || _f === void 0 ? void 0 : _f[(_g = sl === null || sl === void 0 ? void 0 : sl.value2) !== null && _g !== void 0 ? _g : "Value 2"]) !== undefined && (React.createElement(Area, { type: "monotone", dataKey: (_h = sl === null || sl === void 0 ? void 0 : sl.value2) !== null && _h !== void 0 ? _h : "Value 2", stroke: s, fill: "url(#grad2)", strokeWidth: 2, stackId: data.stacked ? "stack" : undefined }))))));
};
