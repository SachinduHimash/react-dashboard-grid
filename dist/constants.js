export const WIDGET_SIZES = {
    small: { w: 3, h: 2 },
    medium: { w: 6, h: 3 },
    large: { w: 12, h: 4 },
};
export function getSizeFromDimensions(w, h) {
    for (const [name, dims] of Object.entries(WIDGET_SIZES)) {
        if (dims.w === w && dims.h === h)
            return name;
    }
    return null;
}
export function snapToSize(w, h) {
    const sizes = Object.entries(WIDGET_SIZES);
    const closest = sizes.reduce((prev, curr) => {
        const prevDist = Math.abs(prev[1].w - w) + Math.abs(prev[1].h - h);
        const currDist = Math.abs(curr[1].w - w) + Math.abs(curr[1].h - h);
        return currDist < prevDist ? curr : prev;
    });
    return { w: closest[1].w, h: closest[1].h, size: closest[0] };
}
