import React from "react";
import { CalendarEvent } from "../types";
export interface CalendarData {
    title?: string;
    events?: CalendarEvent[];
    onDateSelect?: (date: string) => void;
    highlightToday?: boolean;
    primaryColor?: string;
}
export declare const CalendarCard: React.FC<{
    data: CalendarData;
}>;
