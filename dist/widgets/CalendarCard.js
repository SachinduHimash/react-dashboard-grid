import React, { useState } from "react";
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const CalendarCard = ({ data }) => {
    var _a, _b, _c;
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selected, setSelected] = useState(null);
    const primary = (_a = data.primaryColor) !== null && _a !== void 0 ? _a : "var(--rdg-primary)";
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const eventMap = {};
    ((_b = data.events) !== null && _b !== void 0 ? _b : []).forEach((ev) => {
        if (!eventMap[ev.date])
            eventMap[ev.date] = [];
        eventMap[ev.date].push(ev);
    });
    const toKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());
    const cells = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    const navigate = (delta) => {
        const d = new Date(viewYear, viewMonth + delta, 1);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
    };
    return (React.createElement("div", { style: {
            padding: "16px 20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
        } },
        data.title && (React.createElement("div", { style: {
                fontSize: 14,
                fontWeight: 700,
                color: "var(--rdg-text)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 12,
                flexShrink: 0,
            } }, data.title)),
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                flexShrink: 0,
            } },
            React.createElement("button", { onClick: () => navigate(-1), style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--rdg-muted)",
                    fontSize: 16,
                    padding: "0 4px",
                } }, "\u2039"),
            React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "var(--rdg-text)" } },
                MONTHS[viewMonth],
                " ",
                viewYear),
            React.createElement("button", { onClick: () => navigate(1), style: {
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--rdg-muted)",
                    fontSize: 16,
                    padding: "0 4px",
                } }, "\u203A")),
        React.createElement("div", { style: {
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "2px 0",
                flexShrink: 0,
                marginBottom: 2,
            } }, DAYS.map((d) => (React.createElement("div", { key: d, style: {
                textAlign: "center",
                fontSize: 10,
                color: "var(--rdg-muted)",
                fontWeight: 600,
                padding: "2px 0",
                textTransform: "uppercase",
            } }, d)))),
        React.createElement("div", { style: {
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 2,
                flex: 1,
                minHeight: 0,
            } }, cells.map((day, i) => {
            var _a;
            if (day === null)
                return React.createElement("div", { key: `empty-${i}` });
            const key = toKey(viewYear, viewMonth, day);
            const isToday = key === todayKey && data.highlightToday !== false;
            const isSelected = key === selected;
            const evs = (_a = eventMap[key]) !== null && _a !== void 0 ? _a : [];
            return (React.createElement("div", { key: key, onClick: () => {
                    var _a;
                    setSelected(key);
                    (_a = data.onDateSelect) === null || _a === void 0 ? void 0 : _a.call(data, key);
                }, style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: 6,
                    padding: "3px 0",
                    background: isSelected
                        ? primary
                        : isToday
                            ? `color-mix(in srgb, ${primary} 15%, transparent)`
                            : "transparent",
                    border: isToday && !isSelected
                        ? `1px solid ${primary}`
                        : "1px solid transparent",
                } },
                React.createElement("span", { style: {
                        fontSize: 12,
                        fontWeight: isToday || isSelected ? 700 : 400,
                        color: isSelected
                            ? "#fff"
                            : isToday
                                ? primary
                                : "var(--rdg-text)",
                    } }, day),
                evs.length > 0 && (React.createElement("div", { style: { display: "flex", gap: 2, marginTop: 1 } }, evs.slice(0, 3).map((ev, j) => {
                    var _a;
                    return (React.createElement("div", { key: j, style: {
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: (_a = ev.color) !== null && _a !== void 0 ? _a : primary,
                        } }));
                })))));
        })),
        selected && ((_c = eventMap[selected]) === null || _c === void 0 ? void 0 : _c.length) > 0 && (React.createElement("div", { style: {
                marginTop: 10,
                flexShrink: 0,
                borderTop: "1px solid var(--rdg-border)",
                paddingTop: 8,
            } }, eventMap[selected].map((ev, i) => {
            var _a, _b;
            return (React.createElement("div", { key: i, style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                } },
                React.createElement("div", { style: {
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: (_a = ev.color) !== null && _a !== void 0 ? _a : primary,
                        flexShrink: 0,
                    } }),
                React.createElement("span", { style: { fontSize: 12, color: "var(--rdg-text)" } }, (_b = ev.label) !== null && _b !== void 0 ? _b : selected)));
        })))));
};
