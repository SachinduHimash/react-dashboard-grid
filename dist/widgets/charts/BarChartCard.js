import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { ChartWrapper } from "./ChartWrapper";
export const BarChartCard = ({ data }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const p = (_b = (_a = data.colors) === null || _a === void 0 ? void 0 : _a.primary) !== null && _b !== void 0 ? _b : "var(--rdg-primary)";
    const s = (_d = (_c = data.colors) === null || _c === void 0 ? void 0 : _c.secondary) !== null && _d !== void 0 ? _d : "#22c55e";
    const t = (_f = (_e = data.colors) === null || _e === void 0 ? void 0 : _e.tertiary) !== null && _f !== void 0 ? _f : "#f59e0b";
    const sl = data.seriesLabels;
    const rechartData = data.data.map((d) => {
        var _a, _b, _c;
        return (Object.assign(Object.assign({ name: d.label, [(_a = sl === null || sl === void 0 ? void 0 : sl.value) !== null && _a !== void 0 ? _a : "Value"]: d.value }, (d.value2 !== undefined && { [(_b = sl === null || sl === void 0 ? void 0 : sl.value2) !== null && _b !== void 0 ? _b : "Value 2"]: d.value2 })), (d.value3 !== undefined && { [(_c = sl === null || sl === void 0 ? void 0 : sl.value3) !== null && _c !== void 0 ? _c : "Value 3"]: d.value3 })));
    });
    return (React.createElement(ChartWrapper, { title: data.title, subtitle: data.subtitle },
        React.createElement(ResponsiveContainer, { width: "100%", height: "100%" },
            React.createElement(BarChart, { data: rechartData },
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
                React.createElement(Bar, { dataKey: (_g = sl === null || sl === void 0 ? void 0 : sl.value) !== null && _g !== void 0 ? _g : "Value", fill: p, radius: [4, 4, 0, 0], stackId: data.stacked ? "stack" : undefined }),
                ((_h = rechartData[0]) === null || _h === void 0 ? void 0 : _h[(_j = sl === null || sl === void 0 ? void 0 : sl.value2) !== null && _j !== void 0 ? _j : "Value 2"]) !== undefined && (React.createElement(Bar, { dataKey: (_k = sl === null || sl === void 0 ? void 0 : sl.value2) !== null && _k !== void 0 ? _k : "Value 2", fill: s, radius: [4, 4, 0, 0], stackId: data.stacked ? "stack" : undefined })),
                ((_l = rechartData[0]) === null || _l === void 0 ? void 0 : _l[(_m = sl === null || sl === void 0 ? void 0 : sl.value3) !== null && _m !== void 0 ? _m : "Value 3"]) !== undefined && (React.createElement(Bar, { dataKey: (_o = sl === null || sl === void 0 ? void 0 : sl.value3) !== null && _o !== void 0 ? _o : "Value 3", fill: t, radius: [4, 4, 0, 0], stackId: data.stacked ? "stack" : undefined }))))));
};
