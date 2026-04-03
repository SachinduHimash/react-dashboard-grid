import React, { useState } from "react";
export const DashboardHeader = ({ title, subtitle, showAddWidget, showEditLayout, showSearch, isEditing, headerActions, onAddWidget, onToggleEdit, onSearch, primaryColor, searchLabel, editLabel, editingLabel, addLabel, }) => {
    const [query, setQuery] = useState("");
    const btnBase = {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 14px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        border: "1px solid var(--rdg-border)",
        background: "var(--rdg-card-bg)",
        color: "var(--rdg-text)",
        transition: "all 0.15s",
    };
    return (React.createElement("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            background: "var(--rdg-bg)",
            flexWrap: "wrap",
            gap: 12,
        } },
        React.createElement("div", null,
            title && (React.createElement("h1", { style: {
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--rdg-text)",
                } }, title)),
            subtitle && (React.createElement("p", { style: {
                    margin: "2px 0 0",
                    fontSize: 13,
                    color: "var(--rdg-muted)",
                } }, subtitle))),
        React.createElement("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
            } },
            showSearch && (React.createElement("input", { value: query, onChange: (e) => {
                    setQuery(e.target.value);
                    onSearch === null || onSearch === void 0 ? void 0 : onSearch(e.target.value);
                }, placeholder: searchLabel !== null && searchLabel !== void 0 ? searchLabel : "Search widgets...", style: {
                    padding: "7px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    border: "1px solid var(--rdg-border)",
                    outline: "none",
                    background: "var(--rdg-bg)",
                    color: "var(--rdg-text)",
                    width: 200,
                } })), headerActions === null || headerActions === void 0 ? void 0 :
            headerActions.map((action, i) => (React.createElement("button", { key: i, onClick: action.onClick, style: btnBase },
                action.icon,
                " ",
                action.label))),
            showEditLayout && (React.createElement("button", { onClick: onToggleEdit, style: Object.assign(Object.assign({}, btnBase), { background: isEditing ? primaryColor : "var(--rdg-card-bg)", color: isEditing ? "#fff" : "var(--rdg-text)", borderColor: isEditing ? primaryColor : "var(--rdg-border)" }) }, isEditing
                ? (editingLabel !== null && editingLabel !== void 0 ? editingLabel : "Done")
                : (editLabel !== null && editLabel !== void 0 ? editLabel : "Edit Layout"))),
            showAddWidget && (React.createElement("button", { onClick: onAddWidget, style: Object.assign(Object.assign({}, btnBase), { background: primaryColor, color: "#fff", border: "none" }) }, addLabel !== null && addLabel !== void 0 ? addLabel : "+ Add Widget")))));
};
