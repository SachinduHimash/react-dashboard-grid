import React from "react";
import { WorldMapRegion } from "../types";
export interface WorldMapData {
    title: string;
    subtitle?: string;
    regions: WorldMapRegion[];
    primaryColor?: string;
    showLegend?: boolean;
}
export declare const WorldMapCard: React.FC<{
    data: WorldMapData;
}>;
