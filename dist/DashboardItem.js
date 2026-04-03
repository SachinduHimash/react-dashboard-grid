import React from "react";
import { StatCard } from "./widgets/StatCard";
import { ChartCard } from "./widgets/ChartCard";
import { ListCard } from "./widgets/ListCard";
import { TextCard } from "./widgets/TextCard";
import { CustomCard } from "./widgets/CustomCard";
import { GaugeCard } from "./widgets/GaugeCard";
import { ProfileCard } from "./widgets/ProfileCard";
import { SplitStatCard } from "./widgets/SplitStatCard";
import { TableCard } from "./widgets/TableCard";
import { CalendarCard } from "./widgets/CalendarCard";
export const DashboardItem = ({ item, isEditing }) => {
    const cardStyle = Object.assign(Object.assign(Object.assign({ width: "100%", height: "100%", background: "var(--rdg-card-bg)", borderRadius: "var(--rdg-radius)", border: "1px solid var(--rdg-border)", overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column", transition: "box-shadow 0.15s" }, (isEditing && { cursor: "grab" })), { boxShadow: isEditing
            ? "0 0 0 2px var(--rdg-primary)"
            : "0 2px 8px rgba(0, 0, 0, 0.06)" }), item.style);
    const renderContent = () => {
        switch (item.type) {
            case "stat":
                return React.createElement(StatCard, { data: item.data });
            case "chart":
                return React.createElement(ChartCard, { data: item.data });
            case "list":
                return React.createElement(ListCard, { data: item.data });
            case "text":
                return React.createElement(TextCard, { data: item.data });
            case "gauge":
                return React.createElement(GaugeCard, { data: item.data });
            case "profile":
                return React.createElement(ProfileCard, { data: item.data });
            case "splitstat":
                return React.createElement(SplitStatCard, { data: item.data });
            case "table":
                return React.createElement(TableCard, { data: item.data });
            case "calendar":
                return React.createElement(CalendarCard, { data: item.data });
            case "custom":
                return React.createElement(CustomCard, { component: item.component, props: item.props });
            default:
                console.error("react-dashboard-grid: unknown widget type:", item.type);
                return null;
        }
    };
    return (React.createElement("div", { style: cardStyle },
        isEditing && (React.createElement("div", { className: "drag-handle", style: {
                padding: "4px 12px",
                fontSize: 11,
                color: "var(--rdg-muted)",
                borderBottom: "1px solid var(--rdg-border)",
                cursor: "grab",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
            } }, "\u283F drag")),
        React.createElement("div", { style: { flex: 1, minHeight: 0, overflow: "hidden" } }, renderContent())));
};
