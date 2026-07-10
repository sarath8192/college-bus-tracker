# Performance Optimization

This document explains the performance improvements added to the College Bus Tracking System.

## Frontend Optimization

- Used Vite production build for optimized static files.
- Added route-based lazy loading using React `lazy()` and `Suspense`.
- Reduced initial loading by loading pages only when required.
- Production files are generated in the `dist` folder using:

```bash
npm run build