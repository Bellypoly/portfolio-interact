# Interactive Portfolio

React/Vite portfolio for Suwaphit Buabuthr. The site combines a scroll-driven resume, mission gallery, and case-study routes for selected projects.

## Stack

| Area | Tools |
| --- | --- |
| UI | React 18, React Router |
| Motion | Framer Motion |
| Styling | Tailwind CSS, PostCSS, shared design tokens |
| Build | Vite |
| Tests | Node test runner |
| Deploy | GitHub Pages workflow in `.github/workflows/deploy.yml` |

## Scripts

```bash
npm run dev
npm run dev:prod
npm run lint
npm test
npm run build
npm run preview
```

`npm run dev:prod` starts Vite with `import.meta.env.DEV` forced false so production-only branches can be previewed locally.

## Structure

```text
src/
  app-router.jsx                         # SPA routes
  space-resume.jsx                       # Main scroll-driven resume shell
  components/                            # Reusable UI components
  sections/                              # Resume and gallery sections
  pages/case-study/                      # Case-study renderers
  data/portfolio/                        # Mission gallery and case-study data
  utils/                                 # Scroll, starfield, color, and anchor helpers
public/
  images/                                # Static image assets
  resume-suwaphit.pdf                    # Resume PDF
```

## Content Notes

- Mission gallery ordering lives in `src/data/portfolio/mission-gallery-manifest.js`.
- Case-study route loaders live in `src/data/portfolio/load-portfolio-project.js`.
- Work timeline entries live in `src/sections/work-section/index.jsx`.
- The active site version is controlled by `VITE_SITE_VERSION` or the `?v=` query parameter.

## Verification

Run these before publishing changes:

```bash
npm run lint
npm test
npm run build
```
