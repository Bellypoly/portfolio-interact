/**
 * Dynamic import per slug for `/mission/:slug` (keeps case-study chunks out of the main bundle).
 * Slug keys must match `MISSION_GALLERY_MANIFEST` / `getMissionGalleryManifestRow` in `mission-gallery-manifest.js`.
 */
const SLUG_LOADERS = Object.freeze({
  "article-page-redesign": () =>
    import("./projects/article-page-redesign/index.js").then(
      (m) => m.articlePageRedesignProject,
    ),
  "dynamic-paywall": () =>
    import("./projects/dynamic-paywall/index.js").then(
      (m) => m.dynamicPaywallProject,
    ),
  "electricity-bill-breakdown": () =>
    import("./projects/electricity-bill-breakdown/index.js").then(
      (m) => m.electricityBillBreakdownProject,
    ),
  "federated-learning-energy": () =>
    import("./projects/federated-learning-energy/index.js").then(
      (m) => m.federatedLearningEnergyProject,
    ),
  "industrial-logistics-evaluation": () =>
    import("./projects/industrial-logistics-evaluation/index.js").then(
      (m) => m.industrialLogisticsEvaluationProject,
    ),
  "jerdi-kids": () =>
    import("./projects/jerdi-kids/index.js").then((m) => m.jerdiKidsProject),
  jobthai: () =>
    import("./projects/jobthai/index.js").then((m) => m.jobthaiProject),
  "local-elections-hub": () =>
    import("./projects/local-elections-hub/index.js").then(
      (m) => m.localElectionsHubProject,
    ),
  "map-magic": () =>
    import("./projects/map-magic/index.js").then((m) => m.mapMagicProject),
  "outage-management-system": () =>
    import("./projects/outage-management-system/index.js").then(
      (m) => m.outageManagementSystemProject,
    ),
  "parliament-watch-ocr": () =>
    import("./projects/parliament-watch-ocr/index.js").then(
      (m) => m.parliamentWatchOcrProject,
    ),
  "pea-e-service": () =>
    import("./projects/pea-e-service/index.js").then(
      (m) => m.peaEServiceProject,
    ),
  "photo-competition-my-hometown": () =>
    import("./projects/photo-competition-my-hometown/index.js").then(
      (m) => m.photoCompetitionMyHometownProject,
    ),
  rdfd: () => import("./projects/rdfd/index.js").then((m) => m.rdfdProject),
  "subscription-checkout-activation": () =>
    import("./projects/subscription-checkout-activation/index.js").then(
      (m) => m.subscriptionCheckoutActivationProject,
    ),
  vote62: () =>
    import("./projects/vote62/index.js").then(
      (m) => m.vote62EctReport69Project,
    ),
});

export const PORTFOLIO_PROJECT_SLUGS = Object.freeze(Object.keys(SLUG_LOADERS));
const PORTFOLIO_PROJECT_SLUG_SET = new Set(PORTFOLIO_PROJECT_SLUGS);

/** @param {string | undefined} slug */
export function hasPortfolioProjectSlug(slug) {
  return PORTFOLIO_PROJECT_SLUG_SET.has(slug);
}

/**
 * @param {string | undefined} slug
 * @returns {Promise<object | null>}
 */
export function loadPortfolioProjectBySlug(slug) {
  if (slug == null || slug === "") return Promise.resolve(null);
  const loader = SLUG_LOADERS[slug];
  if (!loader) return Promise.resolve(null);
  return loader();
}
