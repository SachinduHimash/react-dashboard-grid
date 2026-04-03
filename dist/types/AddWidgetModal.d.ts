import React from "react";
import { WidgetItem } from "./types";
/**
 * A widget template that a programmer registers. The `component` field
 * accepts a fully-configured WidgetItem (minus the `id`) that will be
 * cloned onto the dashboard when the user clicks "Add Widget".
 */
export interface WidgetTemplate {
    /**
     * Unique key for this template (e.g. "revenue-stat", "sales-line-chart").
     * Used as a stable identifier — does NOT have to match WidgetItem.type.
     */
    key: string;
    /** Human-readable name shown in the modal */
    label: string;
    /** One-sentence description of what this widget shows */
    description: string;
    /**
     * The fully-configured widget that will be added to the dashboard.
     * Omit `id` — a unique id is generated automatically.
     * Example:
     *   component: { type: "stat", size: "small", data: { title: "Revenue", value: "$0" } }
     */
    component: Omit<WidgetItem, "id">;
}
export interface AddWidgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** Called when user clicks "Add Widget" — receives a complete WidgetItem ready for the dashboard */
    onAdd: (widget: WidgetItem) => void;
    /** Programmer-supplied list of templates */
    templates?: WidgetTemplate[];
    primaryColor?: string;
}
export declare const DEFAULT_TEMPLATES: WidgetTemplate[];
export declare const AddWidgetModal: React.FC<AddWidgetModalProps>;
