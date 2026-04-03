import React from "react";
interface Props {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    /** When true, the chart area shrinks to leave room for a legend column */
    legendSide?: boolean;
    legend?: React.ReactNode;
}
export declare const ChartWrapper: React.FC<Props>;
export {};
