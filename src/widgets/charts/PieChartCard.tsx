import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChartData } from "../../types";
import { ChartWrapper } from "./ChartWrapper";

const DEFAULT_COLORS = [
  "var(--rdg-primary)",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export const PieChartCard: React.FC<{ data: PieChartData }> = ({ data }) => {
  const showLegend = data.showLegend !== false;

  // Side legend items
  const legendItems = data.data.map((entry, i) => (
    <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: entry.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 10,
          color: "var(--rdg-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {entry.label}
      </span>
    </div>
  ));

  return (
    <ChartWrapper
      title={data.title}
      subtitle={data.subtitle}
      legendSide={showLegend}
      legend={showLegend ? <>{legendItems}</> : undefined}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data.data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={data.chartType === "donut" ? "50%" : 0}
            outerRadius="80%"
            paddingAngle={2}
          >
            {data.data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--rdg-card-bg)",
              border: "1px solid var(--rdg-border)",
              borderRadius: 8,
              fontSize: 11,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
