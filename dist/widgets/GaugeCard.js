import React from "react";
const GaugeSVG = ({ percentage, color, }) => {
    const r = 54;
    const cx = 70;
    const cy = 70;
    // Arc from 180° to 0° (left to right, top semicircle)
    const startAngle = Math.PI; // 180°
    const endAngle = 0;
    const totalAngle = Math.PI; // 180°
    const toXY = (angle) => ({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
    });
    const bgStart = toXY(startAngle);
    const bgEnd = toXY(endAngle);
    const fillAngle = startAngle - (percentage / 100) * totalAngle;
    const fillEnd = toXY(fillAngle);
    const largeArc = percentage > 50 ? 1 : 0;
    // needle
    const needleAngle = startAngle - (percentage / 100) * totalAngle;
    const needleTip = {
        x: cx + (r - 4) * Math.cos(needleAngle),
        y: cy + (r - 4) * Math.sin(needleAngle),
    };
    return (React.createElement("svg", { viewBox: "0 0 140 80", width: "100%", height: "100%", style: { overflow: "visible" } },
        React.createElement("path", { d: `M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 0 1 ${bgEnd.x} ${bgEnd.y}`, fill: "none", stroke: "var(--rdg-border)", strokeWidth: 10, strokeLinecap: "round" }),
        percentage > 0 && (React.createElement("path", { d: `M ${bgStart.x} ${bgStart.y} A ${r} ${r} 0 ${largeArc} 1 ${fillEnd.x} ${fillEnd.y}`, fill: "none", stroke: color, strokeWidth: 10, strokeLinecap: "round" })),
        React.createElement("line", { x1: cx, y1: cy, x2: needleTip.x, y2: needleTip.y, stroke: color, strokeWidth: 2.5, strokeLinecap: "round" }),
        React.createElement("circle", { cx: cx, cy: cy, r: 4, fill: color }),
        React.createElement("text", { x: cx, y: cy + 16, textAnchor: "middle", fontSize: 13, fontWeight: 700, fill: "var(--rdg-text)" },
            percentage,
            "%")));
};
export const GaugeCard = ({ data }) => {
    var _a;
    const color = (_a = data.color) !== null && _a !== void 0 ? _a : "var(--rdg-primary)";
    return (React.createElement("div", { style: {
            padding: "16px 20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
        } },
        React.createElement("div", { style: {
                fontSize: 15,
                fontWeight: 700,
                color: "var(--rdg-text)",
                marginBottom: 2,
            } }, data.title),
        data.subtitle && (React.createElement("div", { style: { fontSize: 12, color: "var(--rdg-muted)", marginBottom: 6 } }, data.subtitle)),
        React.createElement("div", { style: {
                fontSize: 26,
                fontWeight: 800,
                color: "var(--rdg-text)",
                lineHeight: 1.1,
            } }, data.value),
        data.changeText && (React.createElement("div", { style: {
                fontSize: 12,
                color: "var(--rdg-muted)",
                marginTop: 2,
                marginBottom: 4,
            } }, data.changeText)),
        React.createElement("div", { style: {
                flex: 1,
                minHeight: 0,
                display: "flex",
                alignItems: "flex-end",
            } },
            React.createElement(GaugeSVG, { percentage: Math.min(100, Math.max(0, data.percentage)), color: color }))));
};
