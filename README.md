# react-dashboard-grid

![npm](https://img.shields.io/npm/v/react-dashboard-grid)
![downloads](https://img.shields.io/npm/dm/react-dashboard-grid)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-dashboard-grid)

`react-dashboard-grid` is a React component library for building interactive, data-rich dashboards. It ships with a complete set of built-in widgets - stat cards, charts, tables, gauges, calendars, and more - alongside a drag-and-drop layout engine, a live theming system, and a modal for adding widgets at runtime. Every widget is sized and positioned on a 12-column grid, so dashboards compose predictably whether you're building an analytics product, an ops tool, or an internal admin panel. The library is written in TypeScript and exports full type definitions.

# Demo

Check out the interactive components on [Storybook](https://sachinduhimash.github.io/react-dashboard-grid/).

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Dashboard Props](#dashboard-props)
- [Widget Layout and Positioning](#widget-layout-and-positioning)
- [Add Widget Modal](#add-widget-modal)
  - [WidgetTemplate interface](#widgettemplate-interface)
  - [Custom templates](#custom-templates)
  - [Using DEFAULT_TEMPLATES](#using-default_templates)
  - [Standalone modal usage](#standalone-modal-usage)
- [Widget Reference](#widget-reference)
  - [stat — Stat Card](#stat---stat-card)
  - [chart — Chart Card](#chart---chart-card)
  - [list — List Card](#list---list-card)
  - [table — Data Table](#table---data-table)
  - [gauge — Gauge Card](#gauge---gauge-card)
  - [profile — Profile Card](#profile---profile-card)
  - [splitstat — Split Progress Card](#splitstat---split-progress-card)
  - [calendar — Calendar Card](#calendar---calendar-card)
  - [text — Text Block Card](#text---text-block-card)
  - [custom — Custom Card](#custom---custom-card)
- [Theming](#theming)
  - [Theme reference](#theme-reference)
  - [Dark theme](#dark-theme)
  - [Teal/mint theme](#tealmint-theme)
  - [Midnight blue theme](#midnight-blue-theme)
  - [Warm sand theme](#warm-sand-theme)
  - [Forest green theme](#forest-green-theme)
  - [Rose quartz theme](#rose-quartz-theme)
  - [Slate enterprise theme](#slate-enterprise-theme)
  - [Sunset orange theme](#sunset-orange-theme)
  - [Arctic white theme](#arctic-white-theme)
  - [Charcoal ink theme](#charcoal-ink-theme)
- [Widget Sizing](#widget-sizing)
- [Drag, Resize & Edit Mode](#drag-resize--edit-mode)
- [Full Example](#full-example)
- [TypeScript Exports](#typescript-exports)
- [FAQ](#faq)

---

## Installation

```bash
npm install react-dashboard-grid
```

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

## `<Dashboard>` Props

| Prop                 | Type                                     | Default               | Description                                                                                                                    |
| -------------------- | ---------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `items`              | `WidgetItem[]`                           | **required**          | Initial widget list. Dashboard manages its own state internally — new widgets are appended without requiring parent re-render. |
| `title`              | `string`                                 |                       | Header title                                                                                                                   |
| `subtitle`           | `string`                                 |                       | Header subtitle                                                                                                                |
| `showAddWidget`      | `boolean`                                | `true`                | Show "+ Add Widget" button                                                                                                     |
| `showEditLayout`     | `boolean`                                | `true`                | Show "Edit Layout" toggle                                                                                                      |
| `showSearch`         | `boolean`                                | `true`                | Show search input                                                                                                              |
| `headerActions`      | `DashboardAction[]`                      |                       | Extra buttons rendered in the header                                                                                           |
| `onLayoutChange`     | `(layout: WidgetLayoutChange[]) => void` |                       | Fires after drag/resize; receives clean backend-ready payload                                                                  |
| `onAddWidget`        | `() => void`                             |                       | Side-effect callback — fires after a widget is added. Dashboard handles state internally.                                      |
| `onSearch`           | `(query: string) => void`                |                       | Fires on search input change                                                                                                   |
| `theme`              | `DashboardTheme`                         | see defaults          | Theme object (see Theming section)                                                                                             |
| `className`          | `string`                                 |                       | Root element class                                                                                                             |
| `widgetTemplates`    | `WidgetTemplate[]`                       | DEFAULT_TEMPLATES     | Templates for the Add Widget modal                                                                                             |
| `searchLabel`        | `string`                                 | `"Search widgets..."` | Placeholder for search input                                                                                                   |
| `editLabel`          | `string`                                 | `"Edit Layout"`       | Edit button label                                                                                                              |
| `editingLabel`       | `string`                                 | `"Done"`              | Edit button label when active                                                                                                  |
| `addLabel`           | `string`                                 | `"+ Add Widget"`      | Add widget button label                                                                                                        |
| `disableEditingGrid` | `boolean`                                | `false`               | Suppress grid overlay while editing                                                                                            |

## Widget Layout and Positioning

Every `WidgetItem` accepts an optional `layout` property that controls where it appears on the grid. The dashboard uses a **12-column grid**, and each widget occupies a number of columns determined by its `size` (or `customSize`). The `layout` object lets you pin a widget to a specific column (`x`) and row (`y`).

```ts
interface WidgetLayout {
  x: number; // Column index (0–11). 0 = left edge.
  y: number; // Row index. 0 = top. Rows are unitless — each unit corresponds to one row-height slot.
}
```

`x` is the **starting column**, zero-indexed from the left edge. A `small` widget is 3 columns wide, so setting `x: 9` places it flush against the right edge of a 12-column grid. A `large` widget is 12 columns wide, so it always starts at `x: 0`.

`y` is the **starting row**. Row heights are determined by the widget's `size`: a `small` widget is 2 row units tall, `medium` is 3, and `large` is 4. To place two rows of small widgets without overlap, the second row should start at `y: 2`.

Here is a worked example from the Storybook showcasing a typical 4-up stat row followed by a chart row:

```tsx
const items: WidgetItem[] = [
  // Four stat cards across the top — each 3 columns wide, starting at y: 0
  { id: "s1", type: "stat", size: "small", layout: { x: 0, y: 0 }, data: { ... } },
  { id: "s2", type: "stat", size: "small", layout: { x: 3, y: 0 }, data: { ... } },
  { id: "s3", type: "stat", size: "small", layout: { x: 6, y: 0 }, data: { ... } },
  { id: "s4", type: "stat", size: "small", layout: { x: 9, y: 0 }, data: { ... } },

  // Two medium charts on the next row — small widgets are 2 rows tall, so y: 2
  { id: "c1", type: "chart", size: "medium", layout: { x: 0, y: 2 }, data: { ... } },
  { id: "c2", type: "chart", size: "medium", layout: { x: 6, y: 2 }, data: { ... } },
];
```

**If you omit `layout`**, the grid engine places widgets automatically in left-to-right, top-to-bottom order. This is fine for simple dashboards, but you should provide explicit `layout` values whenever you want consistent positioning — especially if widgets will be added or removed dynamically.

After a user drags or resizes widgets, the updated positions are reported via `onLayoutChange`, so you can persist them and restore the same positions on next load.

## Add Widget Modal

The `AddWidgetModal` is driven by programmer-supplied templates. Each template includes the complete, pre-configured `WidgetItem` data (minus `id`) that will be cloned onto the dashboard when the user clicks "Add to Dashboard".

### `WidgetTemplate` interface

```ts
interface WidgetTemplate {
  key: string; // Unique identifier for this template
  label: string; // Display name in the modal
  description: string; // One-sentence description
  component: Omit<WidgetItem, "id">; // The complete, pre-configured widget data
}
```

### Custom templates

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

## Widget Reference

### `stat` - Stat Card

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

### `chart` - Chart Card

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

### `list` - List Card

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

### `table` - Data Table

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

### `gauge` - Gauge Card

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

### `profile` - Profile Card

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

### `splitstat` - Split Progress Card

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

### `calendar` - Calendar Card

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

### `text` - Text Block Card

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

### `custom` - Custom Card

Renders any React component inside a standard dashboard card shell. The card handles all sizing, border, and scroll behaviour — your component just needs to render its own content and can assume it has full width and height available.

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

The underlying `CustomCard` wraps your component like this:

```tsx
interface Props {
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
}

export const CustomCard: React.FC<Props> = ({
  component: Component,
  props,
}) => (
  <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
    <Component {...(props ?? {})} />
  </div>
);
```

Your component receives `props` spread directly as React props. The outer `div` is `width: 100%, height: 100%` with `overflow: auto`, so scrollable content works without any extra wrapper in your component. Any React component with no required props (or with all required props covered by the `props` field) can be dropped in. This is useful for embedding third-party charts, maps, custom forms, or any one-off widget that doesn't fit the standard types.

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

### Theme reference

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

### Dark theme

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

### Teal/mint theme

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

### Midnight blue theme

Deep navy background with electric blue accents — ideal for ops dashboards and monitoring tools.

```tsx
const midnightBlueTheme = {
  primaryColor: "#3b82f6",
  backgroundColor: "#0a0f1e",
  cardBackground: "#111827",
  borderRadius: "10px",
  textColor: "#e2e8f0",
  mutedColor: "#64748b",
  borderColor: "#1e3a5f",
  fontFamily: "'Inter', sans-serif",
};
```

### Warm sand theme

Earthy, neutral tones with amber accents — great for productivity and note-taking apps.

```tsx
const warmSandTheme = {
  primaryColor: "#d97706",
  backgroundColor: "#fdf6ec",
  cardBackground: "#fffbf5",
  borderRadius: "10px",
  textColor: "#1c1917",
  mutedColor: "#a8a29e",
  borderColor: "#e7d9c8",
  fontFamily: "'Georgia', serif",
};
```

### Forest green theme

Nature-inspired greens with rich, organic feel — suits health, sustainability, or finance dashboards.

```tsx
const forestGreenTheme = {
  primaryColor: "#16a34a",
  backgroundColor: "#f0fdf4",
  cardBackground: "#ffffff",
  borderRadius: "12px",
  textColor: "#14532d",
  mutedColor: "#6b7280",
  borderColor: "#bbf7d0",
  fontFamily: "'DM Sans', sans-serif",
};
```

### Rose quartz theme

Soft pinks and warm whites — great for lifestyle, wellness, or consumer-facing dashboards.

```tsx
const roseQuartzTheme = {
  primaryColor: "#e11d48",
  backgroundColor: "#fff1f2",
  cardBackground: "#ffffff",
  borderRadius: "16px",
  textColor: "#881337",
  mutedColor: "#fb7185",
  borderColor: "#fecdd3",
  fontFamily: "'Lato', sans-serif",
};
```

### Slate enterprise theme

High-contrast, professional slate palette — designed for enterprise admin panels and B2B tools.

```tsx
const slateEnterpriseTheme = {
  primaryColor: "#0284c7",
  backgroundColor: "#f1f5f9",
  cardBackground: "#ffffff",
  borderRadius: "6px",
  textColor: "#0f172a",
  mutedColor: "#64748b",
  borderColor: "#cbd5e1",
  fontFamily: "'system-ui', sans-serif",
};
```

### Sunset orange theme

Warm, energetic gradient palette — eye-catching for marketing dashboards and campaign trackers.

```tsx
const sunsetOrangeTheme = {
  primaryColor: "#ea580c",
  backgroundColor: "#fff7ed",
  cardBackground: "#ffffff",
  borderRadius: "12px",
  textColor: "#431407",
  mutedColor: "#9a3412",
  borderColor: "#fed7aa",
  fontFamily: "'Nunito', sans-serif",
};
```

### Arctic white theme

Ultra-clean, minimal whites with cool blue accents — perfect for medical, scientific, or data-heavy UIs.

```tsx
const arcticWhiteTheme = {
  primaryColor: "#0ea5e9",
  backgroundColor: "#f8fafc",
  cardBackground: "#ffffff",
  borderRadius: "8px",
  textColor: "#0c4a6e",
  mutedColor: "#94a3b8",
  borderColor: "#e0f2fe",
  fontFamily: "'IBM Plex Sans', sans-serif",
};
```

### Charcoal ink theme

Dark charcoal with stark white text and vivid cyan accents — ideal for developer tools and terminal-style dashboards.

```tsx
const charcoalInkTheme = {
  primaryColor: "#06b6d4",
  backgroundColor: "#18181b",
  cardBackground: "#27272a",
  borderRadius: "4px",
  textColor: "#fafafa",
  mutedColor: "#71717a",
  borderColor: "#3f3f46",
  fontFamily: "'JetBrains Mono', monospace",
};
```

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

## Drag, Resize & Edit Mode

Click **Edit Layout** to enter edit mode. In edit mode, all widgets show a drag handle and glow ring. Widgets with `resizable: true` show a resize handle. Resizing snaps to the nearest predefined size by default; use `customSize` for free sizing. `onLayoutChange` fires with the updated layout after drag or resize stops.

```tsx
<Dashboard
  items={items}
  onLayoutChange={(layout) => {
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
      onLayoutChange={(layout) => console.log("Layout changed:", layout)}
      onAddWidget={() => console.log("Widget added")}
    />
  );
}
```

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

## FAQ

**Q: How do I pre-populate the modal with my product's specific widgets?**

Pass `widgetTemplates` to `<Dashboard>` or `<AddWidgetModal>`. Each template includes the full, pre-configured widget data — no extra configuration step for the user.

**Q: Can I disable the modal and handle "Add Widget" myself?**

Yes. Pass `showAddWidget={false}` and use your own button that calls your own state logic. Or use `onAddWidget` as a callback and build your own flow.

**Q: Can I have non-snapping, freely resizable widgets?**

Yes. Set `resizable: true` and `customSize: { w, h }` on the widget. This bypasses snap-to-size and allows free resizing within `minW/maxW/minH/maxH` bounds.

**Q: How do I persist the layout?**

Use `onLayoutChange` — it fires after every drag or resize stop with a clean `WidgetLayoutChange[]` payload. Save this to your backend and pass it back via `items[n].layout`.

**Q: Can I render completely custom content in a widget?**

Yes. Use `type: "custom"` and pass any React component via the `component` field. The component receives your `props` object spread as React props and is wrapped in a full-bleed, scrollable container.
