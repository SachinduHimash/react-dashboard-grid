import React, { useState } from "react";
import { TableColumn } from "../types";

export interface TableData {
  title: string;
  subtitle?: string;
  columns: TableColumn[];
  rows: Record<string, any>[];
  striped?: boolean;
  sortable?: boolean;
  rowsPerPage?: number;
}

export const TableCard: React.FC<{ data: TableData }> = ({ data }) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const perPage = data.rowsPerPage ?? 5;

  const handleSort = (key: string) => {
    if (!data.sortable) return;
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...data.rows].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    if (av == null) return 1;
    if (bv == null) return -1;
    const cmp = av < bv ? -1 : av > bv ? 1 : 0;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const visible = sorted.slice(page * perPage, (page + 1) * perPage);

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
      {/* Header */}
      <div style={{ marginBottom: 12, flexShrink: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--rdg-text)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {data.title}
        </div>
        {data.subtitle && (
          <div
            style={{ fontSize: 12, color: "var(--rdg-muted)", marginTop: 2 }}
          >
            {data.subtitle}
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
          }}
        >
          <thead>
            <tr>
              {data.columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    padding: "6px 8px",
                    textAlign: col.align ?? "left",
                    color: "var(--rdg-muted)",
                    fontWeight: 600,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    borderBottom: "2px solid var(--rdg-border)",
                    cursor: data.sortable ? "pointer" : "default",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    width: col.width,
                  }}
                >
                  {col.label}
                  {data.sortable && sortKey === col.key && (
                    <span style={{ marginLeft: 4 }}>
                      {sortDir === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr
                key={i}
                style={{
                  background:
                    data.striped && i % 2 === 1
                      ? "rgba(0,0,0,0.025)"
                      : "transparent",
                }}
              >
                {data.columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: "8px 8px",
                      color: "var(--rdg-text)",
                      borderBottom: "1px solid var(--rdg-border)",
                      textAlign: col.align ?? "left",
                    }}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : (row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 8,
            marginTop: 10,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12, color: "var(--rdg-muted)" }}>
            {page * perPage + 1}–{Math.min((page + 1) * perPage, sorted.length)}{" "}
            of {sorted.length}
          </span>
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            style={{
              background: "none",
              border: "1px solid var(--rdg-border)",
              borderRadius: 6,
              padding: "2px 8px",
              cursor: page === 0 ? "not-allowed" : "pointer",
              opacity: page === 0 ? 0.4 : 1,
              fontSize: 12,
              color: "var(--rdg-text)",
            }}
          >
            ‹
          </button>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            style={{
              background: "none",
              border: "1px solid var(--rdg-border)",
              borderRadius: 6,
              padding: "2px 8px",
              cursor: page >= totalPages - 1 ? "not-allowed" : "pointer",
              opacity: page >= totalPages - 1 ? 0.4 : 1,
              fontSize: 12,
              color: "var(--rdg-text)",
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};
