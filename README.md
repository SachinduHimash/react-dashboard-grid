# react-dashboard-grid

A flexible, themeable React dashboard library with drag-and-drop layout, a rich widget library, and a fully functional **Add Widget** modal.

---

## Installation

```bash
npm install react-dashboard-grid react-grid-layout recharts
```

---

## Quick Start

```tsx
import { Dashboard } from "react-dashboard-grid";
import type { WidgetItem } from "react-dashboard-grid";

const items: WidgetItem[] = [
  {
    id: "revenue",
    type: "stat",
    size: "small",
    data: {
      title: "Revenue",
      value: "$48,295",
      change: "+12.4%",
      changeType: "up",
    },
  },
  {
    id: "sales-chart",
    type: "chart",
    size: "medium",
    data: {
      chartType: "line",
      title: "Monthly Sales",
      data: [
        { label: "Jan", value: 30 },
        { label: "Feb", value: 55 },
        { label: "Mar", value: 40 },
        { label: "Apr", value: 70 },
      ],
    },
  },
];

export default function App() {
  return (
    <Dashboard
      title="My Dashboard"
      subtitle="Overview of key metrics"
      items={items}
    />
  );
}
```

---

## `<Dashboard>` Props

| Prop                 | Type                                     | Default               | Description                                                                                                                    |
| -------------------- | ---------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `items`              | `WidgetItem[]`                           | **required**          | Initial widget list. Dashboard manages its own state internally — new widgets are appended without requiring parent re-render. |
| `title`              | `string`                                 | —                     | Header title                                                                                                                   |
| `subtitle`           | `string`                                 | —                     | Header subtitle                                                                                                                |
| `showAddWidget`      | `boolean`                                | `true`                | Show "+ Add Widget" button                                                                                                     |
| `showEditLayout`     | `boolean`                                | `true`                | Show "Edit Layout" toggle                                                                                                      |
| `showSearch`         | `boolean`                                | `true`                | Show search input                                                                                                              |
| `headerActions`      | `DashboardAction[]`                      | —                     | Extra buttons rendered in the header                                                                                           |
| `onLayoutChange`     | `(layout: WidgetLayoutChange[]) => void` | —                     | Fires after drag/resize; receives clean backend-ready payload                                                                  |
| `onAddWidget`        | `() => void`                             | —                     | Side-effect callback — fires after a widget is added. Dashboard handles state internally.                                      |
| `onSearch`           | `(query: string) => void`                | —                     | Fires on search input change                                                                                                   |
| `theme`              | `DashboardTheme`                         | see defaults          | Theme object (see Theming section)                                                                                             |
| `className`          | `string`                                 | —                     | Root element class                                                                                                             |
| `widgetTemplates`    | `WidgetTemplate[]`                       | DEFAULT_TEMPLATES     | Templates for the Add Widget modal                                                                                             |
| `searchLabel`        | `string`                                 | `"Search widgets..."` | Placeholder for search input                                                                                                   |
| `editLabel`          | `string`                                 | `"Edit Layout"`       | Edit button label                                                                                                              |
| `editingLabel`       | `string`                                 | `"Done"`              | Edit button label when active                                                                                                  |
| `addLabel`           | `string`                                 | `"+ Add Widget"`      | Add widget button label                                                                                                        |
| `disableEditingGrid` | `boolean`                                | `false`               | Suppress grid overlay while editing                                                                                            |

---

## Add Widget Modal

The `AddWidgetModal` is now driven by **programmer-supplied templates**. Each template includes the complete, pre-configured `WidgetItem` data (minus `id`) that will be cloned onto the dashboard.

### How it works

1. You (the programmer) define a list of `WidgetTemplate` objects.
2. Users open the modal, browse, select a widget, and click **Add to Dashboard**.
3. The dashboard automatically appends the widget and assigns it a unique `id`.

### `WidgetTemplate` interface

```ts
interface WidgetTemplate {
  key: string; // Unique identifier for this template
  label: string; // Display name in the modal
  description: string; // One-sentence description
  component: Omit<WidgetItem, "id">; // The complete, pre-configured widget data
}
```

### Example — custom templates

```tsx
import { Dashboard } from "react-dashboard-grid";
import type { WidgetTemplate } from "react-dashboard-grid";

const MY_TEMPLATES: WidgetTemplate[] = [
  {
    key: "monthly-revenue",
    label: "Monthly Revenue",
    description: "Tracks total revenue across the current month.",
    component: {
      type: "stat",
      size: "small",
      data: {
        title: "Monthly Revenue",
        value: "$0",
        change: "vs last month",
        changeType: "neutral",
      },
    },
  },
  {
    key: "conversion-funnel",
    label: "Conversion Funnel",
    description: "Bar chart showing drop-off at each funnel stage.",
    component: {
      type: "chart",
      size: "medium",
      data: {
        chartType: "bar",
        title: "Conversion Funnel",
        data: [
          { label: "Visits", value: 10000 },
          { label: "Signups", value: 4500 },
          { label: "Activated", value: 2100 },
          { label: "Paid", value: 800 },
        ],
      },
    },
  },
  {
    key: "team-members",
    label: "Team List",
    description: "Scrollable list of team members with role badges.",
    component: {
      type: "list",
      size: "medium",
      data: {
        title: "Team Members",
        items: [
          {
            id: "1",
            label: "Alice Johnson",
            badge: "Admin",
            badgeColor: "#6366f1",
          },
          {
            id: "2",
            label: "Bob Chen",
            badge: "Editor",
            badgeColor: "#22c55e",
          },
        ],
      },
    },
  },
];

export default function App() {
  return (
    <Dashboard title="Analytics" items={[]} widgetTemplates={MY_TEMPLATES} />
  );
}
```

### Using DEFAULT_TEMPLATES

If you do not pass `widgetTemplates`, the modal uses `DEFAULT_TEMPLATES` which covers every built-in widget type:

```tsx
import { DEFAULT_TEMPLATES } from "react-dashboard-grid";

// Extend defaults with your own
const templates = [
  ...DEFAULT_TEMPLATES,
  {
    key: "custom-kpi",
    label: "Custom KPI",
    description: "Your custom KPI widget.",
    component: {
      type: "stat",
      size: "small",
      data: { title: "KPI", value: "—" },
    },
  },
];
```

### Standalone modal usage

```tsx
import { AddWidgetModal } from "react-dashboard-grid";
import type { WidgetItem } from "react-dashboard-grid";

function MyPage() {
  const [open, setOpen] = useState(false);
  const [widgets, setWidgets] = useState<WidgetItem[]>([]);

  return (
    <>
      <button onClick={() => setOpen(true)}>Add Widget</button>
      <AddWidgetModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAdd={(widget) => setWidgets((prev) => [...prev, widget])}
        primaryColor="#6366f1"
      />
    </>
  );
}
```

---

## Widget Reference

### `stat` — Stat Card

Displays a single KPI metric with an optional trend arrow and icon.

```tsx
{
  id: "revenue",
  type: "stat",
  size: "small",
  data: {
    title: "Monthly Revenue",
    value: "$48,295",
    change: "+12.4% vs last month",
    changeType: "up", // "up" | "down" | "neutral"
    icon: <SomeIcon />, // optional React node
  },
}
```

**StatData props:**

| Prop         | Type                          | Description               |
| ------------ | ----------------------------- | ------------------------- |
| `title`      | `string`                      | Metric label              |
| `value`      | `string \| number`            | Main displayed value      |
| `change`     | `string`                      | Optional trend text       |
| `changeType` | `"up" \| "down" \| "neutral"` | Controls arrow and color  |
| `icon`       | `ReactNode`                   | Optional icon (top-right) |

---

### `chart` — Chart Card

Supports 5 chart types via a single unified `chartType` discriminator.

#### Line Chart

```tsx
{
  id: "sales-trend",
  type: "chart",
  size: "medium",
  data: {
    chartType: "line",
    title: "Sales Trend",
    subtitle: "Last 6 months",
    data: [
      { label: "Jan", value: 400, value2: 300 },
      { label: "Feb", value: 600, value2: 450 },
    ],
    showGrid: true,
    showLegend: true,
    seriesLabels: { value: "Revenue", value2: "Costs" },
    colors: { primary: "#6366f1", secondary: "#f59e0b" },
  },
}
```

#### Bar Chart

```tsx
{
  id: "quarterly",
  type: "chart",
  size: "medium",
  data: {
    chartType: "bar",
    title: "Quarterly Performance",
    stacked: false,
    data: [
      { label: "Q1", value: 120, value2: 80 },
      { label: "Q2", value: 180, value2: 110 },
    ],
  },
}
```

#### Area Chart

```tsx
{
  id: "traffic",
  type: "chart",
  size: "medium",
  data: {
    chartType: "area",
    title: "Site Traffic",
    stacked: false,
    data: [{ label: "Mon", value: 500 }, { label: "Tue", value: 750 }],
  },
}
```

#### Pie / Donut Chart

```tsx
{
  id: "channels",
  type: "chart",
  size: "medium",
  data: {
    chartType: "donut", // or "pie"
    title: "Traffic Sources",
    showLegend: true,
    data: [
      { label: "Organic", value: 45, color: "#6366f1" },
      { label: "Direct", value: 30, color: "#22c55e" },
      { label: "Referral", value: 25, color: "#f59e0b" },
    ],
  },
}
```

#### Histogram

```tsx
{
  id: "distribution",
  type: "chart",
  size: "medium",
  data: {
    chartType: "histogram",
    title: "Score Distribution",
    data: [
      { label: "0–20", value: 5 },
      { label: "20–40", value: 15 },
      { label: "40–60", value: 32 },
      { label: "60–80", value: 28 },
      { label: "80–100", value: 12 },
    ],
  },
}
```

**ChartData shared props:**

| Prop           | Type               | Description                                   |
| -------------- | ------------------ | --------------------------------------------- |
| `title`        | `string`           | Card title                                    |
| `subtitle`     | `string`           | Optional subtitle                             |
| `data`         | `ChartDataPoint[]` | Array of `{ label, value, value2?, value3? }` |
| `colors`       | `ChartColors`      | Override series colors                        |
| `showGrid`     | `boolean`          | Show grid lines (default: true)               |
| `showLegend`   | `boolean`          | Show legend (default: false)                  |
| `seriesLabels` | `object`           | Labels for multi-series legend                |

---

### `list` — List Card

Scrollable list of labelled rows with optional values, badges, and icons.

```tsx
{
  id: "top-pages",
  type: "list",
  size: "medium",
  data: {
    title: "Top Pages",
    items: [
      { id: "1", label: "/home", value: "12,400 views", badge: "↑8%", badgeColor: "#22c55e" },
      { id: "2", label: "/pricing", value: "8,200 views", badge: "↓2%", badgeColor: "#ef4444" },
      { id: "3", label: "/docs", value: "5,600 views" },
    ],
  },
}
```

**ListItem props:**

| Prop         | Type        | Description               |
| ------------ | ----------- | ------------------------- |
| `id`         | `string`    | Unique row key            |
| `label`      | `string`    | Row label                 |
| `value`      | `string`    | Optional right-side value |
| `badge`      | `string`    | Optional badge text       |
| `badgeColor` | `string`    | Badge background color    |
| `icon`       | `ReactNode` | Optional leading icon     |

---

### `table` — Data Table

Sortable, paginated table for dense data.

```tsx
{
  id: "orders",
  type: "table",
  size: "large",
  data: {
    title: "Recent Orders",
    subtitle: "Last 30 days",
    sortable: true,
    striped: true,
    rowsPerPage: 5,
    columns: [
      { key: "id", label: "Order ID", width: 100 },
      { key: "customer", label: "Customer" },
      { key: "total", label: "Total", align: "right", render: (v) => `$${v}` },
      { key: "status", label: "Status", render: (v) => <StatusBadge status={v} /> },
    ],
    rows: [
      { id: "#1001", customer: "Alice", total: 299, status: "paid" },
      { id: "#1002", customer: "Bob", total: 149, status: "pending" },
    ],
  },
}
```

**TableData props:**

| Prop          | Type                    | Description                |
| ------------- | ----------------------- | -------------------------- |
| `title`       | `string`                | Card title                 |
| `subtitle`    | `string`                | Optional subtitle          |
| `columns`     | `TableColumn[]`         | Column definitions         |
| `rows`        | `Record<string, any>[]` | Row data                   |
| `sortable`    | `boolean`               | Enable column sorting      |
| `striped`     | `boolean`               | Alternate row shading      |
| `rowsPerPage` | `number`                | Rows per page (default: 5) |

**TableColumn props:**

| Prop     | Type                            | Description          |
| -------- | ------------------------------- | -------------------- |
| `key`    | `string`                        | Row data key         |
| `label`  | `string`                        | Column header        |
| `width`  | `string \| number`              | Column width         |
| `align`  | `"left" \| "center" \| "right"` | Cell alignment       |
| `render` | `(value, row) => ReactNode`     | Custom cell renderer |

---

### `gauge` — Gauge Card

Semicircle gauge with a percentage fill and needle.

```tsx
{
  id: "cpu",
  type: "gauge",
  size: "small",
  data: {
    title: "CPU Usage",
    subtitle: "Average across cores",
    value: "73%",
    label: "utilisation",
    percentage: 73,   // 0–100
    changeText: "↑4% from last hour",
    color: "#6366f1", // optional override
  },
}
```

---

### `profile` — Profile Card

User card with avatar, name, role badge, and optional stat row.

```tsx
{
  id: "user-profile",
  type: "profile",
  size: "small",
  data: {
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Senior Engineer",
    badgeColor: "#6366f1",
    avatarUrl: "https://example.com/avatar.jpg",
    // avatarEmoji: "👩‍💻",  // fallback if no URL
    stats: [
      { label: "PRs", value: 142 },
      { label: "Reviews", value: 89 },
      { label: "Issues", value: 24 },
    ],
  },
}
```

---

### `splitstat` — Split Progress Card

Main value with a labelled multi-segment stacked progress bar.

```tsx
{
  id: "disk-usage",
  type: "splitstat",
  size: "small",
  data: {
    title: "Storage Used",
    titleAction: "Manage",
    value: "284",
    unit: "GB",
    minValue: "0 GB",
    maxValue: "500 GB",
    segments: [
      { label: "Documents", percentage: 40, value: "114 GB", color: "#6366f1" },
      { label: "Media", percentage: 35, value: "99 GB", color: "#22c55e" },
      { label: "Backups", percentage: 25, value: "71 GB", color: "#f59e0b" },
    ],
  },
}
```

---

### `calendar` — Calendar Card

Monthly calendar with event dot indicators.

```tsx
{
  id: "schedule",
  type: "calendar",
  size: "medium",
  data: {
    title: "Schedule",
    highlightToday: true,
    primaryColor: "#6366f1",
    onDateSelect: (date) => console.log("Selected:", date),
    events: [
      { date: "2024-04-15", label: "Sprint Review", color: "#6366f1" },
      { date: "2024-04-20", label: "Release", color: "#22c55e" },
      { date: "2024-04-20", label: "Standup", color: "#f59e0b" },
    ],
  },
}
```

---

### `text` — Text Block Card

Free-form text or notes widget.

```tsx
{
  id: "notes",
  type: "text",
  size: "small",
  data: {
    title: "Notes",
    body: "Q2 planning begins next week. Focus areas: retention and activation.",
  },
}
```

---

### `custom` — Custom Card

Render any React component inside a dashboard card.

```tsx
import { MyCustomWidget } from "./MyCustomWidget";

{
  id: "my-widget",
  type: "custom",
  size: "medium",
  component: MyCustomWidget,
  props: {
    userId: "abc123",
    showControls: true,
  },
}
```

---

## Theming

Pass a `theme` object to `<Dashboard>` to customise the visual style:

```tsx
<Dashboard
  items={items}
  theme={{
    primaryColor: "#7c3aed", // Accent / interactive color
    backgroundColor: "#0f172a", // Dashboard background
    cardBackground: "#1e293b", // Widget card background
    borderRadius: "16px", // Card corner radius
    textColor: "#f1f5f9", // Primary text
    mutedColor: "#94a3b8", // Secondary / muted text
    borderColor: "#334155", // Card borders
    fontFamily: "'DM Sans', sans-serif",
  }}
/>
```

**DashboardTheme props:**

| Prop              | Default                 | Description                                  |
| ----------------- | ----------------------- | -------------------------------------------- |
| `primaryColor`    | `#6366f1`               | Accent color for highlights, buttons, charts |
| `backgroundColor` | `#f4f5f7`               | Dashboard canvas background                  |
| `cardBackground`  | `#ffffff`               | Card surface background                      |
| `borderRadius`    | `12px`                  | Card border radius                           |
| `textColor`       | `#111827`               | Primary text color                           |
| `mutedColor`      | `#6b7280`               | Muted / secondary text                       |
| `borderColor`     | `#e5e7eb`               | Card and divider borders                     |
| `fontFamily`      | `system-ui, sans-serif` | Font stack                                   |

### Dark theme example

```tsx
const darkTheme = {
  primaryColor: "#818cf8",
  backgroundColor: "#0f172a",
  cardBackground: "#1e293b",
  borderRadius: "14px",
  textColor: "#f1f5f9",
  mutedColor: "#94a3b8",
  borderColor: "#334155",
};
```

### Teal/mint theme example

```tsx
const tealTheme = {
  primaryColor: "#14b8a6",
  backgroundColor: "#f0fdfa",
  cardBackground: "#ffffff",
  borderRadius: "8px",
  textColor: "#134e4a",
  mutedColor: "#5eead4",
  borderColor: "#99f6e4",
};
```

---

## Widget Sizing

Three predefined sizes:

| Size     | Grid columns | Row height units | Pixels (approx.) |
| -------- | ------------ | ---------------- | ---------------- |
| `small`  | 3            | 2                | 160px tall       |
| `medium` | 6            | 3                | 240px tall       |
| `large`  | 12           | 4                | 320px tall       |

Custom sizes are also supported:

```tsx
{
  id: "wide-chart",
  type: "chart",
  customSize: { w: 9, h: 3 }, // 9 columns × 3 row heights
  // ...
}
```

---

## Drag, Resize & Edit Mode

- Click **Edit Layout** to enter edit mode.
- In edit mode, all widgets show a drag handle and glow ring.
- Widgets with `resizable: true` show a resize handle.
- Resizing snaps to the nearest predefined size by default; use `customSize` for free sizing.
- `onLayoutChange` fires with the updated layout after drag or resize stops.

```tsx
<Dashboard
  items={items}
  onLayoutChange={(layout) => {
    // Persist layout to your backend
    saveLayout(layout);
  }}
/>
```

**WidgetLayoutChange payload:**

```ts
interface WidgetLayoutChange {
  id: string;
  x: number;
  y: number;
  size: "small" | "medium" | "large" | { w: number; h: number };
  draggable: boolean;
  resizable: boolean;
}
```

---

## Full Example

```tsx
import React, { useState } from "react";
import { Dashboard, DEFAULT_TEMPLATES } from "react-dashboard-grid";
import type { WidgetItem, WidgetTemplate } from "react-dashboard-grid";

const initialItems: WidgetItem[] = [
  {
    id: "w1",
    type: "stat",
    size: "small",
    data: {
      title: "Revenue",
      value: "$124k",
      change: "+8.2%",
      changeType: "up",
    },
  },
  {
    id: "w2",
    type: "stat",
    size: "small",
    data: {
      title: "Users",
      value: "32,104",
      change: "+1,200",
      changeType: "up",
    },
  },
  {
    id: "w3",
    type: "chart",
    size: "medium",
    data: {
      chartType: "line",
      title: "Revenue Over Time",
      data: [
        { label: "Jan", value: 42000 },
        { label: "Feb", value: 58000 },
        { label: "Mar", value: 51000 },
        { label: "Apr", value: 74000 },
        { label: "May", value: 69000 },
        { label: "Jun", value: 91000 },
      ],
    },
  },
  {
    id: "w4",
    type: "gauge",
    size: "small",
    data: { title: "NPS Score", value: "72", percentage: 72 },
  },
];

const myTemplates: WidgetTemplate[] = [
  ...DEFAULT_TEMPLATES,
  {
    key: "mrr-stat",
    label: "MRR Tracker",
    description: "Monthly recurring revenue with goal progress.",
    component: {
      type: "stat",
      size: "small",
      data: { title: "MRR", value: "$0", changeType: "neutral" },
    },
  },
];

export default function App() {
  const [saved, setSaved] = useState(false);

  return (
    <Dashboard
      title="Analytics Dashboard"
      subtitle="Real-time product metrics"
      items={initialItems}
      widgetTemplates={myTemplates}
      theme={{
        primaryColor: "#6366f1",
        backgroundColor: "#f8fafc",
        cardBackground: "#ffffff",
        borderRadius: "12px",
      }}
      onLayoutChange={(layout) => {
        console.log("Layout changed:", layout);
        setSaved(false);
      }}
      onAddWidget={() => console.log("Widget added")}
    />
  );
}
```

---

## TypeScript Exports

```ts
import {
  // Components
  Dashboard,
  AddWidgetModal,
  DEFAULT_TEMPLATES,

  // Types
  type DashboardProps,
  type WidgetItem,
  type WidgetTemplate,
  type AddWidgetModalProps,
  type DashboardTheme,
  type DashboardAction,
  type WidgetLayoutChange,

  // Widget data types
  type StatData,
  type ChartData,
  type ListData,
  type ListItem,
  type TextData,
  type GaugeData,
  type ProfileData,
  type SplitStatData,
  type TableData,
  type TableColumn,
  type CalendarData,
  type CalendarEvent,
  type SplitStatSegment,

  // Utilities
  WIDGET_SIZES,
  type WidgetSize,
} from "react-dashboard-grid";
```

---

## FAQ

**Q: How do I pre-populate the modal with my product's specific widgets?**

Pass `widgetTemplates` to `<Dashboard>` or `<AddWidgetModal>`. Each template includes the full, pre-configured widget data — no extra configuration step for the user.

**Q: Can I disable the modal and handle "Add Widget" myself?**

Yes. Pass `showAddWidget={false}` and use your own button that calls your own state logic. Or use `onAddWidget` as a callback and build your own flow.

**Q: Can I have non-snapping, freely resizable widgets?**

Yes. Set `resizable: true` and `customSize: { w, h }` on the widget. This bypasses snap-to-size and allows free resizing within `minW/maxW/minH/maxH` bounds.

**Q: How do I persist the layout?**

Use `onLayoutChange` — it fires after every drag or resize stop with a clean `WidgetLayoutChange[]` payload. Save this to your backend and pass it back via `items[n].layout`.
