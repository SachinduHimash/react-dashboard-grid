import { Dashboard } from "../Dashboard";
const meta = {
    title: "react-dashboard-grid/Dashboard",
    component: Dashboard,
    parameters: { layout: "fullscreen" },
};
export default meta;
const baseItems = [
    {
        id: "revenue",
        type: "stat",
        size: "small",
        layout: { x: 0, y: 0 },
        data: {
            label: "Revenue",
            value: "$52,400",
            change: "+12%",
            changeType: "up",
            icon: "💰",
        },
    },
    {
        id: "users",
        type: "stat",
        size: "small",
        layout: { x: 3, y: 0 },
        data: {
            label: "Users",
            value: "8,210",
            change: "+5.1%",
            changeType: "up",
            icon: "👤",
        },
    },
    {
        id: "expenses",
        type: "stat",
        size: "small",
        layout: { x: 6, y: 0 },
        data: {
            label: "Expenses",
            value: "$6,700",
            change: "-2.3%",
            changeType: "down",
            icon: "📉",
        },
    },
    {
        id: "notes",
        type: "text",
        size: "medium",
        layout: { x: 0, y: 2 },
        data: {
            title: "Notes",
            body: "Q4 targets are on track. Review budget allocation for next sprint.",
        },
    },
    {
        id: "transactions",
        type: "list",
        size: "medium",
        layout: { x: 6, y: 2 },
        data: {
            title: "Recent Transactions",
            items: [
                {
                    id: "1",
                    label: "Figma",
                    value: "$90",
                    badge: "Done",
                    badgeColor: "#22c55e",
                },
                {
                    id: "2",
                    label: "Photoshop",
                    value: "$32",
                    badge: "Cancelled",
                    badgeColor: "#ef4444",
                },
                {
                    id: "3",
                    label: "AWS",
                    value: "$210",
                    badge: "Pending",
                    badgeColor: "#f59e0b",
                },
            ],
        },
    },
];
// ── Stories ──────────────────────────────────────────────────────────────────
export const Default = {
    args: {
        title: "Dashboard",
        subtitle: "Welcome back",
        items: baseItems,
        showAddWidget: true,
        showEditLayout: true,
        showSearch: true,
        onLayoutChange: (layout) => console.log("Layout saved:", layout),
        onAddWidget: () => alert("Add widget clicked"),
    },
};
export const DarkTheme = {
    args: Object.assign(Object.assign({}, Default.args), { title: "Dark Dashboard", theme: {
            primaryColor: "#6366f1",
            backgroundColor: "#0f172a",
            cardBackground: "#1e293b",
            borderColor: "#334155",
            textColor: "#f1f5f9",
            mutedColor: "#94a3b8",
            borderRadius: "16px",
        } }),
};
export const MinimalHeader = {
    args: Object.assign(Object.assign({}, Default.args), { title: "Analytics", showAddWidget: false, showSearch: false, showEditLayout: true }),
};
export const WithCustomActions = {
    args: Object.assign(Object.assign({}, Default.args), { headerActions: [
            { label: "Export", icon: "📤", onClick: () => alert("Exported!") },
            { label: "Share", icon: "🔗", onClick: () => alert("Shared!") },
        ] }),
};
export const ResizableWidgets = {
    args: Object.assign(Object.assign({}, Default.args), { title: "Resizable Widgets", subtitle: "Turn on Edit Layout then resize — snaps to small/medium/large", items: baseItems.map((item) => (Object.assign(Object.assign({}, item), { resizable: true }))) }),
};
