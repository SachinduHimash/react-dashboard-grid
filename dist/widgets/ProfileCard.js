import React from "react";
export const ProfileCard = ({ data }) => {
    var _a, _b;
    return (React.createElement("div", { style: {
            padding: "24px 20px 20px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxSizing: "border-box",
            gap: 0,
        } },
        React.createElement("div", { style: {
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "var(--rdg-bg)",
                border: "1px solid var(--rdg-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                overflow: "hidden",
                flexShrink: 0,
            } }, data.avatarUrl ? (React.createElement("img", { src: data.avatarUrl, alt: data.name, style: { width: "100%", height: "100%", objectFit: "cover" } })) : (React.createElement("span", { style: { fontSize: 36 } }, (_a = data.avatarEmoji) !== null && _a !== void 0 ? _a : (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "64", height: "64", fill: "none", stroke: "var(--rdg-muted)", "stroke-width": "2" },
            React.createElement("circle", { cx: "12", cy: "8", r: "4" }),
            React.createElement("path", { d: "M4 20c0-4 4-6 8-6s8 2 8 6" })))))),
        React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "var(--rdg-text)" } }, data.name),
        data.email && (React.createElement("div", { style: { fontSize: 13, color: "var(--rdg-muted)", marginTop: 2 } }, data.email)),
        data.role && (React.createElement("div", { style: {
                marginTop: 6,
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 10px",
                borderRadius: 99,
                background: (_b = data.badgeColor) !== null && _b !== void 0 ? _b : "var(--rdg-primary)",
                color: "#fff",
                display: "inline-block",
            } }, data.role)),
        data.stats && data.stats.length > 0 && (React.createElement("div", { style: {
                marginTop: "auto",
                paddingTop: 5,
                display: "flex",
                gap: 0,
                width: "100%",
                borderTop: "1px solid var(--rdg-border)",
            } }, data.stats.map((s, i) => (React.createElement("div", { key: i, style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRight: i < data.stats.length - 1
                    ? "1px solid var(--rdg-border)"
                    : "none",
            } },
            React.createElement("div", { style: {
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--rdg-text)",
                } }, s.value),
            React.createElement("div", { style: {
                    fontSize: 11,
                    color: "var(--rdg-muted)",
                    marginTop: 2,
                } }, s.label))))))));
};
