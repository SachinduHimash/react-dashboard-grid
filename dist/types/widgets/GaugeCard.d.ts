import React from "react";
export interface GaugeData {
    title: string;
    subtitle?: string;
    value: string | number;
    label?: string;
    percentage: number;
    changeText?: string;
    color?: string;
}
export declare const GaugeCard: React.FC<{
    data: GaugeData;
}>;
