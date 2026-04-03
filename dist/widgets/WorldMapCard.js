import React, { useState } from "react";
// Simplified world map using approximate SVG paths for major regions
// Using a dot-grid / bubble approach for simplicity and elegance
const REGION_POSITIONS = {
    US: { cx: 180, cy: 130, label: "United States" },
    CA: { cx: 160, cy: 95, label: "Canada" },
    MX: { cx: 165, cy: 160, label: "Mexico" },
    BR: { cx: 250, cy: 230, label: "Brazil" },
    AR: { cx: 235, cy: 275, label: "Argentina" },
    CO: { cx: 220, cy: 195, label: "Colombia" },
    GB: { cx: 415, cy: 95, label: "United Kingdom" },
    FR: { cx: 430, cy: 110, label: "France" },
    DE: { cx: 445, cy: 100, label: "Germany" },
    ES: { cx: 420, cy: 120, label: "Spain" },
    IT: { cx: 450, cy: 120, label: "Italy" },
    RU: { cx: 530, cy: 80, label: "Russia" },
    CN: { cx: 600, cy: 125, label: "China" },
    JP: { cx: 650, cy: 115, label: "Japan" },
    IN: { cx: 565, cy: 155, label: "India" },
    AU: { cx: 635, cy: 250, label: "Australia" },
    ZA: { cx: 460, cy: 245, label: "South Africa" },
    NG: { cx: 440, cy: 185, label: "Nigeria" },
    EG: { cx: 470, cy: 150, label: "Egypt" },
    SA: { cx: 510, cy: 155, label: "Saudi Arabia" },
    KR: { cx: 645, cy: 120, label: "South Korea" },
    ID: { cx: 620, cy: 200, label: "Indonesia" },
    TR: { cx: 490, cy: 120, label: "Turkey" },
    PL: { cx: 460, cy: 100, label: "Poland" },
    NL: { cx: 432, cy: 97, label: "Netherlands" },
    SE: { cx: 450, cy: 82, label: "Sweden" },
    NO: { cx: 440, cy: 75, label: "Norway" },
    CH: { cx: 440, cy: 108, label: "Switzerland" },
    SG: { cx: 620, cy: 185, label: "Singapore" },
    TH: { cx: 600, cy: 170, label: "Thailand" },
};
const DEFAULT_PRIMARY = "#6366f1";
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}
export const WorldMapCard = ({ data }) => {
    var _a;
    const [tooltip, setTooltip] = useState(null);
    const primary = (_a = data.primaryColor) !== null && _a !== void 0 ? _a : DEFAULT_PRIMARY;
    const regionMap = {};
    data.regions.forEach((r) => {
        regionMap[r.id] = r;
    });
    const maxVal = Math.max(...data.regions.map((r) => Number(r.value) || 0), 1);
    return (React.createElement("div", { style: {
            padding: "16px 20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
        } },
        React.createElement("div", { style: { marginBottom: 10, flexShrink: 0 } },
            React.createElement("div", { style: {
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--rdg-text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                } }, data.title),
            data.subtitle && (React.createElement("div", { style: { fontSize: 12, color: "var(--rdg-muted)", marginTop: 2 } }, data.subtitle))),
        React.createElement("div", { style: { flex: 1, minHeight: 0, position: "relative" } },
            React.createElement("svg", { viewBox: "0 0 780 320", width: "100%", height: "100%", style: { display: "block" }, onMouseLeave: () => setTooltip(null) },
                Object.entries(REGION_POSITIONS).map(([id, pos]) => {
                    var _a, _b;
                    const region = regionMap[id];
                    const intensity = region
                        ? ((_a = region.percentage) !== null && _a !== void 0 ? _a : (Number(region.value) / maxVal) * 100) /
                            100
                        : 0;
                    const color = (_b = region === null || region === void 0 ? void 0 : region.color) !== null && _b !== void 0 ? _b : primary;
                    const isActive = !!region;
                    return (React.createElement("g", { key: id },
                        isActive && (React.createElement("circle", { cx: pos.cx, cy: pos.cy, r: 12 + intensity * 8, fill: color, fillOpacity: 0.12 })),
                        React.createElement("circle", { cx: pos.cx, cy: pos.cy, r: isActive ? 5 + intensity * 6 : 3, fill: isActive ? color : "var(--rdg-border)", fillOpacity: isActive ? 0.85 : 0.5, style: {
                                cursor: isActive ? "pointer" : "default",
                                transition: "r 0.2s",
                            }, onMouseEnter: (e) => {
                                if (!isActive)
                                    return;
                                const svg = e.target.closest("svg");
                                const rect = svg.getBoundingClientRect();
                                const svgX = (pos.cx / 780) * rect.width;
                                const svgY = (pos.cy / 320) * rect.height;
                                setTooltip({ region: region, x: svgX, y: svgY });
                            }, onMouseLeave: () => setTooltip(null) }),
                        isActive && (React.createElement("text", { x: pos.cx, y: pos.cy - (8 + intensity * 6), textAnchor: "middle", fontSize: 8, fill: color, fontWeight: 600 }, id))));
                }),
                data.regions.slice(0, 3).map((r, i) => {
                    const pos = REGION_POSITIONS[r.id];
                    if (!pos)
                        return null;
                    const next = data.regions[i + 1];
                    const nextPos = next ? REGION_POSITIONS[next.id] : null;
                    if (!nextPos)
                        return null;
                    return (React.createElement("line", { key: `line-${i}`, x1: pos.cx, y1: pos.cy, x2: nextPos.cx, y2: nextPos.cy, stroke: primary, strokeOpacity: 0.12, strokeWidth: 1, strokeDasharray: "3 4" }));
                })),
            tooltip && (React.createElement("div", { style: {
                    position: "absolute",
                    left: tooltip.x + 10,
                    top: tooltip.y - 30,
                    background: "var(--rdg-card-bg)",
                    border: "1px solid var(--rdg-border)",
                    borderRadius: 8,
                    padding: "6px 10px",
                    fontSize: 12,
                    color: "var(--rdg-text)",
                    pointerEvents: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    whiteSpace: "nowrap",
                } },
                React.createElement("div", { style: { fontWeight: 600 } }, tooltip.region.label),
                React.createElement("div", { style: { color: "var(--rdg-muted)" } }, tooltip.region.value)))),
        data.showLegend !== false && (React.createElement("div", { style: {
                flexShrink: 0,
                marginTop: 8,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
            } }, data.regions.slice(0, 5).map((r) => {
            var _a;
            return (React.createElement("div", { key: r.id, style: { display: "flex", alignItems: "center", gap: 4 } },
                React.createElement("div", { style: {
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: (_a = r.color) !== null && _a !== void 0 ? _a : primary,
                        flexShrink: 0,
                    } }),
                React.createElement("span", { style: { fontSize: 11, color: "var(--rdg-muted)" } },
                    r.id,
                    ":",
                    " ",
                    React.createElement("strong", { style: { color: "var(--rdg-text)" } }, r.value))));
        })))));
};
