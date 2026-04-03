import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** When true, the chart area shrinks to leave room for a legend column */
  legendSide?: boolean;
  legend?: React.ReactNode;
}

export const ChartWrapper: React.FC<Props> = ({
  title,
  subtitle,
  children,
  legendSide,
  legend,
}) => (
  <div
    style={{
      padding: "16px 20px 12px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      overflow: "hidden",
    }}
  >
    {/* Header — never shrinks */}
    <div style={{ marginBottom: 8, flexShrink: 0 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "var(--rdg-text)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 11,
            color: "var(--rdg-muted)",
            marginTop: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subtitle}
        </div>
      )}
    </div>

    {/* Chart + optional side legend */}
    <div
      style={{
        flex: 1,
        minHeight: 0,
        minWidth: 0,
        display: "flex",
        gap: 8,
        overflow: "hidden",
      }}
    >
      {/* Chart — fills remaining space, never overflows */}
      <div style={{ flex: 1, minHeight: 0, minWidth: 0, overflow: "hidden" }}>
        {children}
      </div>

      {/* Optional side legend */}
      {legendSide && legend && (
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6,
            paddingLeft: 4,
          }}
        >
          {legend}
        </div>
      )}
    </div>
  </div>
);
