import React from "react";
import { SplitStatSegment } from "../types";
export interface SplitStatData {
    title: string;
    titleAction?: string;
    value: string | number;
    unit?: string;
    segments: SplitStatSegment[];
    minValue?: string | number;
    maxValue?: string | number;
}
export declare const SplitStatCard: React.FC<{
    data: SplitStatData;
}>;
