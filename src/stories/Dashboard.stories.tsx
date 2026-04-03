import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "../Dashboard";
import type { WidgetItem, DashboardTheme } from "../types";
import type { WidgetTemplate } from "../AddWidgetModal";
import { DEFAULT_TEMPLATES } from "../AddWidgetModal";

// ─── Shared mock data ─────────────────────────────────────────────────────────

const lineData = [
  { label: "Jan", value: 42000, value2: 28000 },
  { label: "Feb", value: 58000, value2: 35000 },
  { label: "Mar", value: 51000, value2: 41000 },
  { label: "Apr", value: 74000, value2: 52000 },
  { label: "May", value: 69000, value2: 48000 },
  { label: "Jun", value: 91000, value2: 63000 },
  { label: "Jul", value: 88000, value2: 70000 },
  { label: "Aug", value: 105000, value2: 79000 },
];

const barData = [
  { label: "Q1", value: 120, value2: 80 },
  { label: "Q2", value: 180, value2: 110 },
  { label: "Q3", value: 150, value2: 130 },
  { label: "Q4", value: 210, value2: 160 },
];

const pieData = [
  { label: "Organic", value: 40, color: "#6366f1" },
  { label: "Direct", value: 25, color: "#22c55e" },
  { label: "Referral", value: 20, color: "#f59e0b" },
  { label: "Social", value: 15, color: "#e11d48" },
];

const areaData = [
  { label: "Mon", value: 3200 },
  { label: "Tue", value: 4800 },
  { label: "Wed", value: 4200 },
  { label: "Thu", value: 6100 },
  { label: "Fri", value: 7800 },
  { label: "Sat", value: 5400 },
  { label: "Sun", value: 3900 },
];

const histogramData = [
  { label: "0–10", value: 8 },
  { label: "10–20", value: 18 },
  { label: "20–30", value: 32 },
  { label: "30–40", value: 41 },
  { label: "40–50", value: 35 },
  { label: "50–60", value: 22 },
  { label: "60–70", value: 14 },
  { label: "70–80", value: 7 },
];

const tableRows = [
  {
    id: "#1001",
    customer: "Alice Johnson",
    product: "Pro Plan",
    total: 299,
    status: "Paid",
  },
  {
    id: "#1002",
    customer: "Bob Chen",
    product: "Starter",
    total: 49,
    status: "Pending",
  },
  {
    id: "#1003",
    customer: "Clara Davis",
    product: "Enterprise",
    total: 999,
    status: "Paid",
  },
  {
    id: "#1004",
    customer: "Dan Park",
    product: "Pro Plan",
    total: 299,
    status: "Overdue",
  },
  {
    id: "#1005",
    customer: "Eva Martinez",
    product: "Starter",
    total: 49,
    status: "Paid",
  },
  {
    id: "#1006",
    customer: "Felix Wang",
    product: "Pro Plan",
    total: 299,
    status: "Paid",
  },
  {
    id: "#1007",
    customer: "Grace Kim",
    product: "Enterprise",
    total: 999,
    status: "Paid",
  },
  {
    id: "#1008",
    customer: "Henry Obi",
    product: "Starter",
    total: 49,
    status: "Pending",
  },
];

// ─── Story meta ────────────────────────────────────────────────────────────────

const meta: Meta<typeof Dashboard> = {
  title: "Dashboard",
  component: Dashboard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A drag-and-drop dashboard with a rich widget library, theming, and a built-in Add Widget modal.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

// ─── Helper to render status badges ──────────────────────────────────────────
const StatusCell = (v: string) => {
  const colors: Record<string, string> = {
    Paid: "#22c55e",
    Pending: "#f59e0b",
    Overdue: "#ef4444",
  };
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 99,
        background: colors[v] ?? "#6b7280",
        color: "#fff",
      }}
    >
      {v}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 1 — "All Widgets" — Indigo/Light (default theme)
// Shows every single widget type available
// ═══════════════════════════════════════════════════════════════════════════════

const allWidgetsItems: WidgetItem[] = [
  // ── Row 1: Stat cards ────────────────────────────────────────────────────
  {
    id: "s1",
    type: "stat",
    size: "small",
    layout: { x: 0, y: 0 },
    data: {
      title: "Monthly Revenue",
      value: "$124,500",
      change: "+8.2% vs last month",
      changeType: "up",
    },
  },
  {
    id: "s2",
    type: "stat",
    size: "small",
    layout: { x: 3, y: 0 },
    data: {
      title: "Active Users",
      value: "32,104",
      change: "+1,204 new",
      changeType: "up",
    },
  },
  {
    id: "s3",
    type: "stat",
    size: "small",
    layout: { x: 6, y: 0 },
    data: {
      title: "Churn Rate",
      value: "2.4%",
      change: "+0.3% this quarter",
      changeType: "down",
    },
  },
  {
    id: "s4",
    type: "stat",
    size: "small",
    layout: { x: 9, y: 0 },
    data: {
      title: "Avg. Session",
      value: "4m 32s",
      change: "no change",
      changeType: "neutral",
    },
  },

  // ── Row 2: Line chart + donut + profile ───────────────────────────────────
  {
    id: "c1",
    type: "chart",
    size: "medium",
    layout: { x: 0, y: 2 },
    data: {
      chartType: "line",
      title: "Revenue vs Costs",
      subtitle: "Jan–Aug 2024",
      showGrid: true,
      showLegend: true,
      seriesLabels: { value: "Revenue", value2: "Costs" },
      data: lineData,
      colors: { primary: "#6366f1", secondary: "#f59e0b" },
    },
  },
  {
    id: "c2",
    type: "chart",
    size: "medium",
    layout: { x: 6, y: 2 },
    data: {
      chartType: "donut",
      title: "Traffic Sources",
      showLegend: true,
      data: pieData,
    },
  },

  // ── Row 3: Bar + area + gauge + profile ───────────────────────────────────
  {
    id: "c3",
    type: "chart",
    size: "medium",
    layout: { x: 0, y: 5 },
    data: {
      chartType: "bar",
      title: "Quarterly Performance",
      showLegend: true,
      seriesLabels: { value: "New ARR", value2: "Expansion" },
      data: barData,
      colors: { primary: "#6366f1", secondary: "#22c55e" },
    },
  },
  {
    id: "c4",
    type: "chart",
    size: "medium",
    layout: { x: 6, y: 5 },
    data: {
      chartType: "area",
      title: "Daily Active Users",
      subtitle: "This week",
      data: areaData,
      colors: { primary: "#6366f1" },
    },
  },

  // ── Row 4: Gauge + profile + splitstat + calendar ────────────────────────
  {
    id: "g1",
    type: "gauge",
    size: "small",
    layout: { x: 0, y: 8 },
    data: {
      title: "NPS Score",
      subtitle: "User satisfaction",
      value: "72",
      percentage: 16,
      changeText: "↑4 pts this quarter",
      color: "#6366f1",
    },
  },
  {
    id: "p1",
    type: "profile",
    size: "small",
    layout: { x: 3, y: 8 },
    data: {
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "Senior Engineer",
      badgeColor: "#6366f1",
      avatarEmoji: "SC",
      stats: [
        { label: "PRs", value: 142 },
        { label: "Reviews", value: 89 },
        { label: "Issues", value: 24 },
      ],
    },
  },
  {
    id: "sp1",
    type: "splitstat",
    size: "small",
    layout: { x: 6, y: 8 },
    data: {
      title: "Storage Used",
      titleAction: "Manage",
      value: "284",
      unit: "GB",
      minValue: "0 GB",
      maxValue: "500 GB",
      segments: [
        { label: "Documents", percentage: 40, color: "#6366f1" },
        { label: "Media", percentage: 35, color: "#22c55e" },
        { label: "Backups", percentage: 25, color: "#f59e0b" },
      ],
    },
  },
  {
    id: "cal1",
    type: "calendar",
    size: "small",
    layout: { x: 9, y: 8 },
    data: {
      title: "Upcoming",
      highlightToday: true,
      primaryColor: "#6366f1",
      events: [
        { date: "2025-04-10", label: "Sprint Review", color: "#6366f1" },
        { date: "2025-04-15", label: "Release", color: "#22c55e" },
        { date: "2025-04-22", label: "All Hands", color: "#f59e0b" },
      ],
    },
  },

  // ── Row 5: Histogram + list + text ───────────────────────────────────────
  {
    id: "hist1",
    type: "chart",
    size: "medium",
    layout: { x: 0, y: 10 },
    data: {
      chartType: "histogram",
      title: "Response Time Distribution",
      subtitle: "p50 / p95 / p99",
      data: histogramData,
      colors: { primary: "#6366f1" },
    },
  },
  {
    id: "li1",
    type: "list",
    size: "medium",
    layout: { x: 6, y: 10 },
    data: {
      title: "Top Pages",
      items: [
        {
          id: "a",
          label: "/home",
          value: "12,400 views",
          badge: "↑8%",
          badgeColor: "#22c55e",
        },
        {
          id: "b",
          label: "/pricing",
          value: "8,200 views",
          badge: "↓2%",
          badgeColor: "#ef4444",
        },
        {
          id: "c",
          label: "/docs",
          value: "5,600 views",
          badge: "stable",
          badgeColor: "#94a3b8",
        },
        {
          id: "d",
          label: "/blog",
          value: "3,100 views",
          badge: "↑12%",
          badgeColor: "#22c55e",
        },
        { id: "e", label: "/changelog", value: "1,800 views" },
      ],
    },
  },

  // ── Row 6: Large table ────────────────────────────────────────────────────
  {
    id: "t1",
    type: "table",
    size: "large",
    layout: { x: 0, y: 13 },
    data: {
      title: "Recent Orders",
      subtitle: "Last 30 days",
      sortable: true,
      striped: true,
      rowsPerPage: 5,
      columns: [
        { key: "id", label: "Order ID", width: 90 },
        { key: "customer", label: "Customer" },
        { key: "product", label: "Product" },
        {
          key: "total",
          label: "Total",
          align: "right",
          render: (v: number) => `$${v}`,
        },
        { key: "status", label: "Status", render: StatusCell },
      ],
      rows: tableRows,
    },
  },

  // ── Row 7: Text + pie ────────────────────────────────────────────────────
  {
    id: "tx1",
    type: "text",
    size: "small",
    layout: { x: 0, y: 17 },
    data: {
      title: "Weekly Highlight",
      body: "Revenue hit an all-time high in August. The team shipped 4 major features and resolved 23 bugs. Next sprint focuses on onboarding improvements.",
    },
  },
  {
    id: "pie1",
    type: "chart",
    size: "medium",
    layout: { x: 3, y: 17 },
    data: {
      chartType: "pie",
      title: "Revenue by Plan",
      showLegend: true,
      data: [
        { label: "Enterprise", value: 55, color: "#6366f1" },
        { label: "Pro", value: 30, color: "#22c55e" },
        { label: "Starter", value: 15, color: "#f59e0b" },
      ],
    },
  },
];

export const AllWidgets: Story = {
  name: "1 · All Widgets (Default Indigo Theme)",
  args: {
    title: "react-dashboard-grid",
    subtitle:
      "Every widget type in one view - drag, resize, add more via the modal",
    items: allWidgetsItems,
    showAddWidget: true,
    showEditLayout: true,
    showSearch: true,
    theme: {
      primaryColor: "#6366f1",
      backgroundColor: "#f4f5f7",
      cardBackground: "#ffffff",
      borderRadius: "12px",
      textColor: "#111827",
      mutedColor: "#6b7280",
      borderColor: "#e5e7eb",
      fontFamily: "'Inter', system-ui, sans-serif",
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 2 — Dark Slate / Deep Navy
// Executive analytics board — dark, dense, data-forward
// ═══════════════════════════════════════════════════════════════════════════════

const darkTheme: DashboardTheme = {
  primaryColor: "#818cf8",
  backgroundColor: "#0f172a",
  cardBackground: "#1e293b",
  borderRadius: "14px",
  textColor: "#f1f5f9",
  mutedColor: "#94a3b8",
  borderColor: "#334155",
  fontFamily: "'DM Sans', system-ui, sans-serif",
};

const darkItems: WidgetItem[] = [
  {
    id: "d1",
    type: "stat",
    size: "small",
    layout: { x: 0, y: 0 },
    data: {
      title: "ARR",
      value: "$2.4M",
      change: "+22% YoY",
      changeType: "up",
    },
  },
  {
    id: "d2",
    type: "stat",
    size: "small",
    layout: { x: 3, y: 0 },
    data: { title: "MRR", value: "$198k", change: "+4.1%", changeType: "up" },
  },
  {
    id: "d3",
    type: "stat",
    size: "small",
    layout: { x: 6, y: 0 },
    data: {
      title: "Logo Churn",
      value: "1.8%",
      change: "−0.4%",
      changeType: "up",
    },
  },
  {
    id: "d4",
    type: "stat",
    size: "small",
    layout: { x: 9, y: 0 },
    data: {
      title: "Expansion MRR",
      value: "$42k",
      change: "+$6k MoM",
      changeType: "up",
    },
  },
  {
    id: "d5",
    type: "chart",
    size: "large",
    resizable: true,
    layout: { x: 0, y: 2 },
    data: {
      chartType: "area",
      title: "ARR Growth",
      subtitle: "2024 - trailing 8 months",
      showGrid: true,
      showLegend: true,
      seriesLabels: { value: "New ARR", value2: "Expansion" },
      data: lineData,
      colors: { primary: "#818cf8", secondary: "#34d399" },
    },
  },
  {
    id: "d6",
    type: "gauge",
    size: "small",
    layout: { x: 0, y: 6 },
    data: {
      title: "Quota Attainment",
      value: "84%",
      percentage: 84,
      changeText: "↑12% vs Q2",
      color: "#818cf8",
    },
  },
  {
    id: "d7",
    type: "splitstat",
    size: "small",
    layout: { x: 3, y: 6 },
    data: {
      title: "ARR by Segment",
      value: "$2.4M",
      segments: [
        { label: "Enterprise", percentage: 55, color: "#818cf8" },
        { label: "Mid-Market", percentage: 30, color: "#34d399" },
        { label: "SMB", percentage: 15, color: "#fb923c" },
      ],
    },
  },
  {
    id: "d8",
    type: "chart",
    size: "medium",
    layout: { x: 6, y: 6 },
    data: {
      chartType: "bar",
      title: "New Logos by Quarter",
      showGrid: true,
      data: barData,
      colors: { primary: "#818cf8", secondary: "#34d399" },
    },
  },
  {
    id: "d9",
    type: "chart",
    size: "medium",
    layout: { x: 0, y: 9 },
    data: {
      chartType: "donut",
      title: "Revenue by Vertical",
      showLegend: true,
      data: [
        { label: "SaaS", value: 45, color: "#818cf8" },
        { label: "FinTech", value: 25, color: "#34d399" },
        { label: "Healthcare", value: 18, color: "#fb923c" },
        { label: "Other", value: 12, color: "#f43f5e" },
      ],
    },
  },
  {
    id: "d10",
    type: "table",
    size: "medium",
    layout: { x: 6, y: 9 },
    data: {
      title: "Top Accounts",
      sortable: true,
      striped: true,
      rowsPerPage: 4,
      columns: [
        { key: "customer", label: "Account" },
        { key: "product", label: "Plan" },
        {
          key: "total",
          label: "ARR",
          align: "right",
          render: (v: number) => `$${v.toLocaleString()}`,
        },
        { key: "status", label: "Health", render: StatusCell },
      ],
      rows: tableRows,
    },
  },
  {
    id: "d11",
    type: "list",
    size: "medium",
    layout: { x: 0, y: 12 },
    data: {
      title: "Recent Deals",
      items: [
        {
          id: "1",
          label: "Acme Corp",
          value: "$120k ARR",
          badge: "Closed Won",
          badgeColor: "#22c55e",
        },
        {
          id: "2",
          label: "Globex Ltd",
          value: "$48k ARR",
          badge: "Negotiation",
          badgeColor: "#f59e0b",
        },
        {
          id: "3",
          label: "Initech",
          value: "$240k ARR",
          badge: "Proposal",
          badgeColor: "#818cf8",
        },
        {
          id: "4",
          label: "Umbrella Inc",
          value: "$18k ARR",
          badge: "Discovery",
          badgeColor: "#94a3b8",
        },
      ],
    },
  },
  {
    id: "d12",
    type: "chart",
    size: "medium",
    layout: { x: 6, y: 12 },
    data: {
      chartType: "histogram",
      title: "Deal Size Distribution",
      data: histogramData,
      colors: { primary: "#818cf8" },
    },
  },
];

export const DarkSlate: Story = {
  name: "2 · Dark Navy - Executive Analytics",
  args: {
    title: "Revenue Intelligence",
    subtitle: "Board-level view · FY 2024",
    items: darkItems,
    showAddWidget: true,
    showEditLayout: true,
    showSearch: true,
    theme: darkTheme,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 3 — Emerald / Green — Operations Dashboard
// Clean, positive, high-contrast green accent on off-white
// ═══════════════════════════════════════════════════════════════════════════════

const emeraldTheme: DashboardTheme = {
  primaryColor: "#10b981",
  backgroundColor: "#f0fdf4",
  cardBackground: "#ffffff",
  borderRadius: "10px",
  textColor: "#064e3b",
  mutedColor: "#6b7280",
  borderColor: "#d1fae5",
  fontFamily: "'Nunito', system-ui, sans-serif",
};

const opsItems: WidgetItem[] = [
  {
    id: "o1",
    type: "stat",
    size: "small",
    layout: { x: 0, y: 0 },
    data: {
      title: "Uptime",
      value: "99.97%",
      change: "30-day SLA met",
      changeType: "up",
    },
  },
  {
    id: "o2",
    type: "stat",
    size: "small",
    layout: { x: 3, y: 0 },
    data: {
      title: "Incidents",
      value: "3",
      change: "−5 vs last month",
      changeType: "up",
    },
  },
  {
    id: "o3",
    type: "stat",
    size: "small",
    layout: { x: 6, y: 0 },
    data: {
      title: "P95 Latency",
      value: "142ms",
      change: "↑18ms spike",
      changeType: "down",
    },
  },
  {
    id: "o4",
    type: "stat",
    size: "small",
    layout: { x: 9, y: 0 },
    data: {
      title: "Error Rate",
      value: "0.12%",
      change: "within threshold",
      changeType: "neutral",
    },
  },
  {
    id: "o5",
    type: "chart",
    size: "medium",
    layout: { x: 0, y: 2 },
    data: {
      chartType: "area",
      title: "Request Volume",
      subtitle: "Requests / day",
      data: areaData,
      colors: { primary: "#10b981" },
      showGrid: true,
    },
  },
  {
    id: "o6",
    type: "chart",
    size: "medium",
    layout: { x: 6, y: 2 },
    data: {
      chartType: "line",
      title: "Latency Trend",
      showGrid: true,
      showLegend: true,
      seriesLabels: { value: "P50", value2: "P95" },
      data: lineData.map((d) => ({
        ...d,
        value: d.value / 100,
        value2: d.value2! / 50,
      })),
      colors: { primary: "#10b981", secondary: "#f59e0b" },
    },
  },
  {
    id: "o7",
    type: "gauge",
    size: "small",
    layout: { x: 0, y: 5 },
    data: {
      title: "CPU Headroom",
      value: "37%",
      percentage: 63,
      changeText: "63% utilised",
      color: "#10b981",
    },
  },
  {
    id: "o8",
    type: "gauge",
    size: "small",
    layout: { x: 3, y: 5 },
    data: {
      title: "Memory",
      value: "51%",
      percentage: 51,
      changeText: "8 GB free",
      color: "#10b981",
    },
  },
  {
    id: "o9",
    type: "splitstat",
    size: "small",
    layout: { x: 6, y: 5 },
    data: {
      title: "Traffic by Region",
      value: "2.4M",
      unit: "req",
      segments: [
        { label: "EU", percentage: 42, color: "#10b981" },
        { label: "US", percentage: 38, color: "#34d399" },
        { label: "APAC", percentage: 20, color: "#6ee7b7" },
      ],
    },
  },
  {
    id: "o10",
    type: "chart",
    size: "small",
    layout: { x: 9, y: 5 },
    data: {
      chartType: "donut",
      title: "Status Codes",
      data: [
        { label: "2xx", value: 94, color: "#10b981" },
        { label: "4xx", value: 4, color: "#f59e0b" },
        { label: "5xx", value: 2, color: "#ef4444" },
      ],
    },
  },
  {
    id: "o11",
    type: "table",
    size: "large",
    layout: { x: 0, y: 7 },
    data: {
      title: "Recent Incidents",
      sortable: true,
      striped: true,
      rowsPerPage: 5,
      columns: [
        { key: "id", label: "ID", width: 80 },
        { key: "customer", label: "Service" },
        { key: "product", label: "Severity" },
        {
          key: "total",
          label: "Duration (min)",
          align: "right",
          render: (v: number) => `${v}`,
        },
        { key: "status", label: "Resolution", render: StatusCell },
      ],
      rows: tableRows,
    },
  },
  {
    id: "o12",
    type: "chart",
    size: "medium",
    layout: { x: 0, y: 11 },
    data: {
      chartType: "histogram",
      title: "Response Time Distribution",
      data: histogramData,
      colors: { primary: "#10b981" },
    },
  },
  {
    id: "o13",
    type: "list",
    size: "medium",
    layout: { x: 6, y: 11 },
    data: {
      title: "Active Alerts",
      items: [
        {
          id: "a1",
          label: "High memory on prod-db-02",
          badge: "Warning",
          badgeColor: "#f59e0b",
        },
        {
          id: "a2",
          label: "P95 latency spike /api/search",
          badge: "Degraded",
          badgeColor: "#f97316",
        },
        {
          id: "a3",
          label: "Disk at 82% on backup-01",
          badge: "Info",
          badgeColor: "#94a3b8",
        },
        {
          id: "a4",
          label: "SSL cert expiring in 14 days",
          badge: "Info",
          badgeColor: "#94a3b8",
        },
      ],
    },
  },
];

export const Emerald: Story = {
  name: "3 · Emerald - Operations Dashboard",
  args: {
    title: "Platform Operations",
    subtitle: "Infrastructure health · Real-time",
    items: opsItems,
    showAddWidget: true,
    showEditLayout: true,
    theme: emeraldTheme,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 4 — Warm Amber — Marketing Dashboard
// Energetic, warm palette — traffic, campaigns, content
// ═══════════════════════════════════════════════════════════════════════════════

const amberTheme: DashboardTheme = {
  primaryColor: "#f59e0b",
  backgroundColor: "#fffbeb",
  cardBackground: "#ffffff",
  borderRadius: "16px",
  textColor: "#1c1917",
  mutedColor: "#78716c",
  borderColor: "#fde68a",
  fontFamily: "'Outfit', system-ui, sans-serif",
};

const mktItems: WidgetItem[] = [
  {
    id: "m1",
    type: "stat",
    size: "small",
    layout: { x: 0, y: 0 },
    data: {
      title: "Sessions",
      value: "184,200",
      change: "+23% vs last week",
      changeType: "up",
    },
  },
  {
    id: "m2",
    type: "stat",
    size: "small",
    layout: { x: 3, y: 0 },
    data: {
      title: "Conversion",
      value: "3.82%",
      change: "+0.4pp MoM",
      changeType: "up",
    },
  },
  {
    id: "m3",
    type: "stat",
    size: "small",
    layout: { x: 6, y: 0 },
    data: {
      title: "Bounce Rate",
      value: "41%",
      change: "−3pp vs benchmark",
      changeType: "up",
    },
  },
  {
    id: "m4",
    type: "stat",
    size: "small",
    layout: { x: 9, y: 0 },
    data: {
      title: "Ad Spend",
      value: "$12,400",
      change: "within budget",
      changeType: "neutral",
    },
  },
  {
    id: "m5",
    type: "chart",
    size: "large",
    resizable: true,
    layout: { x: 0, y: 2 },
    data: {
      chartType: "bar",
      title: "Sessions by Channel",
      stacked: true,
      showLegend: true,
      seriesLabels: { value: "Organic", value2: "Paid" },
      data: barData.map((d) => ({ ...d })),
      colors: { primary: "#f59e0b", secondary: "#fb923c" },
    },
  },
  {
    id: "m6",
    type: "chart",
    size: "medium",
    layout: { x: 0, y: 6 },
    data: {
      chartType: "area",
      title: "Daily Sessions",
      data: areaData,
      colors: { primary: "#f59e0b" },
      showGrid: true,
    },
  },
  {
    id: "m7",
    type: "chart",
    size: "medium",
    layout: { x: 6, y: 6 },
    data: {
      chartType: "donut",
      title: "Traffic by Device",
      showLegend: true,
      data: [
        { label: "Mobile", value: 58, color: "#f59e0b" },
        { label: "Desktop", value: 34, color: "#fb923c" },
        { label: "Tablet", value: 8, color: "#fcd34d" },
      ],
    },
  },
  {
    id: "m8",
    type: "gauge",
    size: "small",
    layout: { x: 0, y: 9 },
    data: {
      title: "Goal Progress",
      value: "67%",
      percentage: 67,
      changeText: "Q3 acquisition target",
      color: "#f59e0b",
    },
  },
  {
    id: "m9",
    type: "list",
    size: "medium",
    layout: { x: 3, y: 9 },
    data: {
      title: "Top Campaigns",
      items: [
        {
          id: "c1",
          label: "Summer Sale Email",
          value: "4.2% CTR",
          badge: "Active",
          badgeColor: "#22c55e",
        },
        {
          id: "c2",
          label: "Google Ads — Brand",
          value: "8.1% CTR",
          badge: "Active",
          badgeColor: "#22c55e",
        },
        {
          id: "c3",
          label: "LinkedIn Retargeting",
          value: "1.8% CTR",
          badge: "Paused",
          badgeColor: "#94a3b8",
        },
        {
          id: "c4",
          label: "Facebook Lookalike",
          value: "2.4% CTR",
          badge: "Active",
          badgeColor: "#22c55e",
        },
      ],
    },
  },
  {
    id: "m10",
    type: "text",
    size: "small",
    layout: { x: 9, y: 9 },
    data: {
      title: "This Week",
      body: "Summer sale campaign is outperforming forecast by 18%. Recommend increasing Google Ads budget by $2k. New blog post drove 4,200 organic sessions.",
    },
  },
  {
    id: "m11",
    type: "calendar",
    size: "medium",
    layout: { x: 0, y: 11 },
    data: {
      title: "Campaign Calendar",
      highlightToday: true,
      primaryColor: "#f59e0b",
      events: [
        { date: "2025-04-08", label: "Email Campaign", color: "#f59e0b" },
        { date: "2025-04-14", label: "Product Launch", color: "#ef4444" },
        { date: "2025-04-21", label: "Webinar", color: "#22c55e" },
        { date: "2025-04-28", label: "Newsletter", color: "#f59e0b" },
      ],
    },
  },
  {
    id: "m12",
    type: "chart",
    size: "medium",
    layout: { x: 6, y: 11 },
    data: {
      chartType: "line",
      title: "ROAS by Week",
      showGrid: true,
      data: areaData.map((d) => ({ ...d, value: d.value / 1000 })),
      colors: { primary: "#f59e0b" },
    },
  },
];

export const Amber: Story = {
  name: "4 · Amber Warm - Marketing Dashboard",
  args: {
    title: "Marketing Performance",
    subtitle: "Campaigns, traffic & conversions · Q3 2024",
    items: mktItems,
    showAddWidget: true,
    showEditLayout: true,
    theme: amberTheme,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 5 — Rose / Crimson — HR / People Dashboard
// Warm, humanistic palette — people analytics
// ═══════════════════════════════════════════════════════════════════════════════

const roseTheme: DashboardTheme = {
  primaryColor: "#e11d48",
  backgroundColor: "#fff1f2",
  cardBackground: "#ffffff",
  borderRadius: "18px",
  textColor: "#1f1235",
  mutedColor: "#9d4976",
  borderColor: "#fecdd3",
  fontFamily: "'Raleway', system-ui, sans-serif",
};

const hrItems: WidgetItem[] = [
  {
    id: "hr1",
    type: "stat",
    size: "small",
    layout: { x: 0, y: 0 },
    data: {
      title: "Headcount",
      value: "284",
      change: "+12 this quarter",
      changeType: "up",
    },
  },
  {
    id: "hr2",
    type: "stat",
    size: "small",
    layout: { x: 3, y: 0 },
    data: {
      title: "Attrition Rate",
      value: "8.2%",
      change: "−1.4pp YoY",
      changeType: "up",
    },
  },
  {
    id: "hr3",
    type: "stat",
    size: "small",
    layout: { x: 6, y: 0 },
    data: {
      title: "Open Roles",
      value: "31",
      change: "+7 since last month",
      changeType: "down",
    },
  },
  {
    id: "hr4",
    type: "stat",
    size: "small",
    layout: { x: 9, y: 0 },
    data: { title: "eNPS", value: "42", change: "+8 vs H1", changeType: "up" },
  },
  {
    id: "hr5",
    type: "profile",
    size: "medium",
    layout: { x: 0, y: 2 },
    data: {
      name: "James Okafor",
      email: "james@hr.example.com",
      role: "VP People",
      badgeColor: "#e11d48",
      stats: [
        { label: "Team", value: 8 },
        { label: "Tenure", value: "5y" },
      ],
    },
  },
  {
    id: "hr6",
    type: "profile",
    size: "medium",
    layout: { x: 6, y: 0 },
    data: {
      name: "Priya Sharma",
      email: "priya@hr.example.com",
      role: "HR Business Partner",
      badgeColor: "#e11d48",
      stats: [
        { label: "Sites", value: 3 },
        { label: "Hires", value: 24 },
      ],
    },
  },
  {
    id: "hr7",
    type: "chart",
    size: "medium",
    layout: { x: 6, y: 2 },
    data: {
      chartType: "donut",
      title: "Headcount by Department",
      showLegend: true,
      data: [
        { label: "Engineering", value: 110, color: "#e11d48" },
        { label: "Sales", value: 64, color: "#f97316" },
        { label: "Product", value: 42, color: "#f59e0b" },
        { label: "G&A", value: 68, color: "#94a3b8" },
      ],
    },
  },
  {
    id: "hr8",
    type: "chart",
    size: "medium",
    layout: { x: 0, y: 4 },
    data: {
      chartType: "bar",
      title: "Hires vs Attrition",
      showLegend: true,
      seriesLabels: { value: "Hires", value2: "Departures" },
      data: barData.map((d) => ({ ...d, value2: Math.floor(d.value * 0.4) })),
      colors: { primary: "#e11d48", secondary: "#94a3b8" },
    },
  },
  {
    id: "hr9",
    type: "gauge",
    size: "small",
    layout: { x: 6, y: 4 },
    data: {
      title: "Offer Acceptance",
      value: "82%",
      percentage: 82,
      changeText: "Industry avg: 74%",
      color: "#e11d48",
    },
  },
  {
    id: "hr10",
    type: "splitstat",
    size: "small",
    layout: { x: 9, y: 4 },
    data: {
      title: "Diversity Split",
      value: "46%",
      unit: "♀",
      segments: [
        { label: "Women", percentage: 46, color: "#e11d48" },
        { label: "Men", percentage: 54, color: "#94a3b8" },
      ],
    },
  },
  {
    id: "hr11",
    type: "list",
    size: "medium",
    layout: { x: 0, y: 6 },
    data: {
      title: "Open Roles",
      items: [
        {
          id: "r1",
          label: "Staff Engineer — Platform",
          badge: "Urgent",
          badgeColor: "#ef4444",
        },
        {
          id: "r2",
          label: "Senior Product Manager",
          badge: "Active",
          badgeColor: "#22c55e",
        },
        {
          id: "r3",
          label: "Data Analyst",
          badge: "Active",
          badgeColor: "#22c55e",
        },
        {
          id: "r4",
          label: "Account Executive × 3",
          badge: "Active",
          badgeColor: "#22c55e",
        },
        {
          id: "r5",
          label: "UX Designer",
          badge: "On hold",
          badgeColor: "#94a3b8",
        },
      ],
    },
  },
  {
    id: "hr12",
    type: "table",
    size: "medium",
    layout: { x: 6, y: 6 },
    data: {
      title: "New Starters This Month",
      sortable: true,
      striped: true,
      rowsPerPage: 4,
      columns: [
        { key: "customer", label: "Name" },
        { key: "product", label: "Role" },
        { key: "status", label: "Status", render: StatusCell },
      ],
      rows: tableRows,
    },
  },
];

export const Rose: Story = {
  name: "5 · Rose - HR & People Analytics",
  args: {
    title: "People Dashboard",
    subtitle: "Talent, hiring & organisation health · Q3 2024",
    items: hrItems,
    showAddWidget: true,
    showEditLayout: true,
    theme: roseTheme,
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 6 — Resizable Widgets Focus
// Shows all resizable widgets with resize handles enabled
// ═══════════════════════════════════════════════════════════════════════════════

const resizableItems: WidgetItem[] = [
  {
    id: "r1",
    type: "chart",
    size: "medium",
    resizable: true,
    layout: { x: 0, y: 0 },
    data: {
      chartType: "line",
      title: "Resizable Line Chart",
      subtitle: "Drag the corner handle to resize",
      showGrid: true,
      data: lineData,
      colors: { primary: "#6366f1" },
    },
  },
  {
    id: "r2",
    type: "chart",
    size: "medium",
    resizable: true,
    layout: { x: 6, y: 0 },
    data: {
      chartType: "bar",
      title: "Resizable Bar Chart",
      subtitle: "Enter Edit Mode to resize",
      data: barData,
      colors: { primary: "#6366f1" },
    },
  },
  {
    id: "r3",
    type: "table",
    size: "large",
    resizable: true,
    layout: { x: 0, y: 3 },
    data: {
      title: "Resizable Table",
      subtitle: "Resize to see more or fewer rows",
      sortable: true,
      striped: true,
      rowsPerPage: 5,
      columns: [
        { key: "id", label: "ID", width: 90 },
        { key: "customer", label: "Customer" },
        { key: "product", label: "Plan" },
        {
          key: "total",
          label: "Total",
          align: "right",
          render: (v: number) => `$${v}`,
        },
        { key: "status", label: "Status", render: StatusCell },
      ],
      rows: tableRows,
    },
  },
  {
    id: "r4",
    type: "chart",
    size: "small",
    resizable: true,
    layout: { x: 0, y: 7 },
    data: { chartType: "donut", title: "Resizable Donut", data: pieData },
  },
  {
    id: "r5",
    type: "gauge",
    size: "small",
    resizable: true,
    layout: { x: 3, y: 7 },
    data: {
      title: "Resizable Gauge",
      value: "68%",
      percentage: 68,
      color: "#6366f1",
    },
  },
  {
    id: "r6",
    type: "chart",
    size: "medium",
    resizable: true,
    layout: { x: 6, y: 7 },
    data: {
      chartType: "area",
      title: "Resizable Area Chart",
      data: areaData,
      colors: { primary: "#6366f1" },
    },
  },
];

export const ResizableWidgets: Story = {
  name: "6 · Resizable Widgets - Edit Mode",
  args: {
    title: "Resizable Dashboard",
    subtitle:
      "Click Edit Layout to enter edit mode — all widgets have resize handles",
    items: resizableItems,
    showAddWidget: true,
    showEditLayout: true,
    theme: {
      primaryColor: "#6366f1",
      backgroundColor: "#f8fafc",
      cardBackground: "#ffffff",
      borderRadius: "12px",
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 7 — Minimal (no header chrome)
// ═══════════════════════════════════════════════════════════════════════════════

export const Minimal: Story = {
  name: "7 · Minimal - No Header Chrome",
  args: {
    showAddWidget: false,
    showEditLayout: false,
    showSearch: false,
    items: allWidgetsItems.slice(0, 8),
    theme: {
      primaryColor: "#111827",
      backgroundColor: "#f9fafb",
      cardBackground: "#ffffff",
      borderRadius: "8px",
      borderColor: "#e5e7eb",
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORY 8 — Custom Header Actions
// ═══════════════════════════════════════════════════════════════════════════════

export const CustomHeader: Story = {
  name: "8 · Custom Header Actions",
  args: {
    title: "Custom Actions",
    subtitle: "Header with extra buttons",
    items: allWidgetsItems.slice(0, 6),
    headerActions: [
      { label: "Export CSV", onClick: () => alert("Export!") },
      { label: "Share", onClick: () => alert("Share!") },
    ],
    theme: {
      primaryColor: "#7c3aed",
      backgroundColor: "#faf5ff",
      cardBackground: "#ffffff",
      borderRadius: "12px",
      borderColor: "#ede9fe",
      textColor: "#2e1065",
      mutedColor: "#7c3aed",
    },
  },
};
