import React from "react";
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
export declare const DashboardHeader: React.FC<HeaderProps>;
export {};
