import React, { useState } from "react";
import { DashboardAction } from "./types";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showAddWidget?: boolean;
  showEditLayout?: boolean;
  showSearch?: boolean;
  isEditing?: boolean;
  headerActions?: DashboardAction[];
  onAddWidget?: () => void;
  onToggleEdit?: () => void;
  onSearch?: (q: string) => void;
  primaryColor: string;
  searchLabel?: string;
  editLabel?: string;
  editingLabel?: string;
  addLabel?: string;
}

export const DashboardHeader: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showAddWidget,
  showEditLayout,
  showSearch,
  isEditing,
  headerActions,
  onAddWidget,
  onToggleEdit,
  onSearch,
  primaryColor,
  searchLabel,
  editLabel,
  editingLabel,
  addLabel,
}) => {
  const [query, setQuery] = useState("");

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    border: "1px solid var(--rdg-border)",
    background: "var(--rdg-card-bg)",
    color: "var(--rdg-text)",
    transition: "all 0.15s",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        background: "var(--rdg-bg)",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      {/* Left — title */}
      <div>
        {title && (
          <h1
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "var(--rdg-text)",
            }}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 13,
              color: "var(--rdg-muted)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right — actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {showSearch && (
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder={searchLabel ?? "Search widgets..."}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              fontSize: 13,
              border: "1px solid var(--rdg-border)",
              outline: "none",
              background: "var(--rdg-bg)",
              color: "var(--rdg-text)",
              width: 200,
            }}
          />
        )}

        {/* Extra custom buttons */}
        {headerActions?.map((action, i) => (
          <button key={i} onClick={action.onClick} style={btnBase}>
            {action.icon} {action.label}
          </button>
        ))}

        {showEditLayout && (
          <button
            onClick={onToggleEdit}
            style={{
              ...btnBase,
              background: isEditing ? primaryColor : "var(--rdg-card-bg)",
              color: isEditing ? "#fff" : "var(--rdg-text)",
              borderColor: isEditing ? primaryColor : "var(--rdg-border)",
            }}
          >
            {isEditing
              ? (editingLabel ?? "Done")
              : (editLabel ?? "Edit Layout")}
          </button>
        )}

        {showAddWidget && (
          <button
            onClick={onAddWidget}
            style={{
              ...btnBase,
              background: primaryColor,
              color: "#fff",
              border: "none",
            }}
          >
            {addLabel ?? "+ Add Widget"}
          </button>
        )}
      </div>
    </div>
  );
};
