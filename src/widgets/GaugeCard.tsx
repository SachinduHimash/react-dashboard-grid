import React from "react";

export interface GaugeData {
  title: string;
  subtitle?: string;
  value: string | number;
  label?: string;
  percentage: number; // 0–100
  changeText?: string;
  color?: string;
}

const GaugeSVG: React.FC<{ percentage: number; color: string }> = ({
  percentage,
  color,
}) => {
  const cx = 110;
  const cy = 100;
  const r = 80;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const polarToCartesian = (deg: number) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy + r * Math.sin(toRad(deg)),
  });

  const startDeg = 180;
  const totalDeg = 180;

  const trackStart = polarToCartesian(startDeg); // left tip
  const trackEnd = polarToCartesian(startDeg + totalDeg); // right tip

  const fillSweep = (percentage / 100) * totalDeg;
  const fillEnd = polarToCartesian(startDeg + fillSweep);
  const fillLargeArc = fillSweep > 180 ? 1 : 0;

  const needleAngle = startDeg + (percentage / 100) * totalDeg;
  const needleTip = {
    x: cx + (r - 12) * Math.cos(toRad(needleAngle)),
    y: cy + (r - 12) * Math.sin(toRad(needleAngle)),
  };

  // Min/max label positions slightly inside the arc ends
  const minLabel = polarToCartesian(startDeg + 8);
  const maxLabel = polarToCartesian(startDeg + totalDeg - 8);

  return (
    <svg
      viewBox="0 0 220 105"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      {/* Background track */}
      <path
        d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 0 1 ${trackEnd.x} ${trackEnd.y}`}
        fill="none"
        stroke="var(--rdg-border, #e2e8f0)"
        strokeWidth={14}
        strokeLinecap="round"
      />

      {/* Filled arc */}
      {percentage > 0 && (
        <path
          d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${fillLargeArc} 1 ${fillEnd.x} ${fillEnd.y}`}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
        />
      )}

      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={needleTip.x}
        y2={needleTip.y}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={5} fill={color} />

      {/* 0 / 100 labels */}
      <text
        x={minLabel.x - 15}
        y={minLabel.y + 15}
        textAnchor="end"
        fontSize={10}
        fill="var(--rdg-muted, #94a3b8)"
        fontFamily="inherit"
      >
        0
      </text>
      <text
        x={maxLabel.x + 15}
        y={maxLabel.y + 15}
        textAnchor="start"
        fontSize={10}
        fill="var(--rdg-muted, #94a3b8)"
        fontFamily="inherit"
      >
        100
      </text>

      {/* Percentage label centred below needle pivot */}
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fontSize={13}
        fontWeight={700}
        fill="var(--rdg-text, #1a202c)"
        fontFamily="inherit"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export const GaugeCard: React.FC<{ data: GaugeData }> = ({ data }) => {
  const color = data.color ?? "var(--rdg-primary, #6366f1)";
  const pct = Math.min(100, Math.max(0, data.percentage));

  return (
    <div
      style={{
        padding: "16px 20px 12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "var(--rdg-text)",
          textTransform: "uppercase",
          marginBottom: 2,
        }}
      >
        {data.title}
      </div>

      {/* Subtitle */}
      {data.subtitle && (
        <div
          style={{ fontSize: 12, color: "var(--rdg-muted)", marginBottom: 4 }}
        >
          {data.subtitle}
        </div>
      )}

      {/* Value */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "var(--rdg-text)",
          lineHeight: 1.1,
        }}
      >
        {data.value}
      </div>

      {/* Change text */}
      {data.changeText && (
        <div style={{ fontSize: 12, color: "var(--rdg-muted)", marginTop: 2 }}>
          {data.changeText}
        </div>
      )}

      {/* Gauge — takes all remaining space */}
      <div style={{ flex: 1, minHeight: 0, marginTop: 8 }}>
        <GaugeSVG percentage={pct} color={color} />
      </div>
    </div>
  );
};
