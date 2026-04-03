import { DashboardTheme } from "./types";

export const defaultTheme: Required<DashboardTheme> = {
  primaryColor: "#6366f1",
  backgroundColor: "#f4f5f7",
  cardBackground: "#ffffff",
  borderRadius: "12px",
  textColor: "#111827",
  mutedColor: "#6b7280",
  borderColor: "#e5e7eb",
  fontFamily: "system-ui, sans-serif",
};

export function resolveTheme(theme?: DashboardTheme): Required<DashboardTheme> {
  return { ...defaultTheme, ...theme };
}

export function themeToCSSVars(
  t: Required<DashboardTheme>,
): React.CSSProperties {
  return {
    "--rdg-primary": t.primaryColor,
    "--rdg-bg": t.backgroundColor,
    "--rdg-card-bg": t.cardBackground,
    "--rdg-radius": t.borderRadius,
    "--rdg-text": t.textColor,
    "--rdg-muted": t.mutedColor,
    "--rdg-border": t.borderColor,
    "--rdg-font": t.fontFamily,
    fontFamily: t.fontFamily,
  } as React.CSSProperties;
}
