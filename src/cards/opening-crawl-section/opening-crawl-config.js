/** Crawl progress below this keeps the mobile scroll CTA focusable. */
export const MOBILE_SCROLL_HINT_MAX_PROGRESS = 0.2;

export const BREAKPOINT_STOPS = {
  para1: {
    xs: [0.15, 0.35, 0.36, 0.37],
    sm: [0.15, 0.35, 0.37, 0.39],
    md: [0.15, 0.38, 0.4, 0.42],
    lg: [0.15, 0.39, 0.41, 0.43],
    xl: [0.15, 0.34, 0.36, 0.38],
    "2xl": [0.15, 0.4, 0.42, 0.44],
  },
  para2: {
    xs: [0.15, 0.41, 0.43, 0.45],
    sm: [0.15, 0.41, 0.43, 0.45],
    md: [0.15, 0.45, 0.46, 0.47],
    lg: [0.15, 0.44, 0.46, 0.48],
    xl: [0.15, 0.47, 0.49, 0.51],
    "2xl": [0.15, 0.49, 0.51, 0.53],
  },
  para3: {
    xs: [0.15, 0.5, 0.515, 0.54],
    sm: [0.15, 0.505, 0.515, 0.545],
    md: [0.15, 0.52, 0.54, 0.56],
    lg: [0.15, 0.51, 0.53, 0.56],
    xl: [0.15, 0.56, 0.6, 0.61],
    "2xl": [0.15, 0.56, 0.6, 0.62],
  },
  para4: {
    xs: [0.15, 0.6, 0.62, 0.645],
    sm: [0.15, 0.6, 0.61, 0.63],
    md: [0.15, 0.59, 0.61, 0.635],
    lg: [0.15, 0.62, 0.64, 0.66],
    xl: [0.15, 0.62, 0.64, 0.66],
    "2xl": [0.15, 0.63, 0.65, 0.67],
  },
};

/** Scroll-driven name size: wide screens stay fixed; smaller screens animate with crawl. */
export const CRAWL_NAME_FONT_BY_BAND = {
  sm: { input: [0, 0.2, 1], output: ["2.6rem", "2.4rem", "2.4rem"] },
  md: { input: [0, 0.2, 1], output: ["4.75rem", "3rem", "3rem"] },
  lg: { input: [0, 1], output: ["4rem", "4rem"] },
  xl: { input: [0, 1], output: ["4rem", "4rem"] },
  "2xl": { input: [0, 1], output: ["5rem", "5rem"] },
};

export function breakpointForWidth(width) {
  if (width < 640) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl";
}
