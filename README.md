# Order Management Analytics Dashboard (OMS)

An enterprise-grade, single-page analytics application built with **React 18**, **Material UI (MUI v5)**, and **Recharts**.

Built in accordance with **Assignment 11 — Frontend Systems Architecture Specification**.

---

## 🌟 Architectural Highlights

1. **Unidirectional Reactive Data Flow**:
   - Single source of truth: 50 normalized order records spanning 90 days across 4 product categories and 4 canonical fulfillment statuses.
   - Centralized filter state: Date Range, Product Category, Multi-Status chip toggles, and real-time Search Query.
   - Zero-lag memoized selector pipeline (`filterOrders`, `computeKpiMetrics`, `groupRevenueByDate`, `groupOrdersByStatus`) ensuring 60 FPS UI performance.

2. **Executive Visual Design System**:
   - Palette built on cool slate neutrals (`#f8fafc`), pure white card surfaces (`#ffffff`), and deep royal indigo primary accents (`#2563eb`).
   - Crisp hairline borders (`#e2e8f0`) and modern 12px card radiuses (`borderRadius: 3`).
   - Semantic status tokens:
     - **Completed**: `#15803d` on `#dcfce7` (Emerald Green)
     - **Processing**: `#1d4ed8` on `#dbeafe` (Cobalt Blue)
     - **Pending**: `#b45309` on `#fef3c7` (Warm Amber)
     - **Cancelled**: `#b91c1c` on `#fee2e2` (Crimson Red; excluded from net recognized revenue)

3. **Executive Component Hierarchy**:
   - **Tier 1 (Masthead)**: `TopHeaderBar` with live sync indicator, dynamic summary, CSV export, and reset button.
   - **Tier 2 (Controls)**: `FilterControlBar` with text search, date window dropdown, category selector, and interactive status chips.
   - **Tier 3 (KPIs)**: `KpiSummaryRow` (4× `KpiMetricCard` for Total Revenue, Total Sales Units, Total Orders, and Active Customers with period trend deltas).
   - **Tier 4 (Analytics)**: Asymmetric 8:4 split with `RevenueSalesChart` (dual-axis line chart) and `OrderStatusPieChart` (donut chart with centered count and interactive legend).
   - **Tier 5 (Ledger)**: `RecentOrdersTable` with sticky headers, multi-column sorting, row hover highlights, item tooltips, and pagination.

---

## 🚀 Quick Start

### 1. Launch Dev Server
Double-click `run.bat` or run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```
Built production assets will be generated in `dist/`.

---

## 📁 Project Directory Structure

```
src/
├── main.jsx                     # Application entry point & CssBaseline
├── App.jsx                      # ThemeProvider wrapper & top-level layout
├── theme/
│   └── dashboardTheme.js        # Custom MUI palette, typography & tokens
├── data/
│   └── mockOrders.js            # 50 normalized orders across 90 days
├── utils/
│   ├── analyticsSelectors.js    # Pure memoized selector pipeline
│   └── formatters.js            # Currency ($), compact number, & dates
└── components/
    ├── layout/
    │   └── TopHeaderBar.jsx     # Masthead, sync indicator & quick export
    ├── filters/
    │   └── FilterControlBar.jsx # Interactive search, date, & status filters
    ├── kpi/
    │   ├── KpiSummaryRow.jsx    # Responsive 4-column MUI Grid container
    │   └── KpiMetricCard.jsx    # Metric card with icon, value & trend delta
    ├── charts/
    │   ├── RevenueSalesChart.jsx   # Dual-series Recharts LineChart
    │   └── OrderStatusPieChart.jsx # Donut chart with centered count overlay
    └── orders/
        ├── RecentOrdersTable.jsx   # Sortable, paginated transaction ledger
        └── OrderStatusBadge.jsx    # Semantic status indicator badge
```
