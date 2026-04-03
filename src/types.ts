import React from "react";
import { WidgetSize } from "./constants";
import { GaugeData } from "./widgets/GaugeCard";
import { ProfileData } from "./widgets/ProfileCard";
import { SplitStatData } from "./widgets/SplitStatCard";
import { TableData } from "./widgets/TableCard";
import { CalendarData } from "./widgets/CalendarCard";
import { WidgetTemplate } from "./AddWidgetModal";

export type { GaugeData, ProfileData, SplitStatData, TableData, CalendarData };

export interface DashboardTheme {
  primaryColor?: string;
  backgroundColor?: string;
  cardBackground?: string;
  borderRadius?: string;
  textColor?: string;
  mutedColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export interface DashboardAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

export interface StatData {
  value: string | number;
  title: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export interface ListItem {
  id: string;
  label: string;
  value?: string;
  badge?: string;
  badgeColor?: string;
  icon?: React.ReactNode;
}

export interface ListData {
  title: string;
  items: ListItem[];
}

export interface TextData {
  title: string;
  body: string;
}

export type WidgetData =
  | { type: "stat"; data: StatData }
  | { type: "chart"; data: ChartData }
  | { type: "list"; data: ListData }
  | { type: "text"; data: TextData }
  | { type: "gauge"; data: GaugeData }
  | { type: "profile"; data: ProfileData }
  | { type: "splitstat"; data: SplitStatData }
  | { type: "table"; data: TableData }
  | { type: "calendar"; data: CalendarData }
  | {
      type: "custom";
      data?: Record<string, unknown>;
      component: React.ComponentType<any>;
      props?: Record<string, unknown>;
    };

interface WidgetBase {
  id: string;
  size?: WidgetSize;
  layout?: { x: number; y: number; w?: number; h?: number };
  resizable?: boolean;
  draggable?: boolean;
  style?: React.CSSProperties;
  customSize?: { w: number; h: number };
}

export type WidgetItem = WidgetBase & WidgetData;

/** What onLayoutChange emits — clean, backend-friendly */
export interface WidgetLayoutChange {
  id: string;
  x: number;
  y: number;
  size: WidgetSize | { w: number; h: number };
  draggable: boolean;
  resizable: boolean;
}

export interface DashboardProps {
  items: WidgetItem[];
  title?: string;
  subtitle?: string;
  showAddWidget?: boolean;
  showEditLayout?: boolean;
  showSearch?: boolean;
  headerActions?: DashboardAction[];
  /** Fires after drag/resize stops — clean payload, ready for backend */
  onLayoutChange?: (layout: WidgetLayoutChange[]) => void;
  /**
   * Called after a widget is successfully added via the modal.
   * The Dashboard manages internal items state; use this for side effects only.
   */
  onAddWidget?: () => void;
  onSearch?: (query: string) => void;
  theme?: DashboardTheme;
  className?: string;
  searchLabel?: string;
  editLabel?: string;
  editingLabel?: string;
  addLabel?: string;
  disableEditingGrid?: boolean;
  /**
   * Templates for the Add Widget modal.
   * If omitted, DEFAULT_TEMPLATES are used.
   * Pass your own list to control exactly which widgets users can add.
   */
  widgetTemplates?: WidgetTemplate[];
}

// ─── Chart data types ─────────────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string;
  value: number;
  value2?: number;
  value3?: number;
}

export interface ChartColors {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  background?: string;
}

interface ChartBase {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  colors?: ChartColors;
  showGrid?: boolean;
  showLegend?: boolean;
  seriesLabels?: { value: string; value2?: string; value3?: string };
}

export interface LineChartData extends ChartBase {
  chartType: "line";
}
export interface BarChartData extends ChartBase {
  chartType: "bar";
  stacked?: boolean;
}
export interface AreaChartData extends ChartBase {
  chartType: "area";
  stacked?: boolean;
}
export interface HistogramData extends ChartBase {
  chartType: "histogram";
}

export interface PieChartData {
  title: string;
  subtitle?: string;
  chartType: "pie" | "donut";
  data: { label: string; value: number; color?: string }[];
  colors?: ChartColors;
  showLegend?: boolean;
}

export type ChartData =
  | LineChartData
  | BarChartData
  | AreaChartData
  | HistogramData
  | PieChartData;

export interface TableColumn {
  key: string;
  label: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
}

export interface CalendarEvent {
  date: string; // "YYYY-MM-DD"
  label?: string;
  color?: string;
  dot?: boolean;
}

export interface SplitStatSegment {
  label: string;
  percentage: number; // 0–100
  value?: string | number;
  color?: string;
}
