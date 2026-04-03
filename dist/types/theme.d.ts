import { DashboardTheme } from "./types";
export declare const defaultTheme: Required<DashboardTheme>;
export declare function resolveTheme(theme?: DashboardTheme): Required<DashboardTheme>;
export declare function themeToCSSVars(t: Required<DashboardTheme>): React.CSSProperties;
