import React from "react";
import { TextData } from "../types";

export const TextCard: React.FC<{ data: TextData }> = ({ data }) => (
  <div style={{ padding: "20px", height: "100%" }}>
    <div
      style={{
        fontSize: 15,
        fontWeight: 600,
        color: "var(--rdg-text)",
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      {data.title}
    </div>
    <div style={{ fontSize: 14, color: "var(--rdg-muted)", lineHeight: 1.6 }}>
      {data.body}
    </div>
  </div>
);
