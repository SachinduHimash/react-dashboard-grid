import React from "react";
export const StatCard = ({ data }) => (React.createElement("div", { style: {
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    } },
    React.createElement("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
        } },
        React.createElement("span", { style: {
                fontSize: 13,
                color: "var(--rdg-text)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
            } }, data.title),
        data.icon && React.createElement("span", { style: { fontSize: 20 } }, data.icon)),
    React.createElement("div", null,
        React.createElement("div", { style: {
                fontSize: 32,
                fontWeight: 700,
                color: "var(--rdg-text)",
                lineHeight: 1.1,
            } }, data.value),
        data.change && (React.createElement("div", { style: {
                marginTop: 6,
                fontSize: 13,
                fontWeight: 500,
                color: data.changeType === "up"
                    ? "#22c55e"
                    : data.changeType === "down"
                        ? "#ef4444"
                        : "var(--rdg-muted)",
            } },
            data.changeType === "up"
                ? "↑"
                : data.changeType === "down"
                    ? "↓"
                    : "",
            " ",
            data.change)))));
