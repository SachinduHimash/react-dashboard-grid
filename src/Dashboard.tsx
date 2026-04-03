import React, { useState, useMemo, useCallback } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardItem } from "./DashboardItem";
import { AddWidgetModal, WidgetTemplate } from "./AddWidgetModal";
import { DashboardProps, WidgetItem, WidgetLayoutChange } from "./types";
import { WIDGET_SIZES, getSizeFromDimensions, snapToSize } from "./constants";
import { resolveTheme, themeToCSSVars } from "./theme";

const COLS = 12;
const ROW_HEIGHT = 80;
const MARGIN: [number, number] = [12, 12];

export const Dashboard: React.FC<DashboardProps> = ({
  items: initialItems,
  title,
  subtitle,
  showAddWidget = true,
  showEditLayout = true,
  showSearch = true,
  headerActions,
  onLayoutChange,
  onAddWidget,
  onSearch,
  theme,
  className,
  searchLabel,
  editLabel,
  editingLabel,
  addLabel,
  disableEditingGrid = false,
  widgetTemplates,
}) => {
  const [items, setItems] = useState<WidgetItem[]>(initialItems);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resolvedTheme = resolveTheme(theme);
  const cssVars = themeToCSSVars(resolvedTheme);

  const buildLayout = useCallback(
    (widgetItems: WidgetItem[]): Layout[] =>
      widgetItems.map((item, i) => {
        const sizeKey = item.size ?? "medium";
        const sizeDims = item.customSize ?? WIDGET_SIZES[sizeKey];
        return {
          i: item.id,
          x: item.layout?.x ?? (i * sizeDims.w) % COLS,
          y:
            item.layout?.y ??
            Math.floor(i / Math.floor(COLS / sizeDims.w)) * sizeDims.h,
          w: sizeDims.w,
          h: sizeDims.h,
          minW: item.customSize ? 1 : WIDGET_SIZES.small.w,
          maxW: item.customSize ? COLS : WIDGET_SIZES.large.w,
          minH: item.customSize ? 1 : WIDGET_SIZES.small.h,
          maxH: item.customSize ? 20 : WIDGET_SIZES.large.h,
        };
      }),
    [],
  );

  const [layout, setLayout] = useState<Layout[]>(() =>
    buildLayout(initialItems),
  );

  // Sync if parent passes new items
  const prevInitialRef = React.useRef(initialItems);
  if (prevInitialRef.current !== initialItems) {
    prevInitialRef.current = initialItems;
    setItems(initialItems);
    setLayout(buildLayout(initialItems));
  }

  // ── Handle new widget added from modal ─────────────────────────────────────
  const handleWidgetAdd = useCallback(
    (widget: WidgetItem) => {
      const sizeKey = widget.size ?? "medium";
      const sizeDims = widget.customSize ?? WIDGET_SIZES[sizeKey];

      // Place at bottom of current layout
      const maxY = layout.reduce((acc, l) => Math.max(acc, l.y + l.h), 0);
      const newLayoutItem: Layout = {
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
      onAddWidget?.();
    },
    [items, layout, onAddWidget],
  );

  // ── Resize / drag handlers ─────────────────────────────────────────────────
  const handleResize = useCallback(
    (_layout: Layout[], _oldItem: Layout, newItem: Layout) => {
      const item = items.find((it) => it.id === newItem.i);
      if (item?.customSize) return;
      const snapped = snapToSize(newItem.w, newItem.h);
      newItem.w = snapped.w;
      newItem.h = snapped.h;
    },
    [items],
  );

  const handleResizeStop = useCallback(
    (newLayout: Layout[]) => {
      const snapped = newLayout.map((l) => {
        const item = items.find((it) => it.id === l.i);
        if (item?.customSize) return l;
        const s = snapToSize(l.w, l.h);
        return { ...l, w: s.w, h: s.h };
      });
      setLayout(snapped);
      emitLayoutChange(snapped);
    },
    [items],
  );

  const handleDragStop = useCallback(
    (newLayout: Layout[]) => {
      setLayout(newLayout);
      emitLayoutChange(newLayout);
    },
    [items],
  );

  const emitLayoutChange = (newLayout: Layout[]) => {
    if (!onLayoutChange) return;
    const payload: WidgetLayoutChange[] = newLayout.map((l) => {
      const item = items.find((it) => it.id === l.i);
      const namedSize = getSizeFromDimensions(l.w, l.h);
      return {
        id: l.i,
        x: l.x,
        y: l.y,
        size: namedSize ?? { w: l.w, h: l.h },
        draggable: item?.draggable ?? true,
        resizable: item?.resizable ?? false,
      };
    });
    onLayoutChange(payload);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    onSearch?.(q);
  };

  const visibleItems = useMemo(() => {
    if (!searchQuery) return items;
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

  const visibleLayout = layout.filter((l) =>
    visibleItems.some((it) => it.id === l.i),
  );

  const gridOverlayStyle: React.CSSProperties =
    isEditing && !disableEditingGrid
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
    const item = items.find((it) => it.id === l.i);
    return {
      ...l,
      isResizable: isEditing && (item?.resizable ?? false),
      isDraggable: isEditing,
    };
  });

  return (
    <div
      style={
        {
          ...cssVars,
          background: "var(--rdg-bg)",
          minHeight: "100vh",
        } as React.CSSProperties
      }
      className={className}
    >
      <DashboardHeader
        title={title}
        subtitle={subtitle}
        showAddWidget={showAddWidget}
        showEditLayout={showEditLayout}
        showSearch={showSearch}
        isEditing={isEditing}
        headerActions={headerActions}
        onAddWidget={() => setIsModalOpen(true)}
        onToggleEdit={() => setIsEditing((v) => !v)}
        onSearch={handleSearch}
        primaryColor={resolvedTheme.primaryColor}
        searchLabel={searchLabel}
        editLabel={editLabel}
        editingLabel={editingLabel}
        addLabel={addLabel}
      />

      <div style={{ ...gridOverlayStyle, transition: "background 0.3s" }}>
        <GridLayout
          layout={layoutWithResizable}
          cols={COLS}
          rowHeight={ROW_HEIGHT}
          width={1200}
          onResize={handleResize}
          onDragStop={handleDragStop}
          onResizeStop={handleResizeStop}
          isDraggable={isEditing}
          isResizable={isEditing}
          draggableHandle=".drag-handle"
          margin={MARGIN}
          compactType="vertical"
          preventCollision={false}
        >
          {visibleItems.map((item) => (
            <div key={item.id}>
              <DashboardItem item={item} isEditing={isEditing} />
            </div>
          ))}
        </GridLayout>
      </div>

      {/* Add Widget Modal */}
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleWidgetAdd}
        templates={widgetTemplates}
        primaryColor={resolvedTheme.primaryColor}
      />
    </div>
  );
};
