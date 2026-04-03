import React from "react";
import { WidgetItem } from "./types";
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

interface Props {
  item: WidgetItem;
  isEditing: boolean;
}

export const DashboardItem: React.FC<Props> = ({ item, isEditing }) => {
  const cardStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    background: "var(--rdg-card-bg)",
    borderRadius: "var(--rdg-radius)",
    border: "1px solid var(--rdg-border)",
    overflow: "hidden",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    transition: "box-shadow 0.15s",
    ...(isEditing && { cursor: "grab" }),
    boxShadow: isEditing
      ? "0 0 0 2px var(--rdg-primary)"
      : "0 2px 8px rgba(0, 0, 0, 0.06)",
    ...item.style,
  };

  const renderContent = () => {
    switch (item.type) {
      case "stat":
        return <StatCard data={item.data} />;
      case "chart":
        return <ChartCard data={item.data} />;
      case "list":
        return <ListCard data={item.data} />;
      case "text":
        return <TextCard data={item.data} />;
      case "gauge":
        return <GaugeCard data={item.data} />;
      case "profile":
        return <ProfileCard data={item.data} />;
      case "splitstat":
        return <SplitStatCard data={item.data} />;
      case "table":
        return <TableCard data={item.data} />;
      case "calendar":
        return <CalendarCard data={item.data} />;
      case "custom":
        return <CustomCard component={item.component} props={item.props} />;
      default:
        console.error(
          "react-dashboard-grid: unknown widget type:",
          (item as any).type,
        );
        return null;
    }
  };

  return (
    <div style={cardStyle}>
      {isEditing && (
        <div
          className="drag-handle"
          style={{
            padding: "4px 12px",
            fontSize: 11,
            color: "var(--rdg-muted)",
            borderBottom: "1px solid var(--rdg-border)",
            cursor: "grab",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ⠿ drag
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {renderContent()}
      </div>
    </div>
  );
};
