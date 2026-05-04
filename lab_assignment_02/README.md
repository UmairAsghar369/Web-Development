# Lab 8 — Bootstrap 5 Grid System & Containers

> **Subject:** Web Technology  
> **Lab:** 08  
> **Topic:** Bootstrap 5 Setup, Containers, Grid System, Gutters & Spacing

---

## 📁 Folder Structure

```
lab_assignment_02/
├── task_01/
│   └── task1_container.html    ← Container Breakpoints
├── task_02/
│   └── task2_grid.html         ← Responsive Grid System
├── task_03/
│   └── task3_single_column.html ← Single Column & Mixed Layouts
├── task_04/
│   └── task4_gutters.html      ← Gutters & Spacing System
└── README.md                   ← You are here!
```

---

## 🚀 How to Run

1. Open any `.html` file directly in your browser (double-click it)
2. **Resize your browser window** to see responsive behavior in action
3. No server or installation needed — everything uses Bootstrap CDN

---

## 📝 Task Summaries

### Task 1: Bootstrap 5 Containers (`task_01/task1_container.html`)

**What you'll learn:** How Bootstrap containers control page width at different screen sizes.

**7 Container Classes Demonstrated:**

| Class | Behavior |
|-------|----------|
| `.container` | Fixed width at every breakpoint |
| `.container-sm` | 100% until ≥576px, then fixed |
| `.container-md` | 100% until ≥768px, then fixed |
| `.container-lg` | 100% until ≥992px, then fixed |
| `.container-xl` | 100% until ≥1200px, then fixed |
| `.container-xxl` | 100% until ≥1400px, then fixed |
| `.container-fluid` | Always 100% wide (never fixed) |

**Q&A:**

**Q: At what width does `.container-sm` become fixed-width?**  
A: At the **sm breakpoint (≥576px)**. Below 576px it stretches to 100%. At 576px and above, it snaps to a fixed max-width of **540px**.

**Q: Which container is best for a blog? For a dashboard? Why?**  
- **Blog → `.container` or `.container-md`** — Blogs need readable line lengths (50–75 chars/line). A fixed-width container centers the text and prevents lines from being too wide.
- **Dashboard → `.container-fluid`** — Dashboards display lots of data (charts, tables, widgets), so using every pixel of screen width matters.

---

### Task 2: Responsive Grid System (`task_02/task2_grid.html`)

**What you'll learn:** How Bootstrap's 12-column grid rearranges at different screen sizes.

**The 6 Breakpoints:**

| Breakpoint | Prefix | Screen Width | Columns shown side-by-side |
|-----------|--------|-------------|---------------------------|
| Extra Small | (none) | <576px | 1 (col-12 = full width) |
| Small | `sm` | ≥576px | 2 (col-sm-6 = half) |
| Medium | `md` | ≥768px | 3 (col-md-4 = one-third) |
| Large | `lg` | ≥992px | 4 (col-lg-3 = one-quarter) |
| Extra Large | `xl` | ≥1200px | 6 (col-xl-2 = one-sixth) |
| XXL | `xxl` | ≥1400px | 6 (col-xxl-1 = 1/12 each) |

**Q&A:**

**Q: How many columns appear side-by-side at each breakpoint?**  
A: See table above — it goes from 1 column (stacked) on mobile to all 6 side-by-side on xl/xxl screens.

**Q: What happens when total columns exceed 12?**  
A: The extra columns **wrap to the next line**. Bootstrap uses a 12-column system. If you have `col-6 + col-6 + col-6 = 18`, the third column wraps below. This is called **column wrapping**.

---

### Task 3: Single Column & Mixed Layouts (`task_03/task3_single_column.html`)

**What you'll learn:** How a single column changes width across breakpoints + a real-world page layout.

**Part A — Three Column Behaviors:**

| Row | Pattern | What Happens |
|-----|---------|-------------|
| Row 1 | `col-12 → col-sm-6 → col-md-4 → col-lg-3 → col-xl-2 → col-xxl-1` | Gets narrower at every breakpoint |
| Row 2 | `col-12 → col-sm-12 → col-md-6 → col-lg-6 → col-xl-4 → col-xxl-3` | Stays full until md, then gradually shrinks |
| Row 3 | `col-12 → col-sm-4 → col-md-4 → col-lg-4 → col-xl-4 → col-xxl-4` | Full on mobile, then always 1/3 |

**Part B — Real-World Layout:**
- Header: `col-12` (always full)
- Sidebar: `col-12 col-md-3` (full on mobile, 1/4 on desktop)
- Main Content: `col-12 col-md-9` (full on mobile, 3/4 on desktop)
- Footer: `col-12` (always full)

**Q&A:**

**Q: Why should a sidebar be full-width on mobile but narrow on desktop?**  
A: On **mobile** (<768px), screens are tiny. A 25%-wide sidebar would be too narrow to read. Making it full-width (`col-12`) lets users interact comfortably. On **desktop**, there's plenty of room, so the sidebar can sit as `col-md-3` (25%) alongside the main content (`col-md-9`). This is the core of **responsive design** — adapting to available space.

---

### Task 4: Gutters & Spacing (`task_04/task4_gutters.html`)

**What you'll learn:** How Bootstrap controls spacing between grid columns using gutters.

**Gutter Classes:**

| Class | Type | Values |
|-------|------|--------|
| `gx-*` | Horizontal only | gx-0 through gx-5 |
| `gy-*` | Vertical only | gy-0 through gy-5 |
| `g-*` | Both directions | g-0 through g-5 |

**Gutter Size Scale:**

| Class | Size |
|-------|------|
| `g-0` | 0 (no gap) |
| `g-1` | 0.25rem (4px) |
| `g-2` | 0.5rem (8px) |
| `g-3` | 1rem (16px) — default |
| `g-4` | 1.5rem (24px) |
| `g-5` | 3rem (48px) |

**Gallery Comparison:**
- **`g-1` (tight)** → Better for **mobile** — maximizes image space on small screens
- **`g-4` (comfortable)** → Better for **desktop** — gives breathing room, looks cleaner

**Q&A:**

**Q: Why does Bootstrap use `rem` instead of `px` for gutters?**  
A: `rem` = "root em" — it's relative to the browser's base font size (usually 16px).
- **Accessibility:** If a user increases their font size (for vision reasons), rem-based spacing scales proportionally. Pixels don't scale.
- **Consistency:** Spacing stays proportional to text, so the design feels balanced at any zoom level.
- **Example:** `g-3 = 1rem = 16px` by default. If a user sets their browser font to 20px, then `1rem = 20px` and spacing adjusts automatically.

---

## 🧠 Key Concepts to Remember

### Bootstrap 5 CDN Setup
```html
<!-- CSS (in <head>) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JS (before </body>) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

### The 12-Column Grid
- Bootstrap divides each row into **12 equal columns**
- `col-6` = 6/12 = 50% width
- `col-4` = 4/12 = 33.3% width
- `col-3` = 3/12 = 25% width
- If column numbers exceed 12, extras **wrap to next line**

### Breakpoint Sizes
```
xs  = <576px   (phones)
sm  = ≥576px   (large phones)
md  = ≥768px   (tablets)
lg  = ≥992px   (small laptops)
xl  = ≥1200px  (desktops)
xxl = ≥1400px  (large desktops)
```

### Mobile-First Approach
Bootstrap is **mobile-first** — styles apply from smallest screen UP:
- `col-12` applies to xs AND everything larger (unless overridden)
- `col-md-6` kicks in at md AND everything larger
- Always start with the mobile layout, then add larger breakpoints

---

## ✅ Checklist

- [x] Task 1: All 7 container classes with breakpoint tables
- [x] Task 2: Grid system with all 6 breakpoints
- [x] Task 3: Single column behavior + real-world layout
- [x] Task 4: Complete gutter system (gx, gy, g) + gallery comparison
- [x] All theory questions answered
- [x] README with explanations

---

*Made for Lab 8 — Web Technology*
