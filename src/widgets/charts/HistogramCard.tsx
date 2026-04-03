import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { HistogramData } from "../../types";
import { ChartWrapper } from "./ChartWrapper";

export const HistogramCard: React.FC<{ data: HistogramData }> = ({ data }) => {
  const color = data.colors?.primary ?? "var(--rdg-primary)";
  const rechartData = data.data.map((d) => ({ name: d.label, count: d.value }));

  return (
    <ChartWrapper title={data.title} subtitle={data.subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rechartData} barCategoryGap={2}>
          {data.showGrid !== false && (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--rdg-border)" />
          )}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--rdg-muted)" }}
          />
          <YAxis tick={{ fontSize: 11, fill: "var(--rdg-muted)" }} />
          <Tooltip
            contentStyle={{
              background: "var(--rdg-card-bg)",
              border: "1px solid var(--rdg-border)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Bar dataKey="count" radius={0}>
            {rechartData.map((_, i) => (
              <Cell
                key={i}
                fill={color}
                fillOpacity={0.7 + (i / rechartData.length) * 0.3}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
