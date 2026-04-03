import React from "react";
export const SplitStatCard = ({ data }) => {
    const bg = "var(--rdg-card-bg)";
    const text = "var(--rdg-text)";
    const muted = "var(--rdg-muted)";
    const border = "var(--rdg-border)";
    const defaultColors = ["#6366f1", "#22c55e", "#f59e0b", "#e11d48"];
    return (React.createElement("div", { style: {
            padding: "20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            background: bg,
            borderRadius: "var(--rdg-radius)",
        } },
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
            } },
            React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: text } }, data.title),
            data.titleAction && (React.createElement("div", { style: {
                    fontSize: 12,
                    color: muted,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    cursor: "pointer",
                } },
                data.titleAction,
                " ",
                React.createElement("span", { style: { fontSize: 10 } }, "\u203A")))),
        React.createElement("div", { style: {
                fontSize: 30,
                fontWeight: 800,
                color: text,
                lineHeight: 1,
                marginBottom: 16,
            } },
            data.value,
            data.unit && (React.createElement("span", { style: {
                    fontSize: 18,
                    fontWeight: 600,
                    marginLeft: 2,
                    color: muted,
                } }, data.unit))),
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
            } }, data.segments.map((seg, i) => {
            var _a;
            return (React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 4 } },
                React.createElement("div", { style: {
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: (_a = seg.color) !== null && _a !== void 0 ? _a : defaultColors[i % defaultColors.length],
                    } }),
                React.createElement("span", { style: { fontSize: 11, color: muted } },
                    seg.label,
                    " ",
                    seg.percentage,
                    "%")));
        })),
        React.createElement("div", { style: {
                display: "flex",
                height: 10,
                borderRadius: 6,
                overflow: "hidden",
                gap: 2,
                marginBottom: 8,
            } }, data.segments.map((seg, i) => {
            var _a;
            return (React.createElement("div", { key: i, style: {
                    flex: seg.percentage,
                    background: (_a = seg.color) !== null && _a !== void 0 ? _a : defaultColors[i % defaultColors.length],
                    borderRadius: i === 0
                        ? "6px 0 0 6px"
                        : i === data.segments.length - 1
                            ? "0 6px 6px 0"
                            : 0,
                } }));
        })),
        (data.minValue !== undefined || data.maxValue !== undefined) && (React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                marginTop: 4,
            } },
            React.createElement("span", { style: { fontSize: 11, color: muted } }, data.minValue),
            React.createElement("span", { style: { fontSize: 11, color: muted } }, data.maxValue)))));
};
