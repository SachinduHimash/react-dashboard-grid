import React from "react";
export const ListCard = ({ data }) => (React.createElement("div", { style: {
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    } },
    React.createElement("div", { style: {
            fontSize: 15,
            fontWeight: 600,
            color: "var(--rdg-text)",
            textTransform: "uppercase",
            marginBottom: 12,
        } }, data.title),
    React.createElement("div", { style: { flex: 1, overflowY: "auto" } }, data.items.map((item) => {
        var _a;
        return (React.createElement("div", { key: item.id, style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid var(--rdg-border)",
            } },
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                item.icon && React.createElement("span", null, item.icon),
                React.createElement("span", { style: { fontSize: 14, color: "var(--rdg-text)" } }, item.label)),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                item.value && (React.createElement("span", { style: { fontSize: 14, color: "var(--rdg-muted)" } }, item.value)),
                item.badge && (React.createElement("span", { style: {
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 99,
                        background: (_a = item.badgeColor) !== null && _a !== void 0 ? _a : "var(--rdg-primary)",
                        color: "#fff",
                    } }, item.badge)))));
    }))));
