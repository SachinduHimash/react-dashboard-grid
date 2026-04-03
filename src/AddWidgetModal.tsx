import React, { useState } from "react";
import { WidgetItem } from "./types";

// ─── SVG Icon set (no emojis) ─────────────────────────────────────────────────
const Icons = {
  BarChart2: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Activity: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  PieChart: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  ),
  List: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Table: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  ),
  Gauge: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 0 1 7.38 16.75" />
      <path d="M12 2a10 10 0 0 0-7.38 16.75" />
      <circle cx="12" cy="12" r="1" />
      <line x1="12" y1="12" x2="16" y2="8" />
    </svg>
  ),
  User: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Layers: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Calendar: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  FileText: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Box: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  Histogram: () => (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="12" width="4" height="8" />
      <rect x="9" y="6" width="4" height="14" />
      <rect x="15" y="9" width="4" height="11" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Search: () => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Plus: () => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  X: () => (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Resize: () => (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 15v6h-6M3 9V3h6M21 3l-7 7M3 21l7-7" />
    </svg>
  ),
};

/**
 * A widget template that a programmer registers. The `component` field
 * accepts a fully-configured WidgetItem (minus the `id`) that will be
 * cloned onto the dashboard when the user clicks "Add Widget".
 */
export interface WidgetTemplate {
  /**
   * Unique key for this template (e.g. "revenue-stat", "sales-line-chart").
   * Used as a stable identifier — does NOT have to match WidgetItem.type.
   */
  key: string;

  /** Human-readable name shown in the modal */
  label: string;

  /** One-sentence description of what this widget shows */
  description: string;

  /**
   * The fully-configured widget that will be added to the dashboard.
   * Omit `id` — a unique id is generated automatically.
   * Example:
   *   component: { type: "stat", size: "small", data: { title: "Revenue", value: "$0" } }
   */
  component: Omit<WidgetItem, "id">;
}

export interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when user clicks "Add Widget" — receives a complete WidgetItem ready for the dashboard */
  onAdd: (widget: WidgetItem) => void;
  /** Programmer-supplied list of templates */
  templates?: WidgetTemplate[];
  primaryColor?: string;
}

// ─── Category mapping ─────────────────────────────────────────────────────────

const TYPE_CATEGORY: Record<string, string> = {
  stat: "Metrics",
  gauge: "Metrics",
  splitstat: "Metrics",
  chart: "Charts",
  line: "Charts",
  bar: "Charts",
  area: "Charts",
  pie: "Charts",
  donut: "Charts",
  histogram: "Charts",
  list: "Display",
  table: "Display",
  text: "Display",
  profile: "Display",
  calendar: "Tools",
  custom: "Custom",
};

function categoryForTemplate(t: WidgetTemplate): string {
  const type = t.component.type;
  if (type === "chart") {
    const chartType = (t.component as any).data?.chartType ?? "";
    return TYPE_CATEGORY[chartType] ?? "Charts";
  }
  return TYPE_CATEGORY[type] ?? "Other";
}

// Icon lookup by widget type
const TYPE_ICON: Record<string, React.FC> = {
  stat: Icons.TrendingUp,
  gauge: Icons.Gauge,
  splitstat: Icons.Layers,
  list: Icons.List,
  table: Icons.Table,
  text: Icons.FileText,
  profile: Icons.User,
  calendar: Icons.Calendar,
  custom: Icons.Box,
};

function iconForTemplate(t: WidgetTemplate): React.FC {
  const type = t.component.type;
  if (type === "chart") {
    const chartType = (t.component as any).data?.chartType ?? "";
    if (chartType === "line" || chartType === "area") return Icons.Activity;
    if (chartType === "pie" || chartType === "donut") return Icons.PieChart;
    if (chartType === "histogram") return Icons.Histogram;
    return Icons.BarChart2;
  }
  return TYPE_ICON[type] ?? Icons.Box;
}

// ─── Size badge labels ─────────────────────────────────────────────────────────
const SIZE_LABELS: Record<string, string> = {
  small: "Small · 3×2",
  medium: "Medium · 6×3",
  large: "Large · 12×4",
};

// ─── Default templates (all widgets showcased) ────────────────────────────────
export const DEFAULT_TEMPLATES: WidgetTemplate[] = [
  {
    key: "stat-default",
    label: "Stat Card",
    description: "A single KPI metric with optional trend indicator and icon.",
    component: {
      type: "stat",
      size: "small",
      data: { title: "New Metric", value: "—", changeType: "neutral" },
    },
  },
  {
    key: "chart-line",
    label: "Line Chart",
    description: "Continuous trend data visualised as a smooth line over time.",
    component: {
      type: "chart",
      size: "medium",
      data: {
        chartType: "line",
        title: "Line Chart",
        data: [
          { label: "Jan", value: 30 },
          { label: "Feb", value: 55 },
          { label: "Mar", value: 40 },
          { label: "Apr", value: 70 },
          { label: "May", value: 60 },
          { label: "Jun", value: 90 },
        ],
      },
    },
  },
  {
    key: "chart-bar",
    label: "Bar Chart",
    description:
      "Compare discrete values across categories with vertical bars.",
    component: {
      type: "chart",
      size: "medium",
      data: {
        chartType: "bar",
        title: "Bar Chart",
        data: [
          { label: "Q1", value: 120 },
          { label: "Q2", value: 180 },
          { label: "Q3", value: 150 },
          { label: "Q4", value: 210 },
        ],
      },
    },
  },
  {
    key: "chart-area",
    label: "Area Chart",
    description:
      "Line chart with a filled area — great for volume or cumulative data.",
    component: {
      type: "chart",
      size: "medium",
      data: {
        chartType: "area",
        title: "Area Chart",
        data: [
          { label: "Mon", value: 20 },
          { label: "Tue", value: 45 },
          { label: "Wed", value: 35 },
          { label: "Thu", value: 60 },
          { label: "Fri", value: 80 },
          { label: "Sat", value: 55 },
        ],
      },
    },
  },
  {
    key: "chart-pie",
    label: "Donut Chart",
    description: "Show part-to-whole proportions across categories.",
    component: {
      type: "chart",
      size: "medium",
      data: {
        chartType: "donut",
        title: "Donut Chart",
        data: [
          { label: "Direct", value: 40 },
          { label: "Organic", value: 30 },
          { label: "Referral", value: 20 },
          { label: "Social", value: 10 },
        ],
      },
    },
  },
  {
    key: "chart-histogram",
    label: "Histogram",
    description: "Frequency distribution of continuous data across bins.",
    component: {
      type: "chart",
      size: "medium",
      data: {
        chartType: "histogram",
        title: "Histogram",
        data: [
          { label: "0–10", value: 5 },
          { label: "10–20", value: 12 },
          { label: "20–30", value: 20 },
          { label: "30–40", value: 15 },
          { label: "40–50", value: 8 },
        ],
      },
    },
  },
  {
    key: "list-default",
    label: "List",
    description: "Labelled rows with optional value, badge, and icon columns.",
    component: {
      type: "list",
      size: "medium",
      data: {
        title: "New List",
        items: [
          { id: "1", label: "Item one", value: "—" },
          { id: "2", label: "Item two", value: "—" },
          { id: "3", label: "Item three", value: "—" },
        ],
      },
    },
  },
  {
    key: "table-default",
    label: "Data Table",
    description: "Sortable, paginated rows — ideal for dense tabular data.",
    component: {
      type: "table",
      size: "large",
      data: {
        title: "Data Table",
        columns: [
          { key: "name", label: "Name" },
          { key: "value", label: "Value", align: "right" },
        ],
        rows: [],
        sortable: true,
        striped: true,
      },
    },
  },
  {
    key: "gauge-default",
    label: "Gauge",
    description: "Semicircle gauge showing a percentage fill with a needle.",
    component: {
      type: "gauge",
      size: "small",
      data: {
        title: "New Gauge",
        value: "75%",
        percentage: 75,
      },
    },
  },
  {
    key: "profile-default",
    label: "Profile Card",
    description: "User avatar, name, email, role badge and optional stat row.",
    component: {
      type: "profile",
      size: "medium",
      data: {
        name: "New User",
        role: "Member",
        email: "newUser@user.com",
        avatarEmoji: "👤",
        stats: [
          { label: "Posts", value: 12 },
          { label: "Followers", value: 120 },
        ],
      },
    },
  },
  {
    key: "splitstat-default",
    label: "Split Progress",
    description: "Main value with a multi-segment stacked progress bar.",
    component: {
      type: "splitstat",
      size: "small",
      data: {
        title: "Split Stat",
        value: "100",
        segments: [
          { label: "A", percentage: 40, color: "#6366f1" },
          { label: "B", percentage: 35, color: "#22c55e" },
          { label: "C", percentage: 25, color: "#f59e0b" },
        ],
      },
    },
  },
  {
    key: "calendar-default",
    label: "Calendar",
    description: "Monthly calendar with event dot indicators per day.",
    component: {
      type: "calendar",
      size: "medium",
      data: {
        title: "Calendar",
        events: [],
        highlightToday: true,
      },
    },
  },
  {
    key: "text-default",
    label: "Text Block",
    description:
      "Free-form text card — ideal for notes, announcements, or labels.",
    component: {
      type: "text",
      size: "small",
      data: {
        title: "Note",
        body: "Add your text here.",
      },
    },
  },
];

// ─── Modal component ──────────────────────────────────────────────────────────

let _idCounter = 1000;
function genId(): string {
  return `widget-${Date.now()}-${++_idCounter}`;
}

export const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  templates = DEFAULT_TEMPLATES,
  primaryColor = "#6366f1",
}) => {
  const [selected, setSelected] = useState<WidgetTemplate | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const reset = () => {
    setSelected(null);
    setSearch("");
    setActiveCategory(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = () => {
    if (!selected) return;
    const widget: WidgetItem = {
      ...selected.component,
      id: genId(),
    } as WidgetItem;
    onAdd(widget);
    reset();
    onClose();
  };

  const categories = Array.from(new Set(templates.map(categoryForTemplate)));

  const filtered = templates.filter((t) => {
    const matchSearch =
      !search ||
      t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      !activeCategory || categoryForTemplate(t) === activeCategory;
    return matchSearch && matchCat;
  });

  if (!isOpen) return null;

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid var(--rdg-border, #e5e7eb)",
    fontSize: 13,
    color: "var(--rdg-text, #111827)",
    background: "var(--rdg-card-bg, #fff)",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          background: "var(--rdg-card-bg, #fff)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 720,
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
          overflow: "hidden",
          fontFamily: "var(--rdg-font, system-ui, sans-serif)",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            padding: "20px 24px 14px",
            borderBottom: "1px solid var(--rdg-border, #e5e7eb)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "var(--rdg-text, #111827)",
              }}
            >
              Add Widget
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--rdg-muted, #6b7280)",
                marginTop: 2,
              }}
            >
              Select a widget to add to your dashboard
            </div>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "var(--rdg-bg, #f4f5f7)",
              border: "1px solid var(--rdg-border, #e5e7eb)",
              cursor: "pointer",
              color: "var(--rdg-muted, #6b7280)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              padding: 0,
            }}
          >
            <Icons.X />
          </button>
        </div>

        {/* ── Search + category tabs ── */}
        <div
          style={{
            padding: "12px 24px",
            borderBottom: "1px solid var(--rdg-border, #e5e7eb)",
            flexShrink: 0,
            background: "var(--rdg-bg, #f9fafb)",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 10 }}>
            <span
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--rdg-muted, #9ca3af)",
                display: "flex",
                pointerEvents: "none",
              }}
            >
              <Icons.Search />
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search widgets…"
              style={{ ...inputBase, paddingLeft: 34 }}
              onFocus={(e) => (e.target.style.borderColor = primaryColor)}
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--rdg-border, #e5e7eb)")
              }
            />
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[null, ...categories].map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat ?? "__all__"}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${active ? primaryColor : "var(--rdg-border, #e5e7eb)"}`,
                    background: active
                      ? primaryColor
                      : "var(--rdg-card-bg, #fff)",
                    color: active ? "#fff" : "var(--rdg-muted, #6b7280)",
                    transition: "all 0.12s",
                  }}
                >
                  {cat ?? "All"}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Body: widget grid + detail pane ── */}
        <div
          style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden" }}
        >
          {/* Left: widget grid */}
          <div
            style={{
              flex: "0 0 55%",
              overflowY: "auto",
              padding: "16px 20px",
              borderRight: "1px solid var(--rdg-border, #e5e7eb)",
            }}
          >
            {filtered.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 180,
                  color: "var(--rdg-muted, #6b7280)",
                  gap: 8,
                  textAlign: "center",
                }}
              >
                <Icons.Search />
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  No widgets found
                </div>
                <div style={{ fontSize: 12 }}>
                  Try a different search term or category
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 8,
                }}
              >
                {filtered.map((t) => {
                  const isActive = selected?.key === t.key;
                  const Icon = iconForTemplate(t);
                  const cat = categoryForTemplate(t);
                  return (
                    <div
                      key={t.key}
                      onClick={() => setSelected(t)}
                      style={{
                        padding: "12px",
                        borderRadius: 10,
                        cursor: "pointer",
                        border: `1.5px solid ${isActive ? primaryColor : "var(--rdg-border, #e5e7eb)"}`,
                        background: isActive
                          ? `color-mix(in srgb, ${primaryColor} 8%, var(--rdg-card-bg, #fff))`
                          : "var(--rdg-card-bg, #fff)",
                        transition: "all 0.12s",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      {/* Check badge */}
                      {isActive && (
                        <div
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            background: primaryColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                          }}
                        >
                          <Icons.Check />
                        </div>
                      )}

                      {/* Icon */}
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: isActive
                            ? `color-mix(in srgb, ${primaryColor} 15%, transparent)`
                            : "var(--rdg-bg, #f4f5f7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isActive
                            ? primaryColor
                            : "var(--rdg-muted, #6b7280)",
                        }}
                      >
                        <Icon />
                      </div>

                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--rdg-text, #111827)",
                        }}
                      >
                        {t.label}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--rdg-muted, #6b7280)",
                          lineHeight: 1.4,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {t.description}
                      </div>

                      {/* Category chip */}
                      <div
                        style={{
                          alignSelf: "flex-start",
                          fontSize: 10,
                          fontWeight: 600,
                          padding: "2px 7px",
                          borderRadius: 99,
                          background: "var(--rdg-bg, #f4f5f7)",
                          color: "var(--rdg-muted, #6b7280)",
                          marginTop: 2,
                        }}
                      >
                        {cat}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: detail pane */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {!selected ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--rdg-muted, #6b7280)",
                  textAlign: "center",
                  gap: 12,
                  padding: "40px 20px",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "var(--rdg-bg, #f4f5f7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--rdg-border, #d1d5db)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--rdg-text, #374151)",
                  }}
                >
                  Select a widget
                </div>
                <div style={{ fontSize: 12, lineHeight: 1.5, maxWidth: 180 }}>
                  Choose from the grid to see its details and add it to your
                  dashboard.
                </div>
              </div>
            ) : (
              <>
                {/* Selected widget header */}
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: `color-mix(in srgb, ${primaryColor} 8%, var(--rdg-bg, #f4f5f7))`,
                    border: `1px solid color-mix(in srgb, ${primaryColor} 20%, transparent)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: `color-mix(in srgb, ${primaryColor} 15%, white)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: primaryColor,
                      flexShrink: 0,
                    }}
                  >
                    {React.createElement(iconForTemplate(selected))}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "var(--rdg-text, #111827)",
                      }}
                    >
                      {selected.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--rdg-muted, #6b7280)",
                        marginTop: 2,
                        lineHeight: 1.4,
                      }}
                    >
                      {selected.description}
                    </div>
                  </div>
                </div>

                {/* Widget details */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <DetailRow
                    label="Category"
                    value={categoryForTemplate(selected)}
                  />
                  <DetailRow
                    label="Default size"
                    value={
                      SIZE_LABELS[selected.component.size ?? "medium"] ??
                      selected.component.size ??
                      "medium"
                    }
                    icon={<Icons.Resize />}
                  />
                  {selected.component.resizable && (
                    <DetailRow label="Resizable" value="Yes" />
                  )}
                </div>

                <div style={{ flex: 1 }} />

                <div
                  style={{
                    fontSize: 11,
                    color: "var(--rdg-muted, #6b7280)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Icons.Resize />
                  {`You can drag${selected.component.resizable ? ", resize" : ""} and rearrange after adding.`}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: "1px solid var(--rdg-border, #e5e7eb)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
            background: "var(--rdg-bg, #f9fafb)",
          }}
        >
          <span style={{ fontSize: 12, color: "var(--rdg-muted, #6b7280)" }}>
            {filtered.length} widget{filtered.length !== 1 ? "s" : ""} available
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleClose}
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                border: "1px solid var(--rdg-border, #e5e7eb)",
                background: "transparent",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--rdg-text, #111827)",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!selected}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                border: "none",
                background: selected
                  ? primaryColor
                  : "var(--rdg-border, #e5e7eb)",
                fontSize: 13,
                fontWeight: 600,
                color: selected ? "#fff" : "var(--rdg-muted, #6b7280)",
                cursor: selected ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                transition: "background 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icons.Plus />
              Add to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Small helper ─────────────────────────────────────────────────────────────
const DetailRow: React.FC<{
  label: string;
  value: string;
  icon?: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "7px 10px",
      borderRadius: 7,
      background: "var(--rdg-bg, #f9fafb)",
      border: "1px solid var(--rdg-border, #e5e7eb)",
    }}
  >
    <span
      style={{
        fontSize: 12,
        color: "var(--rdg-muted, #6b7280)",
        fontWeight: 500,
      }}
    >
      {label}
    </span>
    <span
      style={{
        fontSize: 12,
        color: "var(--rdg-text, #111827)",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {icon}
      {value}
    </span>
  </div>
);
