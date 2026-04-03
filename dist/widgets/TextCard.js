import React from "react";
export const TextCard = ({ data }) => (React.createElement("div", { style: { padding: "20px", height: "100%" } },
    React.createElement("div", { style: {
            fontSize: 15,
            fontWeight: 600,
            color: "var(--rdg-text)",
            textTransform: "uppercase",
            marginBottom: 8,
        } }, data.title),
    React.createElement("div", { style: { fontSize: 14, color: "var(--rdg-muted)", lineHeight: 1.6 } }, data.body)));
