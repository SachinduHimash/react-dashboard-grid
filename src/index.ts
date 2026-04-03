// Main component
export { Dashboard } from "./Dashboard";

// Add Widget Modal
export { AddWidgetModal, DEFAULT_TEMPLATES } from "./AddWidgetModal";
export type { WidgetTemplate, AddWidgetModalProps } from "./AddWidgetModal";

export type {
  DashboardProps,
  WidgetItem,
  DashboardTheme,
  DashboardAction,
  StatData,
  ChartData,
  ListData,
  ListItem,
  TextData,
  GaugeData,
  ProfileData,
  SplitStatData,
  TableData,
  CalendarData,
} from "./types";

export type { TableColumn, CalendarEvent, SplitStatSegment } from "./types";

// Widget size constants — users can reference these
export { WIDGET_SIZES } from "./constants";
export type { WidgetSize, WidgetType } from "./constants";
