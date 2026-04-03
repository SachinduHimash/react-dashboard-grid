import React from "react";
import { ListData } from "../types";

export const ListCard: React.FC<{ data: ListData }> = ({ data }) => (
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
        fontSize: 15,
        fontWeight: 600,
        color: "var(--rdg-text)",
        textTransform: "uppercase",
        marginBottom: 12,
      }}
    >
      {data.title}
    </div>
    <div style={{ flex: 1, overflowY: "auto" }}>
      {data.items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid var(--rdg-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {item.icon && <span>{item.icon}</span>}
            <span style={{ fontSize: 14, color: "var(--rdg-text)" }}>
              {item.label}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {item.value && (
              <span style={{ fontSize: 14, color: "var(--rdg-muted)" }}>
                {item.value}
              </span>
            )}
            {item.badge && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: item.badgeColor ?? "var(--rdg-primary)",
                  color: "#fff",
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
