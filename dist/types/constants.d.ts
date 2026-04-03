export declare const WIDGET_SIZES: {
    readonly small: {
        readonly w: 3;
        readonly h: 2;
    };
    readonly medium: {
        readonly w: 6;
        readonly h: 3;
    };
    readonly large: {
        readonly w: 12;
        readonly h: 4;
    };
};
export type WidgetSize = keyof typeof WIDGET_SIZES;
export type WidgetType = "stat" | "chart" | "list" | "text" | "custom";
export declare function getSizeFromDimensions(w: number, h: number): WidgetSize | null;
export declare function snapToSize(w: number, h: number): {
    w: number;
    h: number;
    size: WidgetSize;
};
