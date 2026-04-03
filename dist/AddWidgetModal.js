import React, { useState } from "react";
// ─── SVG Icon set (no emojis) ─────────────────────────────────────────────────
const Icons = {
    BarChart2: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("line", { x1: "18", y1: "20", x2: "18", y2: "10" }),
        React.createElement("line", { x1: "12", y1: "20", x2: "12", y2: "4" }),
        React.createElement("line", { x1: "6", y1: "20", x2: "6", y2: "14" }),
        React.createElement("line", { x1: "2", y1: "20", x2: "22", y2: "20" }))),
    TrendingUp: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
        React.createElement("polyline", { points: "17 6 23 6 23 12" }))),
    Activity: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }))),
    PieChart: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83" }),
        React.createElement("path", { d: "M22 12A10 10 0 0 0 12 2v10z" }))),
    List: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("line", { x1: "8", y1: "6", x2: "21", y2: "6" }),
        React.createElement("line", { x1: "8", y1: "12", x2: "21", y2: "12" }),
        React.createElement("line", { x1: "8", y1: "18", x2: "21", y2: "18" }),
        React.createElement("line", { x1: "3", y1: "6", x2: "3.01", y2: "6" }),
        React.createElement("line", { x1: "3", y1: "12", x2: "3.01", y2: "12" }),
        React.createElement("line", { x1: "3", y1: "18", x2: "3.01", y2: "18" }))),
    Table: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
        React.createElement("path", { d: "M3 9h18M3 15h18M9 3v18" }))),
    Gauge: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M12 2a10 10 0 0 1 7.38 16.75" }),
        React.createElement("path", { d: "M12 2a10 10 0 0 0-7.38 16.75" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "1" }),
        React.createElement("line", { x1: "12", y1: "12", x2: "16", y2: "8" }))),
    User: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
        React.createElement("circle", { cx: "12", cy: "7", r: "4" }))),
    Layers: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("polygon", { points: "12 2 2 7 12 12 22 7 12 2" }),
        React.createElement("polyline", { points: "2 17 12 22 22 17" }),
        React.createElement("polyline", { points: "2 12 12 17 22 12" }))),
    Calendar: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
        React.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
        React.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
        React.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" }))),
    FileText: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
        React.createElement("polyline", { points: "14 2 14 8 20 8" }),
        React.createElement("line", { x1: "16", y1: "13", x2: "8", y2: "13" }),
        React.createElement("line", { x1: "16", y1: "17", x2: "8", y2: "17" }),
        React.createElement("polyline", { points: "10 9 9 9 8 9" }))),
    Box: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }))),
    Histogram: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("rect", { x: "3", y: "12", width: "4", height: "8" }),
        React.createElement("rect", { x: "9", y: "6", width: "4", height: "14" }),
        React.createElement("rect", { x: "15", y: "9", width: "4", height: "11" }),
        React.createElement("line", { x1: "2", y1: "20", x2: "22", y2: "20" }))),
    Search: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("circle", { cx: "11", cy: "11", r: "8" }),
        React.createElement("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }))),
    Plus: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" },
        React.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
        React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }))),
    X: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" },
        React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }))),
    ChevronRight: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("polyline", { points: "9 18 15 12 9 6" }))),
    Check: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" },
        React.createElement("polyline", { points: "20 6 9 17 4 12" }))),
    Resize: () => (React.createElement("svg", { viewBox: "0 0 24 24", width: "14", height: "14", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" },
        React.createElement("path", { d: "M21 15v6h-6M3 9V3h6M21 3l-7 7M3 21l7-7" }))),
};
// ─── Category mapping ─────────────────────────────────────────────────────────
const TYPE_CATEGORY = {
    stat: "Metrics",
    gauge: "Metrics",
    splitstat: "Metrics",
    chart: "Charts",
    line: "Charts",
    bar: "Charts",
    area: "Charts",
    pie: "Charts",
    donut: "Charts",
    histogram: "Charts",
    list: "Display",
    table: "Display",
    text: "Display",
    profile: "Display",
    calendar: "Tools",
    custom: "Custom",
};
function categoryForTemplate(t) {
    var _a, _b, _c, _d;
    const type = t.component.type;
    if (type === "chart") {
        const chartType = (_b = (_a = t.component.data) === null || _a === void 0 ? void 0 : _a.chartType) !== null && _b !== void 0 ? _b : "";
        return (_c = TYPE_CATEGORY[chartType]) !== null && _c !== void 0 ? _c : "Charts";
    }
    return (_d = TYPE_CATEGORY[type]) !== null && _d !== void 0 ? _d : "Other";
}
// Icon lookup by widget type
const TYPE_ICON = {
    stat: Icons.TrendingUp,
    gauge: Icons.Gauge,
    splitstat: Icons.Layers,
    list: Icons.List,
    table: Icons.Table,
    text: Icons.FileText,
    profile: Icons.User,
    calendar: Icons.Calendar,
    custom: Icons.Box,
};
function iconForTemplate(t) {
    var _a, _b, _c;
    const type = t.component.type;
    if (type === "chart") {
        const chartType = (_b = (_a = t.component.data) === null || _a === void 0 ? void 0 : _a.chartType) !== null && _b !== void 0 ? _b : "";
        if (chartType === "line" || chartType === "area")
            return Icons.Activity;
        if (chartType === "pie" || chartType === "donut")
            return Icons.PieChart;
        if (chartType === "histogram")
            return Icons.Histogram;
        return Icons.BarChart2;
    }
    return (_c = TYPE_ICON[type]) !== null && _c !== void 0 ? _c : Icons.Box;
}
// ─── Size badge labels ─────────────────────────────────────────────────────────
const SIZE_LABELS = {
    small: "Small · 3×2",
    medium: "Medium · 6×3",
    large: "Large · 12×4",
};
// ─── Default templates (all widgets showcased) ────────────────────────────────
export const DEFAULT_TEMPLATES = [
    {
        key: "stat-default",
        label: "Stat Card",
        description: "A single KPI metric with optional trend indicator and icon.",
        component: {
            type: "stat",
            size: "small",
            data: { title: "New Metric", value: "—", changeType: "neutral" },
        },
    },
    {
        key: "chart-line",
        label: "Line Chart",
        description: "Continuous trend data visualised as a smooth line over time.",
        component: {
            type: "chart",
            size: "medium",
            data: {
                chartType: "line",
                title: "Line Chart",
                data: [
                    { label: "Jan", value: 30 },
                    { label: "Feb", value: 55 },
                    { label: "Mar", value: 40 },
                    { label: "Apr", value: 70 },
                    { label: "May", value: 60 },
                    { label: "Jun", value: 90 },
                ],
            },
        },
    },
    {
        key: "chart-bar",
        label: "Bar Chart",
        description: "Compare discrete values across categories with vertical bars.",
        component: {
            type: "chart",
            size: "medium",
            data: {
                chartType: "bar",
                title: "Bar Chart",
                data: [
                    { label: "Q1", value: 120 },
                    { label: "Q2", value: 180 },
                    { label: "Q3", value: 150 },
                    { label: "Q4", value: 210 },
                ],
            },
        },
    },
    {
        key: "chart-area",
        label: "Area Chart",
        description: "Line chart with a filled area — great for volume or cumulative data.",
        component: {
            type: "chart",
            size: "medium",
            data: {
                chartType: "area",
                title: "Area Chart",
                data: [
                    { label: "Mon", value: 20 },
                    { label: "Tue", value: 45 },
                    { label: "Wed", value: 35 },
                    { label: "Thu", value: 60 },
                    { label: "Fri", value: 80 },
                    { label: "Sat", value: 55 },
                ],
            },
        },
    },
    {
        key: "chart-pie",
        label: "Donut Chart",
        description: "Show part-to-whole proportions across categories.",
        component: {
            type: "chart",
            size: "medium",
            data: {
                chartType: "donut",
                title: "Donut Chart",
                data: [
                    { label: "Direct", value: 40 },
                    { label: "Organic", value: 30 },
                    { label: "Referral", value: 20 },
                    { label: "Social", value: 10 },
                ],
            },
        },
    },
    {
        key: "chart-histogram",
        label: "Histogram",
        description: "Frequency distribution of continuous data across bins.",
        component: {
            type: "chart",
            size: "medium",
            data: {
                chartType: "histogram",
                title: "Histogram",
                data: [
                    { label: "0–10", value: 5 },
                    { label: "10–20", value: 12 },
                    { label: "20–30", value: 20 },
                    { label: "30–40", value: 15 },
                    { label: "40–50", value: 8 },
                ],
            },
        },
    },
    {
        key: "list-default",
        label: "List",
        description: "Labelled rows with optional value, badge, and icon columns.",
        component: {
            type: "list",
            size: "medium",
            data: {
                title: "New List",
                items: [
                    { id: "1", label: "Item one", value: "—" },
                    { id: "2", label: "Item two", value: "—" },
                    { id: "3", label: "Item three", value: "—" },
                ],
            },
        },
    },
    {
        key: "table-default",
        label: "Data Table",
        description: "Sortable, paginated rows — ideal for dense tabular data.",
        component: {
            type: "table",
            size: "large",
            data: {
                title: "Data Table",
                columns: [
                    { key: "name", label: "Name" },
                    { key: "value", label: "Value", align: "right" },
                ],
                rows: [],
                sortable: true,
                striped: true,
            },
        },
    },
    {
        key: "gauge-default",
        label: "Gauge",
        description: "Semicircle gauge showing a percentage fill with a needle.",
        component: {
            type: "gauge",
            size: "small",
            data: {
                title: "New Gauge",
                value: "75%",
                percentage: 75,
            },
        },
    },
    {
        key: "profile-default",
        label: "Profile Card",
        description: "User avatar, name, email, role badge and optional stat row.",
        component: {
            type: "profile",
            size: "small",
            data: {
                name: "New User",
                role: "Member",
                avatarEmoji: "👤",
            },
        },
    },
    {
        key: "splitstat-default",
        label: "Split Progress",
        description: "Main value with a multi-segment stacked progress bar.",
        component: {
            type: "splitstat",
            size: "small",
            data: {
                title: "Split Stat",
                value: "100",
                segments: [
                    { label: "A", percentage: 40, color: "#6366f1" },
                    { label: "B", percentage: 35, color: "#22c55e" },
                    { label: "C", percentage: 25, color: "#f59e0b" },
                ],
            },
        },
    },
    {
        key: "calendar-default",
        label: "Calendar",
        description: "Monthly calendar with event dot indicators per day.",
        component: {
            type: "calendar",
            size: "medium",
            data: {
                title: "Calendar",
                events: [],
                highlightToday: true,
            },
        },
    },
    {
        key: "text-default",
        label: "Text Block",
        description: "Free-form text card — ideal for notes, announcements, or labels.",
        component: {
            type: "text",
            size: "small",
            data: {
                title: "Note",
                body: "Add your text here.",
            },
        },
    },
];
// ─── Modal component ──────────────────────────────────────────────────────────
let _idCounter = 1000;
function genId() {
    return `widget-${Date.now()}-${++_idCounter}`;
}
export const AddWidgetModal = ({ isOpen, onClose, onAdd, templates = DEFAULT_TEMPLATES, primaryColor = "#6366f1", }) => {
    var _a, _b, _c, _d;
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState(null);
    const reset = () => {
        setSelected(null);
        setSearch("");
        setActiveCategory(null);
    };
    const handleClose = () => {
        reset();
        onClose();
    };
    const handleAdd = () => {
        if (!selected)
            return;
        const widget = Object.assign(Object.assign({}, selected.component), { id: genId() });
        onAdd(widget);
        reset();
        onClose();
    };
    const categories = Array.from(new Set(templates.map(categoryForTemplate)));
    const filtered = templates.filter((t) => {
        const matchSearch = !search ||
            t.label.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase());
        const matchCat = !activeCategory || categoryForTemplate(t) === activeCategory;
        return matchSearch && matchCat;
    });
    if (!isOpen)
        return null;
    const inputBase = {
        width: "100%",
        padding: "9px 12px",
        borderRadius: 8,
        border: "1px solid var(--rdg-border, #e5e7eb)",
        fontSize: 13,
        color: "var(--rdg-text, #111827)",
        background: "var(--rdg-card-bg, #fff)",
        fontFamily: "inherit",
        boxSizing: "border-box",
        outline: "none",
    };
    return (React.createElement("div", { style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
        }, onClick: (e) => {
            if (e.target === e.currentTarget)
                handleClose();
        } },
        React.createElement("div", { style: {
                background: "var(--rdg-card-bg, #fff)",
                borderRadius: 16,
                width: "100%",
                maxWidth: 720,
                maxHeight: "88vh",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
                overflow: "hidden",
                fontFamily: "var(--rdg-font, system-ui, sans-serif)",
            } },
            React.createElement("div", { style: {
                    padding: "20px 24px 14px",
                    borderBottom: "1px solid var(--rdg-border, #e5e7eb)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: {
                            fontSize: 17,
                            fontWeight: 700,
                            color: "var(--rdg-text, #111827)",
                        } }, "Add Widget"),
                    React.createElement("div", { style: {
                            fontSize: 13,
                            color: "var(--rdg-muted, #6b7280)",
                            marginTop: 2,
                        } }, "Select a widget to add to your dashboard")),
                React.createElement("button", { onClick: handleClose, style: {
                        background: "var(--rdg-bg, #f4f5f7)",
                        border: "1px solid var(--rdg-border, #e5e7eb)",
                        cursor: "pointer",
                        color: "var(--rdg-muted, #6b7280)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        padding: 0,
                    } },
                    React.createElement(Icons.X, null))),
            React.createElement("div", { style: {
                    padding: "12px 24px",
                    borderBottom: "1px solid var(--rdg-border, #e5e7eb)",
                    flexShrink: 0,
                    background: "var(--rdg-bg, #f9fafb)",
                } },
                React.createElement("div", { style: { position: "relative", marginBottom: 10 } },
                    React.createElement("span", { style: {
                            position: "absolute",
                            left: 10,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--rdg-muted, #9ca3af)",
                            display: "flex",
                            pointerEvents: "none",
                        } },
                        React.createElement(Icons.Search, null)),
                    React.createElement("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search widgets\u2026", style: Object.assign(Object.assign({}, inputBase), { paddingLeft: 34 }), onFocus: (e) => (e.target.style.borderColor = primaryColor), onBlur: (e) => (e.target.style.borderColor = "var(--rdg-border, #e5e7eb)") })),
                React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, [null, ...categories].map((cat) => {
                    const active = activeCategory === cat;
                    return (React.createElement("button", { key: cat !== null && cat !== void 0 ? cat : "__all__", onClick: () => setActiveCategory(cat), style: {
                            padding: "4px 12px",
                            borderRadius: 99,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            border: `1px solid ${active ? primaryColor : "var(--rdg-border, #e5e7eb)"}`,
                            background: active
                                ? primaryColor
                                : "var(--rdg-card-bg, #fff)",
                            color: active ? "#fff" : "var(--rdg-muted, #6b7280)",
                            transition: "all 0.12s",
                        } }, cat !== null && cat !== void 0 ? cat : "All"));
                }))),
            React.createElement("div", { style: { flex: 1, minHeight: 0, display: "flex", overflow: "hidden" } },
                React.createElement("div", { style: {
                        flex: "0 0 55%",
                        overflowY: "auto",
                        padding: "16px 20px",
                        borderRight: "1px solid var(--rdg-border, #e5e7eb)",
                    } }, filtered.length === 0 ? (React.createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 180,
                        color: "var(--rdg-muted, #6b7280)",
                        gap: 8,
                        textAlign: "center",
                    } },
                    React.createElement(Icons.Search, null),
                    React.createElement("div", { style: { fontSize: 14, fontWeight: 600 } }, "No widgets found"),
                    React.createElement("div", { style: { fontSize: 12 } }, "Try a different search term or category"))) : (React.createElement("div", { style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 8,
                    } }, filtered.map((t) => {
                    const isActive = (selected === null || selected === void 0 ? void 0 : selected.key) === t.key;
                    const Icon = iconForTemplate(t);
                    const cat = categoryForTemplate(t);
                    return (React.createElement("div", { key: t.key, onClick: () => setSelected(t), style: {
                            padding: "12px",
                            borderRadius: 10,
                            cursor: "pointer",
                            border: `1.5px solid ${isActive ? primaryColor : "var(--rdg-border, #e5e7eb)"}`,
                            background: isActive
                                ? `color-mix(in srgb, ${primaryColor} 8%, var(--rdg-card-bg, #fff))`
                                : "var(--rdg-card-bg, #fff)",
                            transition: "all 0.12s",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                        } },
                        isActive && (React.createElement("div", { style: {
                                position: "absolute",
                                top: 8,
                                right: 8,
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                background: primaryColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                            } },
                            React.createElement(Icons.Check, null))),
                        React.createElement("div", { style: {
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                background: isActive
                                    ? `color-mix(in srgb, ${primaryColor} 15%, transparent)`
                                    : "var(--rdg-bg, #f4f5f7)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: isActive
                                    ? primaryColor
                                    : "var(--rdg-muted, #6b7280)",
                            } },
                            React.createElement(Icon, null)),
                        React.createElement("div", { style: {
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--rdg-text, #111827)",
                            } }, t.label),
                        React.createElement("div", { style: {
                                fontSize: 11,
                                color: "var(--rdg-muted, #6b7280)",
                                lineHeight: 1.4,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            } }, t.description),
                        React.createElement("div", { style: {
                                alignSelf: "flex-start",
                                fontSize: 10,
                                fontWeight: 600,
                                padding: "2px 7px",
                                borderRadius: 99,
                                background: "var(--rdg-bg, #f4f5f7)",
                                color: "var(--rdg-muted, #6b7280)",
                                marginTop: 2,
                            } }, cat)));
                })))),
                React.createElement("div", { style: {
                        flex: 1,
                        overflowY: "auto",
                        padding: "20px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    } }, !selected ? (React.createElement("div", { style: {
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--rdg-muted, #6b7280)",
                        textAlign: "center",
                        gap: 12,
                        padding: "40px 20px",
                    } },
                    React.createElement("div", { style: {
                            width: 56,
                            height: 56,
                            borderRadius: 14,
                            background: "var(--rdg-bg, #f4f5f7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--rdg-border, #d1d5db)",
                        } },
                        React.createElement("svg", { viewBox: "0 0 24 24", width: "28", height: "28", fill: "none", stroke: "currentColor", strokeWidth: "1.5" },
                            React.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }),
                            React.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }),
                            React.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }),
                            React.createElement("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" }))),
                    React.createElement("div", { style: {
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--rdg-text, #374151)",
                        } }, "Select a widget"),
                    React.createElement("div", { style: { fontSize: 12, lineHeight: 1.5, maxWidth: 180 } }, "Choose from the grid to see its details and add it to your dashboard."))) : (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: {
                            padding: "14px 16px",
                            borderRadius: 10,
                            background: `color-mix(in srgb, ${primaryColor} 8%, var(--rdg-bg, #f4f5f7))`,
                            border: `1px solid color-mix(in srgb, ${primaryColor} 20%, transparent)`,
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                        } },
                        React.createElement("div", { style: {
                                width: 42,
                                height: 42,
                                borderRadius: 10,
                                background: `color-mix(in srgb, ${primaryColor} 15%, white)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: primaryColor,
                                flexShrink: 0,
                            } }, React.createElement(iconForTemplate(selected))),
                        React.createElement("div", null,
                            React.createElement("div", { style: {
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "var(--rdg-text, #111827)",
                                } }, selected.label),
                            React.createElement("div", { style: {
                                    fontSize: 12,
                                    color: "var(--rdg-muted, #6b7280)",
                                    marginTop: 2,
                                    lineHeight: 1.4,
                                } }, selected.description))),
                    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                        React.createElement(DetailRow, { label: "Category", value: categoryForTemplate(selected) }),
                        React.createElement(DetailRow, { label: "Default size", value: (_c = (_b = SIZE_LABELS[(_a = selected.component.size) !== null && _a !== void 0 ? _a : "medium"]) !== null && _b !== void 0 ? _b : selected.component.size) !== null && _c !== void 0 ? _c : "medium", icon: React.createElement(Icons.Resize, null) }),
                        React.createElement(DetailRow, { label: "Widget type", value: selected.component.type }),
                        ((_d = selected.component.data) === null || _d === void 0 ? void 0 : _d.chartType) && (React.createElement(DetailRow, { label: "Chart type", value: selected.component.data.chartType })),
                        selected.component.resizable && (React.createElement(DetailRow, { label: "Resizable", value: "Yes" }))),
                    React.createElement("div", { style: {
                            padding: "10px 14px",
                            borderRadius: 8,
                            background: "var(--rdg-bg, #f4f5f7)",
                            border: "1px solid var(--rdg-border, #e5e7eb)",
                            fontSize: 11,
                            fontFamily: "monospace",
                            color: "var(--rdg-muted, #6b7280)",
                            overflowX: "auto",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all",
                            maxHeight: 120,
                            overflowY: "auto",
                        } }, JSON.stringify({
                        type: selected.component.type,
                        size: selected.component.size,
                        data: selected.component.data,
                    }, null, 2)),
                    React.createElement("div", { style: { flex: 1 } }),
                    React.createElement("div", { style: {
                            fontSize: 11,
                            color: "var(--rdg-muted, #6b7280)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                        } },
                        React.createElement(Icons.Resize, null),
                        "You can drag, resize, and rearrange after adding."))))),
            React.createElement("div", { style: {
                    padding: "14px 24px",
                    borderTop: "1px solid var(--rdg-border, #e5e7eb)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexShrink: 0,
                    background: "var(--rdg-bg, #f9fafb)",
                } },
                React.createElement("span", { style: { fontSize: 12, color: "var(--rdg-muted, #6b7280)" } },
                    filtered.length,
                    " widget",
                    filtered.length !== 1 ? "s" : "",
                    " available"),
                React.createElement("div", { style: { display: "flex", gap: 8 } },
                    React.createElement("button", { onClick: handleClose, style: {
                            padding: "8px 18px",
                            borderRadius: 8,
                            border: "1px solid var(--rdg-border, #e5e7eb)",
                            background: "transparent",
                            fontSize: 13,
                            fontWeight: 500,
                            color: "var(--rdg-text, #111827)",
                            cursor: "pointer",
                            fontFamily: "inherit",
                        } }, "Cancel"),
                    React.createElement("button", { onClick: handleAdd, disabled: !selected, style: {
                            padding: "8px 20px",
                            borderRadius: 8,
                            border: "none",
                            background: selected
                                ? primaryColor
                                : "var(--rdg-border, #e5e7eb)",
                            fontSize: 13,
                            fontWeight: 600,
                            color: selected ? "#fff" : "var(--rdg-muted, #6b7280)",
                            cursor: selected ? "pointer" : "not-allowed",
                            fontFamily: "inherit",
                            transition: "background 0.15s",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        } },
                        React.createElement(Icons.Plus, null),
                        "Add to Dashboard"))))));
};
// ─── Small helper ─────────────────────────────────────────────────────────────
const DetailRow = ({ label, value, icon }) => (React.createElement("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "7px 10px",
        borderRadius: 7,
        background: "var(--rdg-bg, #f9fafb)",
        border: "1px solid var(--rdg-border, #e5e7eb)",
    } },
    React.createElement("span", { style: {
            fontSize: 12,
            color: "var(--rdg-muted, #6b7280)",
            fontWeight: 500,
        } }, label),
    React.createElement("span", { style: {
            fontSize: 12,
            color: "var(--rdg-text, #111827)",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
        } },
        icon,
        value)));
