import React from "react";
export const KpiCard = ({ data }) => {
    var _a;
    const color = (_a = data.color) !== null && _a !== void 0 ? _a : "var(--rdg-primary)";
    const changeColor = data.changeType === "up"
        ? "#22c55e"
        : data.changeType === "down"
            ? "#ef4444"
            : "var(--rdg-muted)";
    const changeIcon = data.changeType === "up" ? "↑" : data.changeType === "down" ? "↓" : "";
    return (React.createElement("div", { style: {
            padding: "20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        } },
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
            } },
            React.createElement("span", { style: {
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--rdg-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                } }, data.title),
            data.icon && React.createElement("span", { style: { fontSize: 20 } }, data.icon)),
        React.createElement("div", null,
            React.createElement("div", { style: {
                    fontSize: 36,
                    fontWeight: 800,
                    color: "var(--rdg-text)",
                    lineHeight: 1,
                } }, data.value),
            data.change && (React.createElement("div", { style: {
                    marginTop: 4,
                    fontSize: 13,
                    fontWeight: 600,
                    color: changeColor,
                } },
                changeIcon,
                " ",
                data.change))),
        data.progress !== undefined && (React.createElement("div", null,
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "var(--rdg-muted)",
                    marginBottom: 4,
                } },
                React.createElement("span", null, "Progress"),
                data.target && React.createElement("span", null,
                    "Target: ",
                    data.target)),
            React.createElement("div", { style: {
                    height: 6,
                    background: "var(--rdg-border)",
                    borderRadius: 99,
                    overflow: "hidden",
                } },
                React.createElement("div", { style: {
                        height: "100%",
                        width: `${Math.min(data.progress, 100)}%`,
                        background: color,
                        borderRadius: 99,
                        transition: "width 0.5s ease",
                    } })))),
        data.subtitle && (React.createElement("div", { style: { fontSize: 12, color: "var(--rdg-muted)" } }, data.subtitle))));
};
