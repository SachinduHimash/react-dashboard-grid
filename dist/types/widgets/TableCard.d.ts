import React from "react";
import { TableColumn } from "../types";
export interface TableData {
    title: string;
    subtitle?: string;
    columns: TableColumn[];
    rows: Record<string, any>[];
    striped?: boolean;
    sortable?: boolean;
    rowsPerPage?: number;
}
export declare const TableCard: React.FC<{
    data: TableData;
}>;
