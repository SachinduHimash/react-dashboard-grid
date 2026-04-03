import React from "react";
import { SplitStatSegment } from "../types";

export interface SplitStatData {
  title: string;
  titleAction?: string;
  value: string | number;
  unit?: string;
  segments: SplitStatSegment[];
  minValue?: string | number;
  maxValue?: string | number;
}

export const SplitStatCard: React.FC<{ data: SplitStatData }> = ({ data }) => {
  const bg = "var(--rdg-card-bg)";
  const text = "var(--rdg-text)";
  const muted = "var(--rdg-muted)";
  const border = "var(--rdg-border)";

  const defaultColors = ["#6366f1", "#22c55e", "#f59e0b", "#e11d48"];

  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        background: bg,
        borderRadius: "var(--rdg-radius)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, color: text }}>
          {data.title}
        </div>
        {data.titleAction && (
          <div
            style={{
              fontSize: 12,
              color: muted,
              display: "flex",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
            }}
          >
            {data.titleAction} <span style={{ fontSize: 10 }}>›</span>
          </div>
        )}
      </div>

      {/* Main value */}
      <div
        style={{
          fontSize: 30,
          fontWeight: 800,
          color: text,
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        {data.value}
        {data.unit && (
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginLeft: 2,
              color: muted,
            }}
          >
            {data.unit}
          </span>
        )}
      </div>

      {/* Segments labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        {data.segments.map((seg, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background:
                  seg.color ?? defaultColors[i % defaultColors.length],
              }}
            />
            <span style={{ fontSize: 11, color: muted }}>
              {seg.label} {seg.percentage}%
            </span>
          </div>
        ))}
      </div>

      {/* Stacked progress bar */}
      <div
        style={{
          display: "flex",
          height: 10,
          borderRadius: 6,
          overflow: "hidden",
          gap: 2,
          marginBottom: 8,
        }}
      >
        {data.segments.map((seg, i) => (
          <div
            key={i}
            style={{
              flex: seg.percentage,
              background: seg.color ?? defaultColors[i % defaultColors.length],
              borderRadius:
                i === 0
                  ? "6px 0 0 6px"
                  : i === data.segments.length - 1
                    ? "0 6px 6px 0"
                    : 0,
            }}
          />
        ))}
      </div>

      {/* Min / max labels */}
      {(data.minValue !== undefined || data.maxValue !== undefined) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 11, color: muted }}>{data.minValue}</span>
          <span style={{ fontSize: 11, color: muted }}>{data.maxValue}</span>
        </div>
      )}
    </div>
  );
};
