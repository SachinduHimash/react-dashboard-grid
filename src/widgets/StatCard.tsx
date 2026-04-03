import React from "react";
import { StatData } from "../types";

export const StatCard: React.FC<{ data: StatData }> = ({ data }) => (
  <div
    style={{
      padding: "20px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
      }}
    >
      <span
        style={{
          fontSize: 15,
          color: "var(--rdg-text)",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {data.title}
      </span>
      {data.icon && <span style={{ fontSize: 20 }}>{data.icon}</span>}
    </div>
    <div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "var(--rdg-text)",
          lineHeight: 1.1,
        }}
      >
        {data.value}
      </div>
      {data.change && (
        <div
          style={{
            marginTop: 6,
            fontSize: 13,
            fontWeight: 500,
            color:
              data.changeType === "up"
                ? "#22c55e"
                : data.changeType === "down"
                  ? "#ef4444"
                  : "var(--rdg-muted)",
          }}
        >
          {data.changeType === "up"
            ? "↑"
            : data.changeType === "down"
              ? "↓"
              : ""}{" "}
          {data.change}
        </div>
      )}
    </div>
  </div>
);
