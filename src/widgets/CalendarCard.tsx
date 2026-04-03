import React, { useState } from "react";
import { CalendarEvent } from "../types";

export interface CalendarData {
  title?: string;
  events?: CalendarEvent[];
  onDateSelect?: (date: string) => void;
  highlightToday?: boolean;
  primaryColor?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CalendarCard: React.FC<{ data: CalendarData }> = ({ data }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const primary = data.primaryColor ?? "var(--rdg-primary)";

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const eventMap: Record<string, CalendarEvent[]> = {};
  (data.events ?? []).forEach((ev) => {
    if (!eventMap[ev.date]) eventMap[ev.date] = [];
    eventMap[ev.date].push(ev);
  });

  const toKey = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const todayKey = toKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const navigate = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  return (
    <div
      style={{
        padding: "16px 20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      {data.title && (
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--rdg-text)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 12,
            flexShrink: 0,
          }}
        >
          {data.title}
        </div>
      )}

      {/* Month nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--rdg-muted)",
            fontSize: 16,
            padding: "0 4px",
          }}
        >
          ‹
        </button>
        <div
          style={{ fontSize: 14, fontWeight: 600, color: "var(--rdg-text)" }}
        >
          {MONTHS[viewMonth]} {viewYear}
        </div>
        <button
          onClick={() => navigate(1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--rdg-muted)",
            fontSize: 16,
            padding: "0 4px",
          }}
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px 0",
          flexShrink: 0,
          marginBottom: 2,
        }}
      >
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "var(--rdg-muted)",
              fontWeight: 600,
              padding: "2px 0",
              textTransform: "uppercase",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2,
          flex: 1,
          minHeight: 0,
        }}
      >
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const key = toKey(viewYear, viewMonth, day);
          const isToday = key === todayKey && data.highlightToday !== false;
          const isSelected = key === selected;
          const evs = eventMap[key] ?? [];

          return (
            <div
              key={key}
              onClick={() => {
                setSelected(key);
                data.onDateSelect?.(key);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: 6,
                padding: "3px 0",
                background: isSelected
                  ? primary
                  : isToday
                    ? `color-mix(in srgb, ${primary} 15%, transparent)`
                    : "transparent",
                border:
                  isToday && !isSelected
                    ? `1px solid ${primary}`
                    : "1px solid transparent",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: isToday || isSelected ? 700 : 400,
                  color: isSelected
                    ? "#fff"
                    : isToday
                      ? primary
                      : "var(--rdg-text)",
                }}
              >
                {day}
              </span>
              {evs.length > 0 && (
                <div style={{ display: "flex", gap: 2, marginTop: 1 }}>
                  {evs.slice(0, 3).map((ev, j) => (
                    <div
                      key={j}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: ev.color ?? primary,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected event info */}
      {selected && eventMap[selected]?.length > 0 && (
        <div
          style={{
            marginTop: 10,
            flexShrink: 0,
            borderTop: "1px solid var(--rdg-border)",
            paddingTop: 8,
          }}
        >
          {eventMap[selected].map((ev, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: ev.color ?? primary,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 12, color: "var(--rdg-text)" }}>
                {ev.label ?? selected}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
