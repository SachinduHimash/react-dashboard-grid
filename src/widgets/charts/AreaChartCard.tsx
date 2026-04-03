import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AreaChartData } from "../../types";
import { ChartWrapper } from "./ChartWrapper";

export const AreaChartCard: React.FC<{ data: AreaChartData }> = ({ data }) => {
  const p = data.colors?.primary ?? "var(--rdg-primary)";
  const s = data.colors?.secondary ?? "#22c55e";
  const sl = data.seriesLabels;
  const rechartData = data.data.map((d) => ({
    name: d.label,
    [sl?.value ?? "Value"]: d.value,
    ...(d.value2 !== undefined && { [sl?.value2 ?? "Value 2"]: d.value2 }),
  }));

  return (
    <ChartWrapper title={data.title} subtitle={data.subtitle}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rechartData}>
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={p} stopOpacity={0.3} />
              <stop offset="95%" stopColor={p} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s} stopOpacity={0.3} />
              <stop offset="95%" stopColor={s} stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey={sl?.value ?? "Value"}
            stroke={p}
            fill="url(#grad1)"
            strokeWidth={2}
            stackId={data.stacked ? "stack" : undefined}
          />
          {rechartData[0]?.[sl?.value2 ?? "Value 2"] !== undefined && (
            <Area
              type="monotone"
              dataKey={sl?.value2 ?? "Value 2"}
              stroke={s}
              fill="url(#grad2)"
              strokeWidth={2}
              stackId={data.stacked ? "stack" : undefined}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
