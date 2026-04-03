import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChartData } from "../../types";
import { ChartWrapper } from "./ChartWrapper";

export const LineChartCard: React.FC<{ data: LineChartData }> = ({ data }) => {
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
        <LineChart data={rechartData}>
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
          <Line
            type="monotone"
            dataKey={sl?.value ?? "Value"}
            stroke={p}
            strokeWidth={2}
            dot={false}
          />
          {rechartData[0]?.[sl?.value2 ?? "Value 2"] !== undefined && (
            <Line
              type="monotone"
              dataKey={sl?.value2 ?? "Value 2"}
              stroke={s}
              strokeWidth={2}
              dot={false}
            />
          )}
          {rechartData[0]?.[sl?.value3 ?? "Value 3"] !== undefined && (
            <Line
              type="monotone"
              dataKey={sl?.value3 ?? "Value 3"}
              stroke={t}
              strokeWidth={2}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
