import React, { useState } from "react";
export const TableCard = ({ data }) => {
    var _a;
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    const [page, setPage] = useState(0);
    const perPage = (_a = data.rowsPerPage) !== null && _a !== void 0 ? _a : 5;
    const handleSort = (key) => {
        if (!data.sortable)
            return;
        if (sortKey === key)
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else {
            setSortKey(key);
            setSortDir("asc");
        }
    };
    const sorted = [...data.rows].sort((a, b) => {
        if (!sortKey)
            return 0;
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av == null)
            return 1;
        if (bv == null)
            return -1;
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
    });
    const totalPages = Math.ceil(sorted.length / perPage);
    const visible = sorted.slice(page * perPage, (page + 1) * perPage);
    return (React.createElement("div", { style: {
            padding: "16px 20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
        } },
        React.createElement("div", { style: { marginBottom: 12, flexShrink: 0 } },
            React.createElement("div", { style: {
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--rdg-text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                } }, data.title),
            data.subtitle && (React.createElement("div", { style: { fontSize: 12, color: "var(--rdg-muted)", marginTop: 2 } }, data.subtitle))),
        React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: "auto" } },
            React.createElement("table", { style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                } },
                React.createElement("thead", null,
                    React.createElement("tr", null, data.columns.map((col) => {
                        var _a;
                        return (React.createElement("th", { key: col.key, onClick: () => handleSort(col.key), style: {
                                padding: "6px 8px",
                                textAlign: (_a = col.align) !== null && _a !== void 0 ? _a : "left",
                                color: "var(--rdg-muted)",
                                fontWeight: 600,
                                fontSize: 11,
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                borderBottom: "2px solid var(--rdg-border)",
                                cursor: data.sortable ? "pointer" : "default",
                                userSelect: "none",
                                whiteSpace: "nowrap",
                                width: col.width,
                            } },
                            col.label,
                            data.sortable && sortKey === col.key && (React.createElement("span", { style: { marginLeft: 4 } }, sortDir === "asc" ? "↑" : "↓"))));
                    }))),
                React.createElement("tbody", null, visible.map((row, i) => (React.createElement("tr", { key: i, style: {
                        background: data.striped && i % 2 === 1
                            ? "rgba(0,0,0,0.025)"
                            : "transparent",
                    } }, data.columns.map((col) => {
                    var _a, _b;
                    return (React.createElement("td", { key: col.key, style: {
                            padding: "8px 8px",
                            color: "var(--rdg-text)",
                            borderBottom: "1px solid var(--rdg-border)",
                            textAlign: (_a = col.align) !== null && _a !== void 0 ? _a : "left",
                        } }, col.render
                        ? col.render(row[col.key], row)
                        : ((_b = row[col.key]) !== null && _b !== void 0 ? _b : "—")));
                }))))))),
        totalPages > 1 && (React.createElement("div", { style: {
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 8,
                marginTop: 10,
                flexShrink: 0,
            } },
            React.createElement("span", { style: { fontSize: 12, color: "var(--rdg-muted)" } },
                page * perPage + 1,
                "\u2013",
                Math.min((page + 1) * perPage, sorted.length),
                " ",
                "of ",
                sorted.length),
            React.createElement("button", { disabled: page === 0, onClick: () => setPage((p) => p - 1), style: {
                    background: "none",
                    border: "1px solid var(--rdg-border)",
                    borderRadius: 6,
                    padding: "2px 8px",
                    cursor: page === 0 ? "not-allowed" : "pointer",
                    opacity: page === 0 ? 0.4 : 1,
                    fontSize: 12,
                    color: "var(--rdg-text)",
                } }, "\u2039"),
            React.createElement("button", { disabled: page >= totalPages - 1, onClick: () => setPage((p) => p + 1), style: {
                    background: "none",
                    border: "1px solid var(--rdg-border)",
                    borderRadius: 6,
                    padding: "2px 8px",
                    cursor: page >= totalPages - 1 ? "not-allowed" : "pointer",
                    opacity: page >= totalPages - 1 ? 0.4 : 1,
                    fontSize: 12,
                    color: "var(--rdg-text)",
                } }, "\u203A")))));
};
