import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChartData } from "../../types";
import { ChartWrapper } from "./ChartWrapper";

export const BarChartCard: React.FC<{ data: BarChartData }> = ({ data }) => {
  const p = data.colors?.primary ?? "var(--rdg-primary)";
  const s = data.colors?.secondary ?? "#22c55e";
  const t = data.colors?.tertiary ?? "#f59e0b";
  const sl = data.seriesLabels;
  const rechartData = data.data.map((d) => ({
    name: d.label,
    [sl?.value ?? "Value"]: d.value,
    ...(d.value2 !== undefined && { [sl?.value2 ?? "Value 2"]: d.value2 }),
    ...(d.value3 !== undefined && { [sl?.value3 ?? "Value 3"]: d.value3 }),
  }));

  return (
    <ChartWrapper title={data.title} subtitle={data.subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rechartData}>
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
          {data.showLegend && <Legend />}
          <Bar
            dataKey={sl?.value ?? "Value"}
            fill={p}
            radius={[4, 4, 0, 0]}
            stackId={data.stacked ? "stack" : undefined}
          />
          {rechartData[0]?.[sl?.value2 ?? "Value 2"] !== undefined && (
            <Bar
              dataKey={sl?.value2 ?? "Value 2"}
              fill={s}
              radius={[4, 4, 0, 0]}
              stackId={data.stacked ? "stack" : undefined}
            />
          )}
          {rechartData[0]?.[sl?.value3 ?? "Value 3"] !== undefined && (
            <Bar
              dataKey={sl?.value3 ?? "Value 3"}
              fill={t}
              radius={[4, 4, 0, 0]}
              stackId={data.stacked ? "stack" : undefined}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
