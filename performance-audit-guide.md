# React Performance Audit & Fix Guide
> Goal: Butter-smooth 60fps — instant interactions, silky scroll, zero jank, fluid animations.

---

## Priority Order (Highest Impact First)

### 1. Rendering Bottlenecks — Unnecessary Re-renders

**Root cause:** Components re-render when parent state changes, even if their own props haven't changed.

```tsx
// ❌ BEFORE: re-renders on every parent update
const ContentCard = ({ item }) => {
  const formatted = expensiveFormat(item.data); // recalculates every render
  return <div>{formatted}</div>;
};

// ✅ AFTER: memoized component + memoized computation
const ContentCard = React.memo(({ item }) => {
  const formatted = useMemo(() => expensiveFormat(item.data), [item.data]);
  // Re-renders ONLY when item.data changes
  return <div>{formatted}</div>;
});

// ✅ Stable callback references — prevents child re-renders
const handleSelect = useCallback((id: string) => {
  setSelected(id);
}, []); // empty deps = stable reference forever
```

**Rule of thumb:** `React.memo` on every list item component, `useMemo` for any computation >1ms, `useCallback` for any function passed as a prop.

---

### 2. Unvirtualized Long Lists — The #1 Jank Culprit

**Root cause:** Rendering 500 DOM nodes when only 10 are visible. Each off-screen node wastes layout, paint, and memory.

```tsx
// ❌ BEFORE: renders ALL items to the DOM
const ContentList = ({ items }) => (
  <div>
    {items.map(item => <ContentCard key={item.id} item={item} />)}
  </div>
);

// ✅ AFTER: only visible items exist in the DOM (react-window)
import { FixedSizeList } from 'react-window';

const ContentList = ({ items }) => (
  <FixedSizeList
    height={600}          // visible viewport height
    itemCount={items.length}
    itemSize={120}        // each row height in px
    overscanCount={3}     // render 3 extra rows above/below for smooth scroll
    width="100%"
  >
    {({ index, style }) => (
      // style contains top/height — MUST be applied for positioning
      <div style={style}>
        <ContentCard item={items[index]} />
      </div>
    )}
  </FixedSizeList>
);
```

**Impact:** Reduces DOM nodes from 500 → ~15. Layout calculation drops from 50ms → <2ms.

---

### 3. Memory Leaks — Uncleaned Event Listeners & Subscriptions

**Root cause:** Event listeners, timers, and subscriptions added in `useEffect` without cleanup run forever, accumulating in memory.

```tsx
// ❌ BEFORE: listener added but never removed
useEffect(() => {
  window.addEventListener('resize', handleResize);
  const interval = setInterval(fetchUpdates, 5000);
  const subscription = store.subscribe(onStoreChange);
  // LEAK: none of these are cleaned up on unmount
}, []);

// ✅ AFTER: every effect cleans up after itself
useEffect(() => {
  window.addEventListener('resize', handleResize);
  const interval = setInterval(fetchUpdates, 5000);
  const subscription = store.subscribe(onStoreChange);

  // Cleanup runs on unmount AND before next effect run
  return () => {
    window.removeEventListener('resize', handleResize);
    clearInterval(interval);
    subscription.unsubscribe();
  };
}, [handleResize, fetchUpdates]); // include all deps
```

**Check:** Open DevTools Memory tab. Navigate away from a component. If heap size doesn't drop, you have a leak.

---

### 4. Animation Misuse — Layout-Triggering Properties

**Root cause:** Animating `top`, `left`, `width`, `height` forces the browser to recalculate layout on every frame (16ms budget blown instantly).

```css
/* ❌ BEFORE: triggers layout + paint on every frame */
.card {
  transition: top 0.3s, left 0.3s, width 0.3s;
}

/* ✅ AFTER: GPU-composited — zero layout cost */
.card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s ease;
  will-change: transform, opacity; /* promotes to GPU layer */
}

/* ✅ Move elements using transform, not position */
.card--selected {
  transform: translateY(-4px) scale(1.02); /* NOT top: -4px */
}

/* ✅ Container promotion for animated regions */
.animation-container {
  contain: layout paint;           /* isolates reflow to this subtree */
  transform: translateZ(0);        /* forces GPU layer */
  will-change: transform;
}
```

**GPU-safe properties:** `transform`, `opacity`, `filter`. Everything else triggers layout or paint.

---

### 5. Scroll Event Performance — Throttling & IntersectionObserver

**Root cause:** Scroll events fire 60–120 times/second. Any synchronous work inside them blocks the main thread.

```tsx
// ❌ BEFORE: fires handler on every scroll tick, blocks main thread
useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY; // forces layout read
    setIsSticky(scrollY > 100);
    updateHeader(scrollY);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// ✅ AFTER: throttled with requestAnimationFrame (16ms budget respected)
useEffect(() => {
  let rafId: number;
  const handleScroll = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      setIsSticky(window.scrollY > 100);
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true }); // never blocks scroll
  return () => {
    window.removeEventListener('scroll', handleScroll);
    cancelAnimationFrame(rafId);
  };
}, []);

// ✅ BETTER: Use IntersectionObserver instead of scroll for visibility checks
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 } // fires when 10% visible
  );
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect(); // cleanup!
}, []);
```

**Rule:** `{ passive: true }` on all scroll/touch listeners. Use `IntersectionObserver` for all "is this visible?" checks.

---

### 6. Fetch/Data Loading Blocking UI — Skeletons & Async Patterns

**Root cause:** Blocking the render cycle on data fetches creates blank screens and unresponsive UIs.

```tsx
// ❌ BEFORE: loading state shows blank/spinner that blocks interaction
const ContentExplorer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />; // entire UI blocked
  return <ContentList items={data} />;
};

// ✅ AFTER: skeleton UI renders immediately, content slots in
const ContentExplorer = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController(); // cancel on unmount
    fetch('/api/content', { signal: controller.signal })
      .then(r => r.json())
      .then(setData)
      .catch(err => { if (err.name !== 'AbortError') console.error(err); })
      .finally(() => setLoading(false));
    return () => controller.abort(); // cleanup prevents state update on unmount
  }, []);

  return (
    <div>
      {loading
        ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
        : <ContentList items={data} />
      }
    </div>
  );
};

// ✅ Skeleton component — preserves layout, reduces CLS
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line skeleton-line--title" />
    <div className="skeleton-line skeleton-line--body" />
  </div>
);
```

---

### 7. Layout Thrashing — Read/Write DOM Geometry

**Root cause:** Alternating DOM reads (`getBoundingClientRect`) and writes (`style.height`) in the same frame forces the browser to flush and recalculate layout repeatedly.

```tsx
// ❌ BEFORE: read → write → read → write → layout recalc each time (~50ms)
items.forEach(el => {
  const height = el.getBoundingClientRect().height; // forces layout flush
  el.style.marginBottom = height * 0.1 + 'px';      // write
  const width = el.offsetWidth;                      // another flush!
  el.style.maxWidth = width * 0.8 + 'px';            // another write
});

// ✅ AFTER: batch ALL reads first, then ALL writes
const heights = items.map(el => el.getBoundingClientRect().height); // all reads
const widths  = items.map(el => el.offsetWidth);                    // all reads

// Now write — browser only recalculates layout ONCE
items.forEach((el, i) => {
  el.style.marginBottom = heights[i] * 0.1 + 'px';
  el.style.maxWidth     = widths[i]   * 0.8 + 'px';
});

// ✅ Or use ResizeObserver for reactive measurements (never causes thrashing)
useEffect(() => {
  const ro = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height }); // batched by React
    });
  });
  if (ref.current) ro.observe(ref.current);
  return () => ro.disconnect();
}, []);
```

---

### 8. Heavy Synchronous Operations — useMemo & Web Workers

**Root cause:** Sorting/filtering large datasets on the main thread blocks all user input for the duration.

```tsx
// ❌ BEFORE: blocks main thread for >16ms on large datasets
const ContentExplorer = ({ items, query, sortBy }) => {
  // Runs synchronously on every render
  const filtered = items
    .filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return <ContentList items={filtered} />;
};

// ✅ AFTER: memoized — only re-runs when deps actually change
const ContentExplorer = ({ items, query, sortBy }) => {
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items
      .filter(item => item.title.toLowerCase().includes(q))
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [items, query, sortBy]); // skips computation when nothing changed

  return <ContentList items={filtered} />;
};

// ✅ For datasets >10k items: offload to Web Worker
const workerRef = useRef<Worker>();
useEffect(() => {
  workerRef.current = new Worker(new URL('./filter.worker.ts', import.meta.url));
  workerRef.current.onmessage = e => setFiltered(e.data);
  return () => workerRef.current?.terminate();
}, []);

const debouncedSearch = useMemo(
  () => debounce((q: string) => {
    workerRef.current?.postMessage({ items, query: q, sortBy });
  }, 150),
  [items, sortBy]
);
```

---

### 9. CSS Performance Hints — GPU Layer Promotion

```css
/* ✅ Scrollable content container */
.content-explorer {
  contain: layout paint style;   /* isolates this subtree from global reflow */
  will-change: scroll-position;
}

/* ✅ Individual cards that animate */
.content-card {
  transform: translateZ(0);      /* promotes to own GPU compositing layer */
  will-change: transform, opacity;
  backface-visibility: hidden;   /* prevents repaint on 3D transforms */
}

/* ✅ Sticky/fixed headers */
.sticky-header {
  position: sticky;
  will-change: transform;
  contain: layout;
}

/* ✅ Loading skeletons — GPU-only animation */
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}
.skeleton-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
}
```

**Warning:** `will-change` allocates GPU memory per layer. Only use on elements that *will* animate. Overuse causes GPU memory pressure.

---

### 10. Image/Asset Loading — Never Block Renders

```tsx
// ✅ Every image should be lazy-loaded with async decoding
<img
  src={item.thumbnail}
  alt={item.title}
  loading="lazy"          // browser defers off-screen image fetches
  decoding="async"        // image decode happens off main thread
  width={240}             // explicit dimensions prevent layout shift (CLS)
  height={160}
/>

// ✅ Use srcSet for responsive images
<img
  src={item.thumbnail}
  srcSet={`${item.thumb_sm} 240w, ${item.thumb_md} 480w, ${item.thumb_lg} 960w`}
  sizes="(max-width: 600px) 240px, 480px"
  loading="lazy"
  decoding="async"
  width={480}
  height={320}
/>
```

---

## Performance Checklist

| # | Fix | Impact | Effort |
|---|-----|--------|--------|
| 1 | `React.memo` + `useMemo` + `useCallback` on all list items | 🔴 Critical | Low |
| 2 | Virtualize long lists with `react-window` | 🔴 Critical | Medium |
| 3 | Add cleanup returns to all `useEffect` hooks | 🔴 Critical | Low |
| 4 | Replace `top/left` animations with `transform/opacity` | 🔴 Critical | Low |
| 5 | Throttle scroll handlers, use `IntersectionObserver` | 🟠 High | Low |
| 6 | Show skeletons while loading, never block render | 🟠 High | Medium |
| 7 | Batch DOM reads before writes | 🟠 High | Low |
| 8 | Wrap filters/sorts in `useMemo` | 🟡 Medium | Low |
| 9 | Add `will-change` + `contain` to animated elements | 🟡 Medium | Low |
| 10 | Add `loading="lazy"` + `decoding="async"` to all images | 🟡 Medium | Low |

---

## Measuring Impact

```bash
# Before & after each fix, measure in Chrome DevTools:
# Performance tab → Record → Scroll/interact → Stop
# Target metrics:
# - Long Tasks: 0 tasks >50ms
# - FPS: consistently 60fps in Frames chart
# - Layout shifts: CLS score < 0.1
# - Heap growth: flat over time (Memory tab)
```

---

*The fixes compound — virtualization + memoization + GPU animations together typically yield 10–20× improvement in scroll smoothness.*
