import React, { useState, useMemo, useCallback } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardItem } from "./DashboardItem";
import { AddWidgetModal } from "./AddWidgetModal";
import { WIDGET_SIZES, getSizeFromDimensions, snapToSize } from "./constants";
import { resolveTheme, themeToCSSVars } from "./theme";
const COLS = 12;
const ROW_HEIGHT = 80;
const MARGIN = [12, 12];
export const Dashboard = ({ items: initialItems, title, subtitle, showAddWidget = true, showEditLayout = true, showSearch = true, headerActions, onLayoutChange, onAddWidget, onSearch, theme, className, searchLabel, editLabel, editingLabel, addLabel, disableEditingGrid = false, widgetTemplates, }) => {
    const [items, setItems] = useState(initialItems);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const resolvedTheme = resolveTheme(theme);
    const cssVars = themeToCSSVars(resolvedTheme);
    const buildLayout = useCallback((widgetItems) => widgetItems.map((item, i) => {
        var _a, _b, _c, _d, _e, _f;
        const sizeKey = (_a = item.size) !== null && _a !== void 0 ? _a : "medium";
        const sizeDims = (_b = item.customSize) !== null && _b !== void 0 ? _b : WIDGET_SIZES[sizeKey];
        return {
            i: item.id,
            x: (_d = (_c = item.layout) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : (i * sizeDims.w) % COLS,
            y: (_f = (_e = item.layout) === null || _e === void 0 ? void 0 : _e.y) !== null && _f !== void 0 ? _f : Math.floor(i / Math.floor(COLS / sizeDims.w)) * sizeDims.h,
            w: sizeDims.w,
            h: sizeDims.h,
            minW: item.customSize ? 1 : WIDGET_SIZES.small.w,
            maxW: item.customSize ? COLS : WIDGET_SIZES.large.w,
            minH: item.customSize ? 1 : WIDGET_SIZES.small.h,
            maxH: item.customSize ? 20 : WIDGET_SIZES.large.h,
        };
    }), []);
    const [layout, setLayout] = useState(() => buildLayout(initialItems));
    // Sync if parent passes new items
    const prevInitialRef = React.useRef(initialItems);
    if (prevInitialRef.current !== initialItems) {
        prevInitialRef.current = initialItems;
        setItems(initialItems);
        setLayout(buildLayout(initialItems));
    }
    // ── Handle new widget added from modal ─────────────────────────────────────
    const handleWidgetAdd = useCallback((widget) => {
        var _a, _b;
        const sizeKey = (_a = widget.size) !== null && _a !== void 0 ? _a : "medium";
        const sizeDims = (_b = widget.customSize) !== null && _b !== void 0 ? _b : WIDGET_SIZES[sizeKey];
        // Place at bottom of current layout
        const maxY = layout.reduce((acc, l) => Math.max(acc, l.y + l.h), 0);
        const newLayoutItem = {
            i: widget.id,
            x: 0,
            y: maxY,
            w: sizeDims.w,
            h: sizeDims.h,
            minW: WIDGET_SIZES.small.w,
            maxW: WIDGET_SIZES.large.w,
            minH: WIDGET_SIZES.small.h,
            maxH: WIDGET_SIZES.large.h,
        };
        const newItems = [...items, widget];
        const newLayout = [...layout, newLayoutItem];
        setItems(newItems);
        setLayout(newLayout);
        // Notify parent if they want to know
        onAddWidget === null || onAddWidget === void 0 ? void 0 : onAddWidget();
    }, [items, layout, onAddWidget]);
    // ── Resize / drag handlers ─────────────────────────────────────────────────
    const handleResize = useCallback((_layout, _oldItem, newItem) => {
        const item = items.find((it) => it.id === newItem.i);
        if (item === null || item === void 0 ? void 0 : item.customSize)
            return;
        const snapped = snapToSize(newItem.w, newItem.h);
        newItem.w = snapped.w;
        newItem.h = snapped.h;
    }, [items]);
    const handleResizeStop = useCallback((newLayout) => {
        const snapped = newLayout.map((l) => {
            const item = items.find((it) => it.id === l.i);
            if (item === null || item === void 0 ? void 0 : item.customSize)
                return l;
            const s = snapToSize(l.w, l.h);
            return Object.assign(Object.assign({}, l), { w: s.w, h: s.h });
        });
        setLayout(snapped);
        emitLayoutChange(snapped);
    }, [items]);
    const handleDragStop = useCallback((newLayout) => {
        setLayout(newLayout);
        emitLayoutChange(newLayout);
    }, [items]);
    const emitLayoutChange = (newLayout) => {
        if (!onLayoutChange)
            return;
        const payload = newLayout.map((l) => {
            var _a, _b;
            const item = items.find((it) => it.id === l.i);
            const namedSize = getSizeFromDimensions(l.w, l.h);
            return {
                id: l.i,
                x: l.x,
                y: l.y,
                size: namedSize !== null && namedSize !== void 0 ? namedSize : { w: l.w, h: l.h },
                draggable: (_a = item === null || item === void 0 ? void 0 : item.draggable) !== null && _a !== void 0 ? _a : true,
                resizable: (_b = item === null || item === void 0 ? void 0 : item.resizable) !== null && _b !== void 0 ? _b : false,
            };
        });
        onLayoutChange(payload);
    };
    const handleSearch = (q) => {
        setSearchQuery(q);
        onSearch === null || onSearch === void 0 ? void 0 : onSearch(q);
    };
    const visibleItems = useMemo(() => {
        if (!searchQuery)
            return items;
        const q = searchQuery.toLowerCase();
        return items.filter((item) => {
            if (item.type === "stat")
                return item.data.title.toLowerCase().includes(q);
            if (item.type === "chart")
                return item.data.title.toLowerCase().includes(q);
            if (item.type === "list")
                return item.data.title.toLowerCase().includes(q);
            if (item.type === "text")
                return item.data.title.toLowerCase().includes(q);
            return true;
        });
    }, [items, searchQuery]);
    const visibleLayout = layout.filter((l) => visibleItems.some((it) => it.id === l.i));
    const gridOverlayStyle = isEditing && !disableEditingGrid
        ? {
            backgroundImage: `
      linear-gradient(to right, ${resolvedTheme.primaryColor}18 1px, transparent 1px),
      linear-gradient(to bottom, ${resolvedTheme.primaryColor}18 1px, transparent 1px)
    `,
            backgroundSize: `calc((100% - ${(COLS + 1) * MARGIN[0]}px) / ${COLS} + ${MARGIN[0]}px) ${ROW_HEIGHT + MARGIN[1]}px`,
            backgroundPosition: `${MARGIN[0]}px ${MARGIN[1]}px`,
        }
        : {};
    const layoutWithResizable = visibleLayout.map((l) => {
        var _a;
        const item = items.find((it) => it.id === l.i);
        return Object.assign(Object.assign({}, l), { isResizable: isEditing && ((_a = item === null || item === void 0 ? void 0 : item.resizable) !== null && _a !== void 0 ? _a : false), isDraggable: isEditing });
    });
    return (React.createElement("div", { style: Object.assign(Object.assign({}, cssVars), { background: "var(--rdg-bg)", minHeight: "100vh" }), className: className },
        React.createElement(DashboardHeader, { title: title, subtitle: subtitle, showAddWidget: showAddWidget, showEditLayout: showEditLayout, showSearch: showSearch, isEditing: isEditing, headerActions: headerActions, onAddWidget: () => setIsModalOpen(true), onToggleEdit: () => setIsEditing((v) => !v), onSearch: handleSearch, primaryColor: resolvedTheme.primaryColor, searchLabel: searchLabel, editLabel: editLabel, editingLabel: editingLabel, addLabel: addLabel }),
        React.createElement("div", { style: Object.assign(Object.assign({}, gridOverlayStyle), { transition: "background 0.3s" }) },
            React.createElement(GridLayout, { layout: layoutWithResizable, cols: COLS, rowHeight: ROW_HEIGHT, width: 1200, onResize: handleResize, onDragStop: handleDragStop, onResizeStop: handleResizeStop, isDraggable: isEditing, isResizable: isEditing, draggableHandle: ".drag-handle", margin: MARGIN, compactType: "vertical", preventCollision: false }, visibleItems.map((item) => (React.createElement("div", { key: item.id },
                React.createElement(DashboardItem, { item: item, isEditing: isEditing })))))),
        React.createElement(AddWidgetModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onAdd: handleWidgetAdd, templates: widgetTemplates, primaryColor: resolvedTheme.primaryColor })));
};
